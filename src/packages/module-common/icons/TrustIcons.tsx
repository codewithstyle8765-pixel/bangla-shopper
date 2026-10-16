import Image from "next/image";
import clsx from "clsx";

/** The client's vector trust icons (public/guarantee.svg, public/return-policy.svg); size them with className. */
export function GuaranteeIcon({ className }: { className?: string }) {
  return <Image src="/guarantee.svg" alt="" width={33} height={33} aria-hidden="true" className={clsx("shrink-0", className)} />;
}

/** Its artwork fills less of the box than the guarantee badge, so it is scaled up to look the same size. */
export function ReturnPolicyIcon({ className }: { className?: string }) {
  return <Image src="/return-policy.svg" alt="" width={33} height={33} aria-hidden="true" className={clsx("shrink-0 scale-[1.12]", className)} />;
}
