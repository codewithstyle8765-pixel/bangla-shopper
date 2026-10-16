import { Container } from "@/packages/module-common/Container";

export function SeoAboutSection() {
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
            Who Are We?
          </h2>

          <div
            className="space-y-[12px] text-black font-normal"
            style={{
              fontSize: "14px",
              lineHeight: "16.8px",
              letterSpacing: "1.4px",
              fontWeight: 400,
            }}
          >
            <p style={{ margin: 0, marginBottom: "12px", fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              BanglaShoppers.com is a trusted cosmetics and beauty retailer in Bangladesh, offering both online shopping and in-store shopping for a wide range of 100% authentic cosmetics, skincare, makeup, hair care, perfume, bath &amp; body, baby care, and personal care products from popular international brands.
            </p>

            <p style={{ margin: 0, marginBottom: "12px", fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              Finding original cosmetics and skincare products in Bangladesh can sometimes be challenging, especially with counterfeit and duplicate products in the market. At BanglaShoppers, product authenticity is our priority. We source genuine beauty products from international markets including the USA, Canada, UK, Germany, China, and other countries, helping customers shop for their favorite beauty brands with confidence.
            </p>

            <p style={{ margin: 0, marginBottom: "12px", fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              Whether you are looking for a face wash, moisturizer, serum, sunscreen, foundation, lipstick, shampoo, conditioner, hair treatment, body lotion, perfume, or makeup products, BanglaShoppers.com makes it easy to discover and shop for thousands of beauty and personal care products.
            </p>

            <p style={{ margin: 0, marginBottom: "12px", fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              Looking for Korean skincare in Bangladesh? Explore our collection of K-Beauty and Korean skincare products, alongside popular skincare, makeup, hair care, fragrance, and beauty brands from around the world.
            </p>

            <p style={{ margin: 0, marginBottom: "12px", fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              You can shop cosmetics and beauty products online in Bangladesh through BanglaShoppers.com and have your favorite products delivered to your doorstep, or visit our retail stores for an in-store shopping experience. We stand behind the authenticity of the products we sell and provide applicable product warranties along with our 7-day money-back guarantee.
            </p>

            <p style={{ margin: 0, fontSize: "14px", lineHeight: "16.8px", letterSpacing: "1.4px" }}>
              For authentic cosmetics, skincare, makeup, hair care, perfume, and beauty products in Bangladesh, shop online or visit BanglaShoppers retail stores with confidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SeoAboutSection;
