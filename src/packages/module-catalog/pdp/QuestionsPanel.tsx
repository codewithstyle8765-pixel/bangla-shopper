"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { SearchIcon } from "@/packages/module-common/icons/UiIcons";
import { Collapse } from "@/packages/module-common/Collapse";
import { ShowMoreButton, scrollBackTo } from "@/packages/module-common/ShowMoreButton";

const PREVIEW_QUESTIONS = 3;

export interface ProductQuestion {
  question: string;
  answer: string;
}

const SUPPORT_EMAIL = "support@banglashoppers.com";

/** Q&A: summary + search + "Ask a question" beside an accordion of answered questions (stacked on phones). */
export function QuestionsPanel({ questions, productName }: { questions: ProductQuestion[]; productName: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const uid = useId();
  const term = query.trim().toLowerCase();
  const visible = questions
    .map((q, index) => ({ ...q, index }))
    .filter((q) => !term || `${q.question} ${q.answer}`.toLowerCase().includes(term));
  const askHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Question about ${productName}`)}`;
  const count = questions.length;
  /* Searching looks through every question; the preview only trims the unfiltered list. */
  const collapsible = !term && visible.length > PREVIEW_QUESTIONS + 1;
  const listed = collapsible && !showAll ? visible.slice(0, PREVIEW_QUESTIONS) : visible;

  return (
    <div className="font-sans">
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8 desk:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="self-start rounded-[8px] bg-brand-surface p-4 sm:p-5 md:max-lg:flex md:max-lg:items-center md:max-lg:gap-4 lg:sticky lg:top-[calc(var(--pdp-sticky-top,var(--sticky-header))+16px)]">
          <p className="flex shrink-0 items-baseline gap-2">
            <span className="text-[34px] font-bold leading-none text-brand-dark">{count}</span>
            <span className="text-[14px] text-footer-text">answered question{count === 1 ? "" : "s"}</span>
          </p>

          <label htmlFor={`${uid}-search`} className="sr-only">
            Search questions
          </label>
          <div className="mt-4 flex h-11 items-center md:max-lg:mt-0 md:max-lg:flex-1 gap-2 rounded-[8px] border border-card-border bg-white px-3 focus-within:border-brand-dark">
            <SearchIcon className="h-[18px] w-[18px] shrink-0 text-footer-text" />
            <input
              id={`${uid}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions"
              className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-brand-dark outline-none lg:text-[14px] placeholder:text-footer-text [&::-webkit-search-cancel-button]:hidden"
            />
          </div>

          <p className="mt-5 text-[14px] font-semibold text-brand-dark md:max-lg:hidden">Have a question about this product?</p>
          <a
            href={askHref}
            className="mt-3 flex h-11 shrink-0 items-center md:max-lg:mt-0 justify-center gap-2 rounded-[4px] bg-brand-coral px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover"
          >
            Ask a question
          </a>
        </aside>

        <div className="min-w-0">
          {visible.length === 0 ? (
            <p className="py-6 text-[14px] text-footer-text">
              No questions match “{query.trim()}”.{" "}
              <a href={askHref} className="font-semibold text-brand-link underline-offset-2 hover:underline">
                Ask it instead
              </a>
            </p>
          ) : (
            <ul id={`${uid}-list`} className="divide-y divide-card-border">
              {listed.map(({ question, answer, index }) => {
                const expanded = open === index;
                return (
                  <li key={question}>
                    <h4>
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : index)}
                        aria-expanded={expanded}
                        aria-controls={`${uid}-a${index}`}
                        className="flex w-full cursor-pointer items-start gap-3 py-4 text-left"
                      >
                        <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-coral text-[13px] font-bold text-white">
                          Q
                        </span>
                        <span className="flex-1 pt-[3px] text-[15px] font-semibold leading-[1.45] text-brand-dark sm:text-[16px]">{question}</span>
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          className={clsx("mt-[7px] h-3 w-3 shrink-0 text-brand-dark transition-transform duration-(--duration-panel)", expanded && "rotate-180")}
                        >
                          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </h4>
                    <Collapse open={expanded} id={`${uid}-a${index}`}>
                      <p className="flex items-start gap-3 pb-4 text-[14px] leading-[1.6] text-brand-ink sm:text-[15px]">
                        <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.5px] border-brand-coral text-[13px] font-bold text-brand-coral">
                          A
                        </span>
                        <span className="pt-[3px]">{answer}</span>
                      </p>
                    </Collapse>
                  </li>
                );
              })}
            </ul>
          )}
          {collapsible && (
            <ShowMoreButton
              open={showAll}
              onToggle={() => {
                if (showAll) scrollBackTo(document.getElementById(`${uid}-list`)?.closest("section") ?? null);
                setShowAll(!showAll);
              }}
              more={`See all ${count} questions`}
              controls={`${uid}-list`}
              className="mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionsPanel;
