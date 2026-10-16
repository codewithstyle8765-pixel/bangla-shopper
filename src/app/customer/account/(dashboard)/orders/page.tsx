import { Suspense } from "react";
import { OrdersPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { ListPager } from "@/packages/module-common/ListPager";
import { AccountSection, OrdersTable } from "@/packages/module-customer/AccountUi";
import { getOrdersPage } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "My Orders | BanglaShoppers", robots: { index: false } };

const SIZES = [5, 10, 20, 50];

type SearchParams = Promise<{ page?: string; limit?: string }>;

async function OrdersPageContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const limit = SIZES.includes(Number(params.limit)) ? Number(params.limit) : 10;
  const page = Math.max(1, Number(params.page) || 1);
  const orders = await getOrdersPage(page, limit);
  return (
    <>
      <PageTitle>My Orders</PageTitle>
      <AccountSection title={`${orders.total} ${orders.total === 1 ? "Order" : "Orders"}`}>
        <OrdersTable orders={orders.items} />
        {orders.total > 0 && (
          <ListPager pathname="/customer/account/orders" page={orders.page} pageSize={orders.pageSize} total={orders.total} totalPages={orders.totalPages} noun="orders" sizes={SIZES} />
        )}
      </AccountSection>
    </>
  );
}

export default function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPageContent searchParams={searchParams} />
    </Suspense>
  );
}
