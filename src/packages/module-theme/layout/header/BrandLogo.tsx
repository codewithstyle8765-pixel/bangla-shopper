import Image from "next/image";

const LOGO = "/BanglaShoppers Wide Logo.svg";
const LOGO_SMALL = "/BanglaShoppers Wide Logo Small.svg";

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={LOGO} width={3822} height={671} alt="BanglaShoppers" priority={priority} className={className} />;
}

/** Phone / tablet header and drawer logo. */
export function CompactBrandLogo({ className, priority = true }: { className?: string; priority?: boolean }) {
  return <Image src={LOGO_SMALL} width={3822} height={671} alt="BanglaShoppers" priority={priority} className={className} />;
}

export default BrandLogo;
