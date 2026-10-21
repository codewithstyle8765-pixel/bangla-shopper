"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { FooterData } from "@/types/storefront";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./FooterIcons";

interface FooterNavSectionsProps {
  contact: FooterData["contact"];
  columns: FooterData["columns"];
}

function ColumnTitle({ children }: { children: string }) {
  return (
    <h2 className="text-[16px] font-bold text-brand-dark">
      {children}
      <span aria-hidden="true" className="mt-2.5 block h-[2px] w-6 bg-brand-coral" />
    </h2>
  );
}

export function FooterNavSections({ contact, columns }: FooterNavSectionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const contactItems = [
    { icon: PinIcon, label: "Address", value: contact.address },
    { icon: PhoneIcon, label: "Hotline", value: contact.hotline, href: `tel:${contact.hotline.replace(/\s+/g, "")}` },
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: ClockIcon, label: "Open Time", value: contact.hours },
  ];

  const isContactOpen = !!openSections["contact"];

  return (
    <div className="flex flex-col border-t border-card-border divide-y divide-card-border lg:border-t-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:divide-y-0 xl:grid-cols-[minmax(0,1.9fr)_repeat(4,minmax(0,1fr))]">
      {/* 1. Corporate Headquarter (Contact) */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("contact")}
          aria-expanded={isContactOpen}
          aria-controls="footer-contact-panel"
          className="flex h-12 w-full cursor-pointer items-center justify-between text-left lg:hidden sm:h-[50px]"
        >
          <span className="text-[15px] font-bold leading-tight text-brand-dark">{contact.title}</span>
          <ChevronDownIcon
            className={clsx(
              "h-4 w-4 shrink-0 text-footer-text transition-transform duration-(--duration-panel)",
              isContactOpen && "rotate-180",
            )}
          />
        </button>

        <div className="hidden lg:block">
          <ColumnTitle>{contact.title}</ColumnTitle>
        </div>

        <div
          id="footer-contact-panel"
          className={clsx(
            "grid transition-[grid-template-rows,opacity] duration-(--duration-panel) ease-(--ease-panel) lg:!grid lg:!grid-rows-[1fr] lg:!opacity-100",
            isContactOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 max-lg:invisible",
          )}
        >
          <div className="min-h-0 overflow-hidden lg:overflow-visible">
            <div className="pb-3.5 pt-0.5 lg:pb-0 lg:pt-0">
              <address className="grid gap-2.5 not-italic text-[14px] leading-[1.45] text-footer-text sm:grid-cols-2 lg:mt-5 lg:grid-cols-1 lg:gap-4 lg:text-[13px] xl:max-w-[350px]">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <p key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-coral" />
                    <span>
                      <span className="block font-semibold text-brand-dark">{label}</span>
                      {href ? (
                        <a href={href} className="transition-colors hover:text-brand-coral">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </span>
                  </p>
                ))}
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Link Columns */}
      {columns.map((column) => {
        const isOpen = !!openSections[column.title];
        const panelId = `footer-col-${column.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <nav key={column.title} aria-label={column.title}>
            <button
              type="button"
              onClick={() => toggleSection(column.title)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex h-12 w-full cursor-pointer items-center justify-between text-left lg:hidden sm:h-[50px]"
            >
              <span className="text-[15px] font-bold leading-tight text-brand-dark">{column.title}</span>
              <ChevronDownIcon
                className={clsx(
                  "h-4 w-4 shrink-0 text-footer-text transition-transform duration-(--duration-panel)",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div className="hidden lg:block">
              <ColumnTitle>{column.title}</ColumnTitle>
            </div>

            <div
              id={panelId}
              className={clsx(
                "grid transition-[grid-template-rows,opacity] duration-(--duration-panel) ease-(--ease-panel) lg:!grid lg:!grid-rows-[1fr] lg:!opacity-100",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 max-lg:invisible",
              )}
            >
              <div className="min-h-0 overflow-hidden lg:overflow-visible">
                <div className="pb-3.5 pt-0.5 lg:pb-0 lg:pt-0">
                  <ul className="space-y-2 text-[14px] lg:mt-5 lg:space-y-3 lg:text-[13px]">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="group transition-colors hover:text-brand-coral">
                          {link.label.slice(0, link.label.lastIndexOf(" ") + 1)}
                          <span className="whitespace-nowrap">
                            {link.label.slice(link.label.lastIndexOf(" ") + 1)}
                            <ChevronRightIcon className="ml-1.5 inline-block h-3 w-3 align-[-1px] transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        );
      })}
    </div>
  );
}
