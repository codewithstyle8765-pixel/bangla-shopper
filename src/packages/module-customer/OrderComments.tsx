import clsx from "clsx";
import type { OrderComment } from "@/types/storefront";
import { formatDateTime } from "@/utils/format";


export function CommentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 8.5h8M8 12h5" />
    </svg>
  );
}

/** Order comments as quoted notes (the shopper's checkout note first); renders nothing when there are none. */
export function OrderComments({ comments, showDate = true, className }: { comments?: OrderComment[]; showDate?: boolean; className?: string }) {
  if (!comments?.length) return null;
  return (
    <ul className={clsx("space-y-2.5", className)}>
      {comments.map((c) => (
        <li key={`${c.date}-${c.message}`} className="flex gap-3 rounded-[6px] border-l-[3px] border-brand-coral bg-brand-coral/5 px-3.5 py-3 print:break-inside-avoid">
          <CommentIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-coral" />
          <div className="min-w-0">
            <p className="whitespace-pre-line break-words text-[14px] leading-[1.55] text-brand-dark">{c.message}</p>
            {showDate && <p className="mt-1 text-[12px] text-footer-text">{formatDateTime(c.date)}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
