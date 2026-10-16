
interface PrintInvoiceHeaderProps {
  orderNumber: string;
  createdAt: string;
  status?: string;
}

export function PrintInvoiceHeader({ orderNumber, createdAt, status }: PrintInvoiceHeaderProps) {
  const formattedDate = new Date(createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="hidden print:flex print:items-start print:justify-between print:border-b-2 print:border-brand-dark print:pb-4 print:mb-6">
      <div className="flex flex-col items-start text-left gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/BanglaShoppers Wide Logo.svg"
          alt="BanglaShoppers"
          className="h-9 w-auto max-w-[220px] object-contain object-left block"
        />
        <p className="text-[11px] text-footer-text print:text-neutral-600 mt-1 text-left">
          100% Authentic Cosmetics, Skincare &amp; Beauty Products
        </p>
        <p className="text-[11px] text-footer-text print:text-neutral-600 text-left">
          Hotline: +880 9614-222333 · www.banglashoppers.com
        </p>
      </div>

      <div className="text-right">
        <h1 className="text-[20px] font-black uppercase tracking-wider text-brand-dark">INVOICE</h1>
        <p className="text-[14px] font-bold text-brand-dark mt-1">
          Order #{orderNumber}
        </p>
        <p className="text-[12px] text-footer-text print:text-neutral-600 mt-0.5">
          Placed: {formattedDate}
        </p>
        {status && (
          <p className="text-[12px] font-semibold uppercase text-brand-dark mt-0.5">
            Status: {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default PrintInvoiceHeader;
