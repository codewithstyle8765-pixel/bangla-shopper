import type { FooterData, StoreLocation } from "@/types/storefront";

/** Content mirrors the live banglashoppers.com footer (desktop theme). */
export const MOCK_FOOTER: FooterData = {
  newsletterTitle: "Stay Updated with Best Deals",
  newsletterText: "Get exclusive offers, latest updates and more.",
  contact: {
    title: "Corporate Headquarter",
    address: "House: 134, Road: 12, Block: E, Banani, Dhaka - 1213",
    hotline: "01879 222 444",
    email: "sales@banglashoppers.com",
    hours: "Everyday 11AM - 9PM",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9!2d90.40541475346524!3d23.791525578936316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c0a255685%3A0x18f759447736d0b!2sBangla%20Shoppers!5e0!3m2!1sen!2sbd!4v1596823006600!5m2!1sen!2sbd",
  },
  columns: [
    {
      title: "Corporate Details",
      links: [
        { label: "About BanglaShoppers", href: "/about-banglashoppers" },
        { label: "Investor Relationship", href: "/investor-relationship" },
        { label: "Apply For Job", href: "/careers" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Shipping & Returns", href: "/delivery-return-policy" },
        { label: "Track Your Order", href: "/sales/guest/form" },
        { label: "International Shipping", href: "/delivery-return-policy" },
        { label: "Payment Method", href: "/payment-method" },
        { label: "About Us", href: "/about-banglashoppers" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Help & Information",
      links: [
        { label: "Terms & Condition", href: "/terms-condition" },
        { label: "Privacy Policy", href: "/privacy-policy-cookie-restriction-mode" },
        { label: "Refund Policy", href: "/delivery-return-policy" },
        { label: "Delivery & Return Policy", href: "/delivery-return-policy" },
        { label: "Same Day Express Delivery!", href: "/delivery-return-policy" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "More For You",
      links: [
        { label: "Become An Affiliate", href: "/banglashoppers-affiliate-program" },
        { label: "Become A Drop Shipper", href: "/banglashoppers-drop-shipping-program" },
        { label: "Become A Franchise", href: "/banglashoppers-franchise-opportunity" },
        { label: "Become A Retailer", href: "/banglashoppers-retailer-program" },
        { label: "Become a Wholesaler", href: "/wholesale-inquiry" },
      ],
    },
  ],
  social: [
    { network: "facebook", href: "https://www.facebook.com/banglashoppers" },
    { network: "youtube", href: "https://www.youtube.com/banglashoppers" },
    { network: "twitter", href: "https://twitter.com/banglashoppers" },
    { network: "instagram", href: "https://www.instagram.com/banglashoppers" },
    { network: "tiktok", href: "https://www.tiktok.com/@banglashoppers" },
    { network: "pinterest", href: "https://www.pinterest.com/banglashoppers" },
    { network: "linkedin", href: "https://www.linkedin.com/company/banglashoppers" },
  ],
  apps: {
    ios: "https://apps.apple.com/us/app/banglashoppers-cosmetics-shop/id1586953705",
    android: "https://play.google.com/store/apps/details?id=com.banglashoppers.android",
  },
  highlights: [
    { icon: "secure", title: "100% Secure Payments", text: "Your information is safe with us" },
    { icon: "delivery", title: "Fast Delivery", text: "Across Bangladesh" },
    { icon: "support", title: "24/7 Support", text: "Always Here" },
  ],
  copyright: "© 2007 - 2026 Bangla Shoppers. All Rights Reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy-cookie-restriction-mode" },
    { label: "Terms & Conditions", href: "/terms-condition" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};


/** Showrooms from the live banglashoppers.com/locations page. */
export const MOCK_STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "banani",
    name: "Banani Corporate Branch",
    area: "Banani, Dhaka",
    image: "/assets/images/mock/stores/banani-corporate-branch.jpg",
    hours: "Everyday 11AM - 9PM",
    opens: "11:00",
    closes: "21:00",
    phone: "+880 1559 222 444",
    email: "sales@banglashoppers.com",
    address: ["House: 134, Road: 12, Block: E", "Banani, Dhaka - 1213, Bangladesh"],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.037107429489!2d90.40541475346524!3d23.791525578936316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c0a255685%3A0x18f759447736d0b!2sBangla+Shoppers!5e0!3m2!1sen!2sbd!4v1504990857314",
    directions: "https://www.google.com/maps/dir/?api=1&destination=23.791525578936316,90.40541475346524",
  },
  {
    id: "baily-road",
    name: "Baily Road Branch",
    area: "New Baily Road, Dhaka",
    image: "/assets/images/mock/stores/baily-road-branch.jpg",
    hours: "Everyday 11AM - 9PM, Thursday closed",
    closedDays: [4],
    opens: "11:00",
    closes: "21:00",
    phone: "+880 1841 240 235",
    email: "sales@banglashoppers.com",
    address: ["AQP Tower (1st Floor), 143/2 New Baily Road", "Dhaka - 1000, Bangladesh"],
    landmark: "Opposite Fakruddin Restaurant",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d645.6167923375178!2d90.40805811808012!3d23.741667058103836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b88d62f52017%3A0x49dc02db1bfe4ed8!2sBaily+Rd%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1519812340704",
    directions: "https://www.google.com/maps/dir/?api=1&destination=23.741667058103836,90.40805811808012",
  },
];
