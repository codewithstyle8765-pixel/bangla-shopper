import type { MagentoHomePage } from "@/types/magento";

const tile = (name: string, file: string, link: string, folder: "category" | "concern") => ({
  name,
  image: `/assets/images/mock/${folder}/${file}.png`,
  link,
});

/** `homePage` response; `hero_layout` is the template the admin selected. */
export const MOCK_HOME_PAGE: MagentoHomePage = {
  hero_layout: "GRID", //GRID
  hero_slides: [
    { image: "/assets/images/mock/hero-ponds.jpg", alt: "Pond's Miracle Me special offers", link: "/category/skin-care" },
    { image: "/assets/images/home/r_main_banner.jpg", alt: "Best beauty products, flat up to 15% off", link: "/category/sale-items" },
  ],
  hero_grid_main_banners: [
    { image: "/assets/images/home/r_main_banner.jpg", alt: "Best beauty products, flat up to 15% off", link: "/category/sale-items" },
    { image: "/assets/images/mock/hero-grid/ponds.jpg", alt: "Pond's Miracle Me special offers", link: "/category/skin-care" },
    { image: "/assets/images/mock/hero-grid/baby-skincare.jpg", alt: "Baby skincare essentials combo, up to 35% off", link: "/category/mom-and-baby" },
  ],
  hero_grid_side_banners: [
    { image: "/assets/images/home/l1_banner.jpg", alt: "Absolute New York makeup", link: "/category/makeup" },
    { image: "/assets/images/home/l2_banner.jpg", alt: "Simple skin care", link: "/category/skin-care" },
    { image: "/assets/images/home/l3_banner.jpg", alt: "Boots for smooth and glowing skin", link: "/category/skin-care" },
  ],
  category_layout: "POPULAR_CATEGORY", //SHOP_BY_CATEGORY
  shop_by_category: [
    tile("Makeup Shop", "makeup-shop", "/category/makeup", "category"),
    tile("Health & Beauty Shop", "health-beauty", "/category/skin-care", "category"),
    tile("Perfume Shop", "perfume", "/category/fragrance", "category"),
    tile("Fashion Accessories", "fashion-accessories", "/category/accessories", "category"),
    tile("Eye Makeup", "eye-makeup", "/category/makeup/eye", "category"),
    tile("Lip Makeup", "lip-makeup", "/category/makeup/lip", "category"),
    tile("Makeup Remover", "makeup-remover", "/category/makeup/remover", "category"),
    tile("Shampoo & Conditioner", "shampoo-conditioner", "/category/hair-care/wash-condition", "category"),
    tile("Hair Care Shop", "hair-care", "/category/hair-care", "category"),
    tile("Bath & Body Shop", "bath-body", "/category/skin-care/cleansers", "category"),
    tile("Kids & Baby Shop", "kids-baby", "/category/mom-and-baby", "category"),
    tile("Grooming Shop", "grooming", "/category/hair-care/treat-style", "category"),
    tile("Face Makeup", "face-makeup", "/category/makeup/face", "category"),
    tile("Makeup Brush", "makeup-brush", "/category/makeup/tools/brushes", "category"),
    tile("Nails", "nails", "/category/makeup/nail", "category"),
    tile("Wet Wipes Cleanser", "wet-wipes", "/category/makeup/remover/wipes", "category"),
  ],
  popular_categories: [
    { name: "Makeup", image: "/assets/images/home/makeup_1000x1000.png", link: "/category/makeup" },
    { name: "K-Beauty", image: "/assets/images/home/k_beauty_1000x1000.png", link: "/category/k-beauty" },
    { name: "Hair Care", image: "/assets/images/home/hair_care_1000x1000.png", link: "/category/hair-care" },
    { name: "Mom & Baby", image: "/assets/images/home/mom_and_baby_1000x1000.png", link: "/category/mom-and-baby" },
    { name: "Skin Care", image: "/assets/images/home/skin_care_1000x1000.png", link: "/category/skin-care" },
    { name: "Accessories", image: "/assets/images/home/accessories_1000x1000.png", link: "/category/accessories" },
    { name: "Undergarments", image: "/assets/images/home/undergarments_1000x1000.png", link: "/category/undergarments" },
    { name: "Fragrance", image: "/assets/images/home/fragrance_1000x1000.png", link: "/category/fragrance" },
  ],
  sort_order: [
    "hero",
    "wide_banner",
    "vip_offers",
    "categories",
    "premium_brands",
    "shop_by_concern",
    "shoppers_trends",
    "double_cashback",
    "beauty_tech",
    "landed_just_now",
    "seo_about",
  ].map((section_id, index) => ({ section_id, sort_order: (index + 1) * 10 })),
  shop_by_concern: [
    tile("Acne Treatment", "acne", "/category/skin-care", "concern"),
    tile("Anti Aging Treatment", "anti-aging", "/category/skin-care/serums", "concern"),
    tile("Dandruff Solution", "dandruff", "/category/hair-care", "concern"),
    tile("Dry Skin Treatment", "dry-skin", "/category/skin-care/moisturizers", "concern"),
    tile("Hair Fall Treatment", "hair-fall", "/category/hair-care/treat-style", "concern"),
    tile("Oil Control Treatment", "oil-control", "/category/skin-care/cleansers", "concern"),
    tile("Pore Care", "pore-care", "/category/skin-care", "concern"),
    tile("Spot Treatment", "spot", "/category/skin-care/serums", "concern"),
    tile("Hair Thinning Solution", "hair-thinning", "/category/hair-care", "concern"),
    tile("Sun Burn Treatment", "sun-burn", "/category/skin-care/sunscreen", "concern"),
  ],
};
