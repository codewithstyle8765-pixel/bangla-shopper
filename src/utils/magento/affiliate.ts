import { cache } from "react";
import {
  AFFILIATE_ACCOUNT_QUERY,
  AFFILIATE_OVERVIEW_QUERY,
  AFFILIATE_STATISTICS_QUERY,
  AFFILIATE_TRANSACTIONS_QUERY,
  AFFILIATE_WITHDRAWALS_QUERY,
  JOIN_AFFILIATE_PROGRAM,
  REQUEST_AFFILIATE_WITHDRAWAL,
  UPDATE_AFFILIATE_PROFILE,
} from "@/graphql/affiliate";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type {
  AffiliateAccount,
  AffiliateOverview,
  AffiliateProfile,
  AffiliateProgram,
  AffiliateStatistics,
  AffiliateStatus,
  AffiliateTransaction,
  AffiliateWithdrawal,
  AffiliateWithdrawalStatus,
} from "@/types/storefront";
import { getCustomerToken } from "@/utils/session";

interface MagentoCommission {
  value: string;
  text: string;
}

interface MagentoAffiliateProgram {
  id: string;
  name: string;
  type: string;
  description: string | null;
  commissions: MagentoCommission[] | null;
  groups: Array<{ name: string; description: string; min_orders: number; commissions: MagentoCommission[] }> | null;
}

interface MagentoAffiliateAccount {
  status: string;
  group_name: string;
  referral_url: string;
  orders_referred: number;
  balance: { current: number; on_hold: number; lifetime: number; paid: number; open_withdrawals: number; min_payout: number };
  programs: MagentoAffiliateProgram[] | null;
  coupons: Array<{ program: string; description: string | null; code: string; discount: string }> | null;
  banners: Array<{ id: string; title: string; image: string; width: number; height: number; clicks: number; impressions: number; url: string }> | null;
  profile: {
    website: string | null;
    instagram: string | null;
    twitter: string | null;
    source: string | null;
    payment_method: string | null;
    payment_details: string | null;
    notifications: boolean;
  } | null;
  payment_methods: Array<{ code: string; label: string }> | null;
  sources: string[] | null;
  widget_products: Array<{ name: string; image: string; price: number }> | null;
}

const STATUSES: AffiliateStatus[] = ["none", "pending", "approved"];
const WITHDRAWAL_STATUSES: AffiliateWithdrawalStatus[] = ["pending", "completed", "denied"];

async function requireToken() {
  const token = await getCustomerToken();
  if (!token) throw new Error("Your session has expired. Please log in again.");
  return token;
}

const mapProgram = (p: MagentoAffiliateProgram): AffiliateProgram => ({
  id: p.id,
  name: p.name,
  type: p.type,
  description: p.description ?? undefined,
  commissions: p.commissions ?? [],
  groups: (p.groups ?? []).map((g) => ({ name: g.name, description: g.description, minOrders: g.min_orders, commissions: g.commissions })),
});

/** Public program details for the "Become an Affiliate" page; null when the backend does not expose them. */
export async function getAffiliateOverview(): Promise<AffiliateOverview | null> {
  try {
    const data = await graphqlRequestNoCache<{ affiliateOverview: { min_payout: number; programs: MagentoAffiliateProgram[] } | null }>(AFFILIATE_OVERVIEW_QUERY);
    const overview = data.affiliateOverview;
    return overview ? { minPayout: overview.min_payout, programs: overview.programs.map(mapProgram) } : null;
  } catch {
    return null;
  }
}

/** The signed-in customer's affiliate account; `status: "none"` until they join. */
export const getAffiliateAccount = cache(async (): Promise<AffiliateAccount> => {
  const data = await graphqlRequestNoCache<{ affiliateAccount: MagentoAffiliateAccount }>(AFFILIATE_ACCOUNT_QUERY, undefined, {
    context: authContext(await requireToken()),
  });
  const a = data.affiliateAccount;
  const profile = a.profile;
  return {
    status: STATUSES.includes(a.status as AffiliateStatus) ? (a.status as AffiliateStatus) : "none",
    group: a.group_name,
    referralUrl: a.referral_url,
    ordersReferred: a.orders_referred,
    balance: {
      current: a.balance.current,
      onHold: a.balance.on_hold,
      lifetime: a.balance.lifetime,
      paid: a.balance.paid,
      openWithdrawals: a.balance.open_withdrawals,
      minPayout: a.balance.min_payout,
    },
    programs: (a.programs ?? []).map(mapProgram),
    coupons: (a.coupons ?? []).map((c) => ({ ...c, description: c.description ?? undefined })),
    banners: a.banners ?? [],
    profile: {
      website: profile?.website ?? "",
      instagram: profile?.instagram ?? "",
      twitter: profile?.twitter ?? "",
      source: profile?.source ?? "",
      paymentMethod: profile?.payment_method ?? "",
      paymentDetails: profile?.payment_details ?? "",
      notifications: profile?.notifications ?? true,
    },
    paymentMethods: (a.payment_methods ?? []).map((m) => ({ value: m.code, label: m.label })),
    sources: a.sources ?? [],
    widgetProducts: a.widget_products ?? [],
  };
});

export async function getAffiliateTransactions(): Promise<AffiliateTransaction[]> {
  const data = await graphqlRequestNoCache<{ affiliateTransactions: { items: Array<{ id: string; created_at: string; amount: number; balance: number; details: string }> } }>(
    AFFILIATE_TRANSACTIONS_QUERY,
    undefined,
    { context: authContext(await requireToken()) },
  );
  return data.affiliateTransactions.items.map((t) => ({ id: t.id, date: t.created_at, amount: t.amount, balance: t.balance, details: t.details }));
}

export async function getAffiliateWithdrawals(): Promise<AffiliateWithdrawal[]> {
  const data = await graphqlRequestNoCache<{ affiliateWithdrawals: { items: Array<{ id: string; created_at: string; amount: number; fee: number; status: string }> } }>(
    AFFILIATE_WITHDRAWALS_QUERY,
    undefined,
    { context: authContext(await requireToken()) },
  );
  return data.affiliateWithdrawals.items.map((w) => ({
    id: w.id,
    date: w.created_at,
    amount: w.amount,
    fee: w.fee,
    status: WITHDRAWAL_STATUSES.includes(w.status as AffiliateWithdrawalStatus) ? (w.status as AffiliateWithdrawalStatus) : "pending",
  }));
}

export async function getAffiliateStatistics(from: string, to: string): Promise<AffiliateStatistics> {
  const data = await graphqlRequestNoCache<{
    affiliateStatistics: Omit<AffiliateStatistics, "from" | "to" | "uniqueClicks" | "events"> & {
      unique_clicks: number;
      events: Array<{ created_at: string; type: string; details: string }>;
    };
  }>(AFFILIATE_STATISTICS_QUERY, { from, to }, { context: authContext(await requireToken()) });
  const s = data.affiliateStatistics;
  return {
    from,
    to,
    clicks: s.clicks,
    uniqueClicks: s.unique_clicks,
    leads: s.leads,
    orders: s.orders,
    views: s.views,
    earned: s.earned,
    chart: s.chart,
    events: s.events.map((e) => ({ date: e.created_at, type: e.type, details: e.details })),
  };
}

const profileInput = (p: AffiliateProfile) => ({
  website: p.website,
  instagram: p.instagram,
  twitter: p.twitter,
  source: p.source,
  payment_method: p.paymentMethod,
  payment_details: p.paymentDetails,
  notifications: p.notifications,
});

/** Returns the new status: "approved" straight away unless the store requires manual approval. */
export async function joinAffiliateProgram(profile: AffiliateProfile): Promise<AffiliateStatus> {
  const data = await graphqlMutate<{ joinAffiliateProgram: { status: AffiliateStatus } }>(JOIN_AFFILIATE_PROGRAM, { input: profileInput(profile) }, await requireToken());
  return data.joinAffiliateProgram.status;
}

export async function updateAffiliateProfile(profile: AffiliateProfile) {
  await graphqlMutate(UPDATE_AFFILIATE_PROFILE, { input: profileInput(profile) }, await requireToken());
}

export async function requestAffiliateWithdrawal(amount: number) {
  await graphqlMutate(REQUEST_AFFILIATE_WITHDRAWAL, { amount }, await requireToken());
}
