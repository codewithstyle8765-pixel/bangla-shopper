"use client";

import { useRef, useState, type ReactNode } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import { MobileBottomNav } from "./MobileBottomNav";
import MobileNavDrawer from "@/packages/module-theme/layout/mega-menu/MobileNavDrawer";
import type { NavCategory } from "@/types/storefront";

interface HeaderProps {
  categories: NavCategory[];
  /** Desktop mega menu, kept inside the sticky part of the header. */
  children?: ReactNode;
  cartCount?: number;
  /** Store hotline (footer content); phones and tablets get a call button in the header. */
  hotline?: string;
}

export function Header({ categories, cartCount, hotline, children }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  /* Dismissal lasts until the next page load. */
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      {showAnnouncement && <HeaderTopBar onDismiss={() => setShowAnnouncement(false)} />}
      <header data-pin className="sticky top-0 z-40 w-full bg-white">
        <HeaderMain
          cartCount={cartCount}
          hotline={hotline}
        />
        {children}
      </header>
      <MobileBottomNav
        onOpenCategories={() => setIsMobileMenuOpen(true)}
        categoriesOpen={isMobileMenuOpen}
        categoriesButtonRef={categoriesButtonRef}
      />
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => {
          setIsMobileMenuOpen(false);
          categoriesButtonRef.current?.focus();
        }}
        categories={categories}
      />
    </>
  );
}

export default Header;
