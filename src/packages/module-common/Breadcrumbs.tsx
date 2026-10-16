import Link from "next/link";
import clsx from "clsx";
import { SITE_URL } from "@/lib/config";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Emit schema.org BreadcrumbList (disable on non-indexed pages). */
  structuredData?: boolean;
  className?: string;
}

/** Render once per page; it owns its spacing, so pages pass items only. */
export function Breadcrumbs({ items, structuredData = true, className }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const jsonLd = structuredData
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
        })),
      }
    : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        /* Full-width bottom rule while the trail stays on the page grid. */
        "relative mb-2 font-sans lg:mb-4 before:absolute before:bottom-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-b before:border-card-border",
        className,
      )}
    >
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[14px] text-crumb pb-1.5 sm:pt-1.5 lg:py-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-2">
              {item.href && !isLast ? (
                <>
                  <Link href={item.href} className="transition-colors hover:text-brand-coral">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-crumb-separator">
                    &gt;&gt;
                  </span>
                </>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={clsx(isLast && "font-semibold")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
