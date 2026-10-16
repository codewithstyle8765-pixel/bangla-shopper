import Link from "next/link";
import { Container } from "@/packages/module-common/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[420px] flex-col items-center justify-center py-16 text-center font-sans">
      <p className="text-[64px] font-black leading-none tracking-[0.1em] text-brand-coral">404</p>
      <h1 className="mt-4 text-[20px] font-bold uppercase tracking-[0.1em] text-brand-dark">Page not found</h1>
      <p className="mt-2 max-w-[420px] text-[14px] text-price-strikethrough">
        The page you are looking for may have moved or is no longer available.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="flex h-11 items-center rounded-[4px] bg-brand-coral px-6 text-[15px] font-semibold text-white hover:bg-brand-coral-hover"
        >
          Back to Home
        </Link>
        <Link
          href="/category/sale-items"
          className="flex h-11 items-center rounded-[4px] border-2 border-brand-black px-6 text-[15px] font-semibold text-brand-black hover:bg-brand-black hover:text-white"
        >
          Shop Sale Items
        </Link>
      </div>
    </Container>
  );
}
