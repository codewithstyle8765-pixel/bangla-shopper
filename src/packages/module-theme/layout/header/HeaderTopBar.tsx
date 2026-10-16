import { MailIcon } from "@/packages/module-common/icons/UiIcons";
import Link from "next/link";
import { Container } from "@/packages/module-common/Container";

export function HeaderTopBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <aside
      aria-label="Announcement bar"
      className="w-full bg-brand-black py-[10px] sm:py-[12px] relative z-20"
    >
      <Container className="relative flex items-center justify-center font-sans text-[13px] leading-none sm:grid sm:grid-cols-[1fr_auto_1fr] sm:text-[14px]">
        <div className="hidden sm:flex sm:self-start items-center justify-start shrink-0">
          <MailIcon className="w-[18px] h-[13px] self-start mt-px text-brand-coral" />
          <Link
            href="mailto:support@banglashoppers.com"
            className="ml-[6px] text-white hover:underline whitespace-nowrap tracking-normal"
          >
            Email: support@banglashoppers.com
          </Link>
        </div>

        <p className="text-brand-coral font-medium tracking-[0.1em] text-center whitespace-nowrap mt-[1px]">
          Free Shipping Over TK 3000
        </p>

        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-end gap-4 sm:static sm:translate-y-0">
          <p className="hidden md:block text-white whitespace-nowrap tracking-normal">Customer Support 24/7</p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss announcement"
            className="-my-3 grid h-9 w-9 sm:-mr-2 cursor-pointer place-items-center text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </Container>
    </aside>
  );
}

export default HeaderTopBar;
