import { CMS_PAGE_QUERY, FooterDocument, type FooterQuery } from "@/graphql/cms";
import { ContactPageDocument, type ContactPageQuery } from "@/graphql/cms/queries/__generated__/ContactPage.generated";
import { StoreLocationsDocument, type StoreLocationsQuery } from "@/graphql/cms/queries/__generated__/StoreLocations.generated";
import { getPageCacheConfig } from "@/utils/hooks/useCache";
import type { CmsPage, ContactPageData, FooterData, StoreLocation, StoreLocationsPageData } from "@/types/storefront";
import { normalizeCmsHtml } from "@/utils/cms-content";
import { graphqlRequestCached } from "@/lib/cached-graphql";

function mapFooterResponse(footer?: FooterQuery["footer"]): FooterData | null {
  if (!footer) return null;

  const contactCol =
    footer.columns?.find((col) =>
      col?.links?.some((l) => l?.icon && ["LOCATION", "PHONE", "EMAIL", "CLOCK", "MAP"].includes(l.icon))
    ) ?? footer.columns?.[0];

  let address = "";
  let hotline = "";
  let email = "";
  let hours = "";
  let mapEmbed: string | undefined = undefined;

  if (contactCol?.links) {
    for (const link of contactCol.links) {
      if (!link) continue;
      const val = link.text || link.href || link.label;
      if (link.icon === "LOCATION" || /address/i.test(link.label)) address = val;
      if (link.icon === "PHONE" || /hotline/i.test(link.label)) hotline = val;
      if (link.icon === "EMAIL" || /email/i.test(link.label)) email = val;
      if (link.icon === "CLOCK" || /time|hour/i.test(link.label)) hours = val;
      if (link.icon === "MAP") mapEmbed = link.href || link.text || undefined;
    }
  }

  const navColumns = (footer.columns ?? [])
    .filter((col) => col && col !== contactCol)
    .map((col) => ({
      title: col!.title,
      links: (col!.links ?? [])
        .filter((l): l is NonNullable<typeof l> => Boolean(l && (l.href || l.label)))
        .map((l) => ({
          label: l.label,
          href: l.href || "#",
          ...(l.new_tab && { newTab: true }),
        })),
    }));

  const social = (footer.social ?? [])
    .filter((s): s is NonNullable<typeof s> => Boolean(s && s.network && s.href))
    .map((s) => ({
      network: s.network as FooterData["social"][number]["network"],
      href: s.href,
    }));

  const highlights = (footer.highlights ?? [])
    .filter((h): h is NonNullable<typeof h> => Boolean(h && h.title))
    .map((h) => ({
      icon: (h.icon ?? "secure") as FooterData["highlights"][number]["icon"],
      title: h.title,
      text: h.text ?? "",
    }));

  const legalLinks = (footer.legal_links ?? [])
    .filter((l): l is NonNullable<typeof l> => Boolean(l && l.label))
    .map((l) => ({
      label: l.label,
      href: l.href || "#",
      ...(l.new_tab && { newTab: true }),
    }));

  return {
    newsletterTitle: footer.newsletter_title ?? "",
    newsletterText: footer.newsletter_text ?? "",
    contact: {
      title: contactCol?.title ?? "",
      address,
      hotline,
      email,
      hours,
      ...(mapEmbed && { mapEmbed }),
    },
    columns: navColumns,
    social,
    apps: {
      title: footer.apps?.title ?? undefined,
      ios: footer.apps?.ios ?? "",
      android: footer.apps?.android ?? "",
    },
    paymentBanner: footer.payment_banner?.image_url
      ? {
          imageUrl: footer.payment_banner.image_url,
          altText: footer.payment_banner.alt_text ?? "",
        }
      : undefined,
    highlights,
    copyright: footer.copyright ?? "",
    legalLinks,
  };
}

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const data = await graphqlRequestCached<FooterQuery>(
      FooterDocument,
      {},
      getPageCacheConfig("static"),
    );
    return mapFooterResponse(data?.footer);
  } catch (error) {
    console.error("[magento] footer query failed", error);
    return null;
  }
}


interface MagentoCmsPage {
  identifier: string;
  title: string;
  content_heading?: string | null;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
}

/** A CMS page by its URL key; null when Magento has no such (enabled) page. */
export async function getCmsPage(identifier: string): Promise<CmsPage | null> {
  try {
    const data = await graphqlRequestCached<{ cmsPage: MagentoCmsPage | null }>(CMS_PAGE_QUERY, { identifier }, getPageCacheConfig("static"));
    const page = data.cmsPage;
    if (!page) return null;
    return {
      identifier: page.identifier,
      title: page.content_heading || page.title,
      html: normalizeCmsHtml(page.content ?? ""),
      metaTitle: page.meta_title || undefined,
      metaDescription: page.meta_description || undefined,
    };
  } catch (error) {
    if (!/doesn't exist|not found/i.test(String(error))) console.error(`[magento] cms page "${identifier}" failed`, error);
    return null;
  }
}

/** Live Contact Us page data from Magento `query contactPage`. */
export async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    const data = await graphqlRequestCached<ContactPageQuery>(ContactPageDocument, {}, getPageCacheConfig("static"));
    const page = data.contactPage;
    if (!page) return null;
    return {
      metaTitle: page.meta_title,
      metaDescription: page.meta_description,
      title: page.title,
      subtitle: page.subtitle,
      contactCards: {
        hotline: page.contact_cards.hotline,
        email: page.contact_cards.email,
        address: page.contact_cards.address,
        hours: page.contact_cards.hours,
        whatsapp: page.contact_cards.whatsapp,
      },
      mapEmbedUrl: page.map_embed_url,
      formTitle: page.form_title,
      formSubtitle: page.form_subtitle,
      showroomCtaLabel: page.showroom_cta_label,
      showroomCtaLink: page.showroom_cta_link,
      social: (page.social ?? [])
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
        .map((s) => ({ network: s.network, href: s.href })),
    };
  } catch (error) {
    console.error("[magento] contact page query failed", error);
    return null;
  }
}

/** Live Store Locations page data from Magento `query storeLocations`. */
export async function getStoreLocationsPageData(): Promise<StoreLocationsPageData | null> {
  try {
    const data = await graphqlRequestCached<StoreLocationsQuery>(StoreLocationsDocument, {}, getPageCacheConfig("static"));
    const loc = data.storeLocations;
    if (!loc) return null;
    return {
      title: loc.title,
      subtitle: loc.subtitle,
      stores: (loc.stores ?? [])
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
        .map((s) => ({
          id: s.id,
          name: s.name,
          area: s.area,
          image: s.image,
          hours: s.hours,
          opens: s.opens,
          closes: s.closes,
          closedDays: (s.closed_days ?? []).filter((d): d is number => typeof d === "number"),
          phone: s.phone,
          email: s.email ?? "",
          address: (s.address ?? []).filter((a): a is string => typeof a === "string"),
          landmark: s.landmark ?? undefined,
          mapEmbed: s.map_embed_url,
          directions: s.directions_url,
        })),
    };
  } catch (error) {
    console.error("[magento] store locations query failed", error);
    return null;
  }
}

/** Showrooms for the Store Locations page. */
export async function getStoreLocations(): Promise<StoreLocation[]> {
  const data = await getStoreLocationsPageData();
  return data?.stores ?? [];
}
