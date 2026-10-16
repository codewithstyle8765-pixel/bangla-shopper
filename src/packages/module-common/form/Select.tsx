"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  /** Submitted through a hidden input, so the select works inside plain forms. */
  name?: string;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** Trigger classes (size, border, type). */
  className?: string;
  /** Replaces the default chevron; it rotates while the list is open. */
  chevron?: ReactNode;
  "aria-label"?: string;
  direction?: "auto" | "down" | "up";
}

const GAP = 8;
const MAX_LIST_HEIGHT = 288;

/**
 * Themed listbox select (ARIA combobox pattern). The panel matches the trigger width,
 * flips above when there is no room below and never leaves the viewport.
 */
export function Select({
  id,
  name,
  options,
  value,
  defaultValue = "",
  onChange,
  onBlur,
  placeholder = "Select",
  disabled = false,
  invalid = false,
  describedBy,
  className,
  chevron,
  "aria-label": ariaLabel,
  direction = "auto",
}: SelectProps) {
  const listId = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const selected = options.find((o) => o.value === current);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [layout, setLayout] = useState({
    top: false,
    alignRight: false,
    maxHeight: MAX_LIST_HEIGHT,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ text: "", at: 0 });

  /** Index of the next option whose label starts with the typed letters (native-select behaviour). */
  const findTyped = (key: string) => {
    const now = Date.now();
    const text =
      (now - typeahead.current.at < 600 ? typeahead.current.text : "") +
      key.toLowerCase();
    typeahead.current = { text, at: now };
    return options.findIndex((o) => o.label.toLowerCase().startsWith(text));
  };

  const choose = useCallback(
    (option: SelectOption) => {
      if (value === undefined) setInner(option.value);
      if (option.value !== current) onChange?.(option.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [value, current, onChange],
  );

  const openList = () => {
    if (disabled) return;
    setActive(
      Math.max(
        0,
        options.findIndex((o) => o.value === current),
      ),
    );
    setOpen(true);
  };

  /* Place the panel inside the viewport before it paints. */
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom - GAP;
    const above = rect.top - GAP;
    const top = direction === "up" ? true : direction === "down" ? false : below < 200 && above > below;
    const room = (direction === "down" ? MAX_LIST_HEIGHT : (top ? above : below)) - 8;
    const panelWidth = panelRef.current?.offsetWidth ?? rect.width;
    setLayout({
      top,
      alignRight: rect.left + panelWidth > window.innerWidth - GAP,
      maxHeight: Math.max(120, Math.min(MAX_LIST_HEIGHT, room)),
    });
  }, [open, direction]);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open && active >= 0)
      document
        .getElementById(`${listId}-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        const index = findTyped(e.key);
        if (index >= 0) choose(options[index]);
      }
      return;
    }
    const last = options.length - 1;
    const move = (to: number) => {
      e.preventDefault();
      setActive(Math.min(last, Math.max(0, to)));
    };
    switch (e.key) {
      case "ArrowDown":
        return move(active + 1);
      case "ArrowUp":
        return move(active - 1);
      case "Home":
        return move(0);
      case "End":
        return move(last);
      case "PageDown":
        return move(active + 8);
      case "PageUp":
        return move(active - 8);
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[active]) choose(options[active]);
        return;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
          const index = findTyped(e.key);
          if (index >= 0) setActive(index);
        }
    }
  };

  const activeId =
    open && active >= 0 && options[active] ? `${listId}-${active}` : undefined;

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
          onBlur?.();
        }
      }}
    >
      {name && <input type="hidden" name={name} value={current} />}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={clsx(
          "flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-[4px] border bg-white px-3 text-left text-[14px] outline-none transition-colors",
          "focus-visible:border-brand-dark focus-visible:ring-2 focus-visible:ring-brand-coral/30 disabled:cursor-not-allowed disabled:bg-brand-surface disabled:text-footer-text",
          invalid
            ? "border-brand-alert"
            : open
              ? "border-brand-dark"
              : "border-card-border",
          className,
        )}
      >
        <span
          className={clsx(
            "truncate",
            selected ? "text-brand-dark" : "text-price-strikethrough",
          )}
        >
          {selected?.label ?? placeholder}
        </span>
        {chevron ? (
          <span
            aria-hidden="true"
            className={clsx(
              "flex shrink-0 transition-transform duration-(--duration-panel)",
              open && "rotate-180",
            )}
          >
            {chevron}
          </span>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={clsx(
              "shrink-0 text-brand-dark transition-transform duration-(--duration-panel)",
              open && "rotate-180",
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          /* Keeps focus on the trigger, so picking an option does not blur (and close) the select first. */
          onMouseDown={(e) => e.preventDefault()}
          className={clsx(
            "absolute z-50 w-max min-w-full max-w-[min(360px,calc(100vw-2rem))] animate-[panelIn_var(--duration-panel)_var(--ease-panel)] overflow-hidden rounded-[6px] border border-card-border bg-white shadow-card",
            layout.top ? "bottom-full mb-1" : "top-full mt-1",
            layout.alignRight ? "right-0" : "left-0",
          )}
        >
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={id}
            style={{ maxHeight: layout.maxHeight }}
            className="overflow-y-auto overscroll-contain py-1 touch-pan-y"
          >
            {options.map((option, index) => {
              const isSelected = option.value === current;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={(e) => {
                    if (e.pointerType === "mouse") setActive(index);
                  }}
                  onClick={() => choose(option)}
                  className={clsx(
                    "flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-[14px] leading-[1.3] break-words",
                    index === active && "bg-brand-surface",
                    isSelected
                      ? "font-semibold text-brand-coral"
                      : "text-brand-dark",
                  )}
                >
                  <span className="min-w-0">{option.label}</span>
                  {isSelected && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <path d="M5 12.5 10 17 19 7" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Select;
