import { Container } from "@/packages/module-common/Container";
import { sanitizeHtml } from "@/utils/product-description";

/** "Who Are We?" text from the home page API (admin HTML). */
export function SeoAboutSection({ title, html }: { title: string; html: string }) {
  return (
    <section aria-label="About BanglaShoppers" className="w-full mt-[16px]">
      <Container className="w-full desk:max-w-[1290.71px] mx-auto px-(--gutter) desk:px-0">
        <div
          className="w-full text-black font-sans"
          style={{
            width: "1290.71px",
            maxWidth: "100%",
            fontFamily: "var(--font-roboto), Roboto, sans-serif",
            fontSize: "14px",
            lineHeight: "16.8px",
            letterSpacing: "1.4px",
            fontWeight: 400,
          }}
        >
          <h2
            className="text-black font-bold mb-[12px] m-0 p-0"
            style={{
              fontSize: "14px",
              lineHeight: "16.8px",
              letterSpacing: "1.4px",
              marginBottom: "12px",
            }}
          >
            {title}
          </h2>

          <div
            className="space-y-[12px] text-black font-normal"
            style={{
              fontSize: "14px",
              lineHeight: "16.8px",
              letterSpacing: "1.4px",
              fontWeight: 400,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
          />
        </div>
      </Container>
    </section>
  );
}

export default SeoAboutSection;
