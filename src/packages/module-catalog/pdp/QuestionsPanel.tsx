"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { SearchIcon } from "@/packages/module-common/icons/UiIcons";
import { Collapse } from "@/packages/module-common/Collapse";
import { ShowMoreButton, scrollBackTo } from "@/packages/module-common/ShowMoreButton";
import type { ProductQuestion } from "@/types/storefront";
import { AskQuestionDialog } from "./AskQuestionDialog";

const PREVIEW_QUESTIONS = 3;

function QuestionMessageIcon({ className = "w-6 h-6 text-footer-text" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Q&A: summary + search + "Ask a question" beside an accordion of answered questions (stacked on phones). */
export function QuestionsPanel({ questions, productName, sku }: { questions: ProductQuestion[]; productName: string; sku: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const uid = useId();
  const term = query.trim().toLowerCase();
  const visible = questions
    .map((q, index) => ({ ...q, index }))
    .filter((q) => !term || `${q.question} ${q.answer}`.toLowerCase().includes(term));
  const [asking, setAsking] = useState(false);
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
          <button
            type="button"
            onClick={() => setAsking(true)}
            className="mt-3 flex h-11 w-full shrink-0 cursor-pointer items-center md:max-lg:mt-0 md:max-lg:w-auto justify-center gap-2 rounded-[4px] bg-brand-coral px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover"
          >
            Ask a question
          </button>
        </aside>

        <div className="min-w-0">
          {count === 0 ? (
            <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral mb-3">
                <QuestionMessageIcon className="w-6 h-6 text-brand-coral" />
              </div>
              <p className="text-[15px] sm:text-[16px] font-bold text-brand-dark">
                No questions asked yet
              </p>
              <p className="text-[13px] sm:text-[14px] text-text-subtle mt-1 max-w-[400px] leading-relaxed">
                Have a question about this product&apos;s usage, ingredients, or authenticity? Be the first to ask!
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
              <p className="text-[15px] font-medium text-brand-dark">
                No questions match “{query.trim()}”.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="cursor-pointer text-[13px] font-semibold text-brand-link hover:underline"
                >
                  Clear search
                </button>
                <span className="text-muted-line">|</span>
                <button
                  type="button"
                  onClick={() => setAsking(true)}
                  className="cursor-pointer text-[13px] font-semibold text-brand-coral hover:underline"
                >
                  Ask this question
                </button>
              </div>
            </div>
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
      <AskQuestionDialog open={asking} onClose={() => setAsking(false)} sku={sku} productName={productName} />
    </div>
  );
}

export default QuestionsPanel;
