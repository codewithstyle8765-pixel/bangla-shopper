import { Container } from "@/packages/module-common/Container";
import { Shimmer } from "@/packages/module-common/Shimmer";

/** Same footprint as HeroSlider (kept out of the client file so it adds no browser JS). */
export function HeroSliderSkeleton() {
  return (
    <section aria-hidden="true" className="-mt-[3px] sm:mt-0 lg:mt-[11px] xl:mt-[15px] mb-2 w-full md:mb-8 lg:mb-[72px]">
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <div className="aspect-[3/1] w-full">
          <Shimmer rounded="rounded-none" />
        </div>
        <div className="mt-[13px] flex justify-center gap-[15px]">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} width={15} height={15} rounded="rounded-full" />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HeroSliderSkeleton;
