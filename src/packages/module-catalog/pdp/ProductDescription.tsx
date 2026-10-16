import { NextImage } from "@/packages/module-common/NextImage";
import { GuaranteeIcon } from "@/packages/module-common/icons/TrustIcons";
import { parseDescription, type DescriptionImage, type DescriptionSection } from "@/utils/product-description";
import { IngredientList } from "./IngredientList";
import { TabHeading } from "./TabHeading";

interface ProductDescriptionProps {
  html: string;
  name: string;
  brand?: string;
  origin?: string;
}

const COPY =
  "text-[15px] leading-[1.65] text-brand-ink [&_a]:text-brand-link [&_a]:underline-offset-2 hover:[&_a]:underline [&_p+p]:mt-2.5 [&_strong]:font-semibold [&_strong]:text-brand-dark [&_ul]:mt-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-2.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li+li]:mt-1";

/** Pack size from the product name ("236ml", "10gm", "1.3g"). */
const packSize = (name: string) => name.match(/(\d+(?:\.\d+)?\s?(?:ml|gm|g|kg|l|pcs|oz))\b/i)?.[1].replace(/\s/g, "");

function Check() {
  return (
    <span aria-hidden="true" className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-coral/12 text-brand-coral">
      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m2.5 6.2 2.3 2.3 4.7-5" />
      </svg>
    </span>
  );
}

function Picture({ image, priority = false, className = "" }: { image: DescriptionImage; priority?: boolean; className?: string }) {
  return (
    <NextImage
      src={image.src}
      alt={image.alt}
      width={1290}
      height={430}
      priority={priority}
      sizes="(max-width: 1023px) 100vw, 900px"
      className={`h-auto w-full object-contain ${className}`}
    />
  );
}

function Section({ section }: { section: DescriptionSection }) {
  switch (section.kind) {
    case "features":
      return (
        <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {section.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[14px] leading-[1.5] text-brand-ink sm:text-[15px]">
              <Check />
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-3.5 grid gap-4 md:grid-cols-3 md:gap-6">
          {section.items.map((item, i) => (
            <li key={item} className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-coral text-[14px] font-bold text-white">{i + 1}</span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-brand-coral">Step {i + 1}</span>
                <span className="mt-0.5 block text-[14px] leading-[1.5] text-brand-ink">{item}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "ingredients":
      return <IngredientList text={section.items[0]} />;
    case "notes":
      return (
        <ul className="mt-3 space-y-1.5">
          {section.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[14px] leading-[1.5] text-footer-text">
              <span aria-hidden="true" className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand-coral" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return section.images.length ? (
        <div className="mt-3 grid items-start gap-4 sm:grid-cols-[160px_minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)] md:gap-6">
          <div className="mx-auto w-full max-w-[200px]">
            <Picture image={section.images[0]} />
          </div>
          <div className={COPY} dangerouslySetInnerHTML={{ __html: section.html }} />
        </div>
      ) : (
        <div className={`mt-3 ${COPY}`} dangerouslySetInnerHTML={{ __html: section.html }} />
      );
  }
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 text-[14px]">
      <dt className="text-footer-text">{label}</dt>
      <dd className="text-right font-medium text-brand-dark">{value}</dd>
    </div>
  );
}

/**
 * PDP "Description" tab from Magento `description.html`. Desktop: the story (intro, features, details, how to use,
 * ingredients) beside a sticky "At a glance" panel (facts, good to know, authenticity). Phones: one column with the
 * panel straight after the intro (same markup, grid order).
 */
export function ProductDescription({ html, name, brand, origin }: ProductDescriptionProps) {
  const { introHtml, introImages, sections } = parseDescription(html);
  const notes = sections.filter((s) => s.kind === "notes");
  const story = sections.filter((s) => s.kind !== "notes");
  const features = sections.find((s) => s.kind === "features");
  const size = packSize(name);
  const facts = [
    brand && { label: "Brand", value: brand },
    origin && { label: "Origin", value: origin },
    size && { label: "Size", value: size },
    features && { label: "Highlights", value: `${features.items.length} key benefits` },
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  return (
    <div className="grid gap-x-10 gap-y-5 font-sans lg:grid-cols-[minmax(0,1fr)_320px] desk:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        {introImages.map((image, i) => (
          <Picture key={image.src} image={image} priority={i === 0} className="mb-4" />
        ))}
        {introHtml ? (
          <div className={`${COPY} [&>p:first-child]:text-[15px] [&>p:first-child]:text-brand-dark sm:[&>p:first-child]:text-[16px]`} dangerouslySetInnerHTML={{ __html: introHtml }} />
        ) : (
          <p className="text-[15px] leading-[1.65] text-brand-dark sm:text-[16px]">
            {name}
            {brand ? ` by ${brand}` : ""}. Detailed product information will be available soon.
          </p>
        )}
      </div>

      <aside aria-label="At a glance" className="lg:sticky lg:top-[calc(var(--pdp-sticky-top,var(--sticky-header))+16px)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div className="bg-brand-surface px-4 py-3.5">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-brand-coral">At a glance</p>
          {facts.length > 0 && <dl className="mt-1">{facts.map((f) => <Fact key={f.label} {...f} />)}</dl>}
        </div>

        {notes.map((section) => (
          <div key={section.title} className="mt-5 px-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-brand-coral">{section.title}</p>
            <Section section={section} />
          </div>
        ))}

        <div className="mt-3 flex items-center gap-3 bg-brand-coral/8 px-4 py-3 text-[13px] leading-[1.45] text-brand-dark">
          <GuaranteeIcon className="h-[32px] w-[32px] shrink-0" />
          <span>
            <strong className="block font-semibold">100% authentic product</strong>
            {origin ? `Imported from ${origin}, ` : ""}sourced and checked by BanglaShoppers.
          </span>
        </div>
      </aside>

      {story.length > 0 && (
        <div className="min-w-0 space-y-6 lg:col-start-1 lg:space-y-7">
          {story.map((section) => (
            <section key={section.title}>
              <TabHeading>{section.title}</TabHeading>
              <Section section={section} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDescription;
