import clsx from "clsx";

const dots = "mx-px inline-block h-1.5 w-1.5 animate-pulse rounded-full";

export default function LoadingDots({ className = "bg-white" }: { className?: string }) {
  return (
    <span className="mx-2 inline-flex items-center space-x-1">
      <span className={clsx(dots, className)} />
      <span className={clsx(dots, "opacity-75", className)} />
      <span className={clsx(dots, "opacity-50", className)} />
    </span>
  );
}
