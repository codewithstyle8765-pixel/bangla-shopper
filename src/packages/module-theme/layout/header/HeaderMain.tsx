"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Collapse } from "@/packages/module-common/Collapse";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderAccountLink } from "./HeaderAccountLink";
import { SearchBar } from "./SearchBar";
import { BrandLogo, CompactBrandLogo } from "./BrandLogo";
import { Container } from "@/packages/module-common/Container";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { useWishlist } from "@/packages/module-quote/context/WishlistContext";
import { CartIcon, HeartIcon, SearchIcon } from "@/packages/module-common/icons/UiIcons";
import { useAuthHref } from "@/packages/module-customer/session";
import { PhoneIcon } from "../footer/FooterIcons";

interface HeaderMainProps {
  cartCount?: number;
  hotline?: string;
}

export function HeaderMain({ cartCount: cartCountProp, hotline }: HeaderMainProps) {
  const { openCart, totalCount, isCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const wishlistHref = useAuthHref("/customer/account/wishlist");
  /* Below lg the search row opens from the search icon. */
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  /* Open on the results page (also after a reload or filter change), closed everywhere else. */
  useEffect(() => {
    setSearchOpen(pathname === "/search");
  }, [pathname]);
  const cartCount = cartCountProp ?? totalCount;

  return (
    <div className="w-full bg-white relative">
      <div className="lg:hidden">
        <Container className="py-2 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Link href="/" className="block shrink-0">
              <CompactBrandLogo className="block h-auto w-[176px] min-[380px]:w-[196px] sm:w-[210px]" />
            </Link>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            {hotline && (
              <a
                href={`tel:${hotline.replace(/\s+/g, "")}`}
                aria-label={`Call us: ${hotline}`}
                className="flex h-10 w-9 shrink-0 items-center justify-center text-brand-dark transition-colors hover:text-brand-coral"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                if (searchOpen) return setSearchOpen(false);
                flushSync(() => setSearchOpen(true));
                document.getElementById("search-mobile")?.focus({ preventScroll: true });
              }}
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              aria-controls="mobile-search"
              className="flex h-10 w-9 shrink-0 cursor-pointer items-center justify-center text-brand-dark transition-colors hover:text-brand-coral"
            >
              <SearchIcon className="w-5 h-5 text-brand-dark" />
            </button>
            <Link prefetch={false} href={wishlistHref} aria-label={`Wishlist, ${wishlistCount} items`} className="relative flex h-10 w-9 shrink-0 items-center justify-center">
              <HeartIcon className="w-5 h-5 text-brand-dark" />
              <span className="absolute top-0.5 right-0 min-w-[18px] h-4 px-1 bg-brand-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            </Link>

          </div>
        </Container>

        <Collapse open={searchOpen} id="mobile-search">
          {/* Top padding keeps the focus ring inside the animated (overflow-hidden) area. */}
          <Container className="pb-2.5 pt-[3px]">
            <SearchBar id="search-mobile" />
          </Container>
        </Collapse>
      </div>

      <Container className="hidden lg:flex items-start mt-[2px] relative font-sans desk:max-w-[1308px]">
        <Link href="/" className="-ml-[7px] xl:-ml-[10px] desk:-ml-px w-[220px] h-[55px] xl:w-[291px] xl:h-[73px] shrink-0 block">
          <BrandLogo priority className="block h-full w-full object-contain px-[7px] py-[9px] xl:px-[10px] xl:py-[12px]" />
        </Link>

        <SearchBar id="search-desktop" className="flex-1 min-w-0 desk:w-[626px] desk:flex-none ml-[12px] xl:ml-[18px] mt-[16px]" />

        <div className="w-auto xl:w-[355px] ml-[12px] xl:ml-[18px] mt-[19px] relative shrink-0 flex items-start gap-1 xl:gap-0">
          <button
            id="header-cart-desktop"
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
            className="flex items-start shrink-0 group hover:opacity-90 cursor-pointer text-left"
          >
            <CartIcon className="w-[24px] h-[24px] mt-[11px] block text-brand-black" />
            <div className="w-[55px] ml-[8px] mt-[1px] flex flex-col items-center">
              <div className="w-[30px] h-[17px] bg-brand-black text-white text-[14px] leading-[17px] rounded-[8.5px] text-center font-normal">
                {cartCount}
              </div>
              <p className="text-[14px] text-brand-black mt-[3px] text-center font-normal leading-none">
                My cart
              </p>
            </div>
          </button>

          <Link
            href={wishlistHref}
            prefetch={false}
            className="flex items-start shrink-0 group hover:opacity-90 ml-[12px]"
          >
            <HeartIcon className="w-[26px] h-[24px] mt-[11px] block text-brand-black" />
            <div className="w-[65px] ml-[6px] mt-[1px] flex flex-col items-center">
              <div className="w-[30px] h-[17px] bg-brand-black text-white text-[14px] leading-[17px] rounded-[8.5px] text-center font-normal">
                {wishlistCount}
              </div>
              <p className="text-[14px] text-brand-black mt-[6px] text-center font-normal leading-none">
                Wish List
              </p>
            </div>
          </Link>

          <HeaderAccountLink />
        </div>
      </Container>
    </div>
  );
}

export default HeaderMain;
