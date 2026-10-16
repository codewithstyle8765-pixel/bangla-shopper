import { PageTitle } from "@/packages/module-common/PageTitle";
import { ReadMore } from "@/packages/module-common/ReadMore";
import { sanitizeHtml } from "@/utils/product-description";

/** Admin copy styles: readable measure and paragraph rhythm; h2/h3 as small uppercase sub-headings. */
const COPY =
  "max-w-[960px] text-[15px] leading-[1.7] text-footer-text [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-brand-dark [&_h2,&_h3]:mt-6 [&_h2,&_h3]:mb-2 [&_h2,&_h3]:text-[14px] [&_h2,&_h3]:font-bold [&_h2,&_h3]:uppercase [&_h2,&_h3]:tracking-[0.1em] [&_h2,&_h3]:text-brand-dark [&_ul]:list-disc [&_ul]:pl-5 [&_li+li]:mt-1 [&_a]:text-brand-link [&_a]:underline-offset-2 hover:[&_a]:underline [&_img]:inline-block [&_img]:h-auto [&_img]:max-w-full";

/** Magento editors often fake headings as a paragraph holding only bold text; make those real h3s. */
const promoteBoldParagraphs = (html: string) =>
  html.replace(/<p[^>]*>\s*<(strong|b)>([^<]{1,120})<\/\1>\s*<\/p>/gi, "<h3>$2</h3>");

/** Category title + Magento category description (HTML), long copy collapsed behind Read more. */
export function CategoryContent({ title, html }: { title: string; html?: string }) {
  const content = promoteBoldParagraphs(sanitizeHtml(html ?? "")).trim();
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  return (
    <section aria-label={`About ${title}`} className="mt-6 lg:mt-8">
      <PageTitle className="mb-3">{title}</PageTitle>
      {content && (
        <ReadMore>
          {isHtml ? <div className={COPY} dangerouslySetInnerHTML={{ __html: content }} /> : <p className={COPY}>{content}</p>}
        </ReadMore>
      )}
    </section>
  );
}

export default CategoryContent;
