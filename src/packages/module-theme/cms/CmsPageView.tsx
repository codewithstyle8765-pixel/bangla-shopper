import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { PageTitle } from "@/packages/module-common/PageTitle";
import type { CmsPage } from "@/types/storefront";

/** Magento CMS page (About, policies, terms...): admin HTML styled by `.cms-content` in globals.css. */
export function CmsPageView({ page }: { page: CmsPage }) {
  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <article>
        <PageTitle className="mb-4">{page.title}</PageTitle>
        <div className="cms-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      </article>
    </Container>
  );
}

export default CmsPageView;
