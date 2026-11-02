"use client";

import { useRef, useState, type ReactNode } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import { MobileBottomNav } from "./MobileBottomNav";
import MobileNavDrawer from "@/packages/module-theme/layout/mega-menu/MobileNavDrawer";
import type { NavCategory } from "@/types/storefront";

import type { AnnouncementBarData } from "./announcements.types";

interface HeaderProps {
  categories: NavCategory[];
  children?: ReactNode;
  cartCount?: number;
  hotline?: string;
  announcements?: AnnouncementBarData | null;
}

export function Header({ categories, cartCount, hotline, announcements, children }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  /* Dismissal lasts until the next page load. */
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      {showAnnouncement && announcements && (
        <HeaderTopBar
          onDismiss={() => setShowAnnouncement(false)}
          bar={announcements}
        />
      )}
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
