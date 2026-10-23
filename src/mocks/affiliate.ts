import { cookies } from "next/headers";
import { MOCK_PRODUCTS } from "./catalog";

/**
 * Mock Mirasvit Affiliate backend: one demo affiliate per browser, kept in a cookie.
 * The account starts as a non-affiliate so the Apply → Success → Dashboard flow can be walked through.
 */

const COOKIE = "bs_mock_affiliate";
const COOKIE_OPTS = { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 2592000 };
/** Mirasvit "Require manual approval": true shows the pending screens after applying. */
const REQUIRE_APPROVAL = false;
const MIN_PAYOUT = 50;
const REFERRAL_KEY = "a87ff679a2f3e71d9181a67b7542122c";
const DAY = 86_400_000;

type Vars = Record<string, unknown>;

interface MockProfile {
  website: string;
  instagram: string;
  twitter: string;
  source: string;
  payment_method: string;
  payment_details: string;
  notifications: boolean;
}

interface MockAffiliateState {
  status: "none" | "pending" | "approved";
  profile?: MockProfile;
  requests?: Array<{ id: string; created_at: string; amount: number }>;
}

async function read(token?: string | null): Promise<MockAffiliateState> {
  if (!token) throw new Error("The current customer isn't authorized.");
  const raw = (await cookies()).get(COOKIE)?.value;
  if (raw) {
    try {
      return JSON.parse(raw) as MockAffiliateState;
    } catch {
      /* fall through to a fresh account */
    }
  }
  return { status: "none" };
}

async function write(state: MockAffiliateState) {
  (await cookies()).set(COOKIE, JSON.stringify(state), COOKIE_OPTS);
}

const tiers = (first: [string, string, string, string], next: [string, string, string, string]) =>
  [
    ["Default", "The group for new affiliates and affiliates who referred fewer than 10 orders in total.", 0],
    ["Silver", "The group for affiliates who referred more than 10 orders in total.", 10],
    ["Gold", "The group for affiliates who referred more than 100 orders in total.", 100],
    ["Platinum", "The group for affiliates who referred more than 250 orders in total.", 250],
  ].map(([name, description, min_orders], i) => ({
    name,
    description,
    min_orders,
    commissions: [
      { value: first[i], text: "of order amount from first order" },
      { value: next[i], text: "of order amount from second and more orders" },
    ],
  }));

const PROGRAMS = [
  {
    id: "pay-per-sale",
    name: "Pay per Sale",
    type: "Pay per sale",
    description: null,
    groups: tiers(["2%", "3%", "5%", "7%"], ["1%", "2%", "3%", "5%"]),
  },
  {
    id: "pay-per-click",
    name: "Pay per Click",
    type: "Pay per click",
    description: null,
    groups: tiers(["TK 0.50", "TK 1.00", "TK 1.50", "TK 2.00"], ["TK 0.50", "TK 1.00", "TK 1.50", "TK 2.00"]).map((g) => ({
      ...g,
      commissions: [{ value: g.commissions[0].value, text: "per unique click" }],
    })),
  },
  {
    id: "skin-care-20",
    name: "Pay per Sale (20% discount)",
    type: "Pay per sale",
    description: "Use a coupon and buy any item from the Skin Care category with 20% discount.",
    groups: tiers(["2%", "3%", "5%", "7%"], ["1%", "2%", "3%", "5%"]),
  },
  {
    id: "makeup-10",
    name: "Pay per Sale (10% discount)",
    type: "Pay per sale",
    description: "Use a coupon and buy any item from the Makeup category with 10% discount.",
    groups: tiers(["2%", "3%", "5%", "7%"], ["1%", "2%", "3%", "5%"]),
  },
];

const CURRENT_GROUP = "Silver";
const ORDERS_REFERRED = 24;

const programsFor = (group: string | null) =>
  PROGRAMS.map((p) => ({ ...p, commissions: group ? (p.groups.find((g) => g.name === group)?.commissions ?? []) : [] }));

const COUPONS = [
  { program: "Pay per Sale (20% discount)", description: "Any item from the Skin Care category.", code: "AFL-JFGI", discount: "20%" },
  { program: "Pay per Sale (10% discount)", description: "Any item from the Makeup category.", code: "AFL-KUGP", discount: "10%" },
];

const BANNERS = [
  { id: "b1", title: "Skin Care Offer - Up to 30% OFF", image: "/assets/images/home/skin_care_offer.png", width: 311, height: 311, clicks: 13, impressions: 164, url: "/category/skin-care" },
  { id: "b2", title: "TRESemmé Hair Care Deals", image: "/assets/images/home/tresemme_offer.png", width: 311, height: 311, clicks: 9, impressions: 117, url: "/category/hair-care" },
  { id: "b3", title: "Mega Beauty Sale", image: "/assets/images/home/l2_banner.jpg", width: 300, height: 170, clicks: 15, impressions: 151, url: "/category/sale-items" },
];

const PAYMENT_METHODS = [
  { code: "bkash", label: "bKash" },
  { code: "nagad", label: "Nagad" },
  { code: "rocket", label: "Rocket" },
  { code: "bank", label: "Bank Transfer" },
];

const SOURCES = ["Social Media", "Internet Search", "From Promo on Another Site", "Recommended by Friend(s)", "Other"];

/** Paid-out history the client's live account shows. */
const PAST_WITHDRAWALS = [
  { id: "w4", days: 38, amount: 100, status: "denied" },
  { id: "w3", days: 52, amount: 50, status: "completed" },
  { id: "w2", days: 66, amount: 100, status: "denied" },
  { id: "w1", days: 80, amount: 100, status: "completed" },
];

/** Deterministic activity over the last 90 days: clicks most days, a commission every few days. */
function activity() {
  const now = Date.now();
  const events: Array<{ at: number; amount: number; details: string; kind: "click" | "order" | "withdrawal" }> = [];
  let order = 245;
  for (let day = 90; day >= 0; day--) {
    const at = now - day * DAY;
    if (day % 3 === 0) events.push({ at: at - 3_600_000, amount: 1, details: "Click", kind: "click" });
    if (day % 7 === 2) {
      const total = 1450 + ((day * 137) % 1900);
      events.push({ at, amount: Math.round(total * 0.03 * 100) / 100, details: `Commission for order #000000${order++} (TK ${total.toLocaleString("en-US")}.00)`, kind: "order" });
    }
  }
  for (const w of PAST_WITHDRAWALS.filter((w) => w.status === "completed")) {
    events.push({ at: now - w.days * DAY + 1_800_000, amount: -w.amount, details: `Withdrawal #${w.id.slice(1)} paid`, kind: "withdrawal" });
  }
  events.sort((a, b) => a.at - b.at);
  let balance = 0;
  return events.map((e, i) => {
    balance = Math.round((balance + e.amount) * 100) / 100;
    return { id: `t${i + 1}`, created_at: new Date(e.at).toISOString(), amount: e.amount, balance, details: e.details, kind: e.kind };
  });
}

function balanceFor(state: MockAffiliateState) {
  const rows = activity();
  const lifetime = rows.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const paid = -rows.filter((r) => r.amount < 0).reduce((s, r) => s + r.amount, 0);
  const open = (state.requests ?? []).reduce((s, r) => s + r.amount, 0);
  const round = (n: number) => Math.round(n * 100) / 100;
  return { current: round(lifetime - paid), on_hold: 0, lifetime: round(lifetime), paid: round(paid), open_withdrawals: round(open), min_payout: MIN_PAYOUT };
}

function readProfile(v: Vars): MockProfile {
  const input = v.input as Record<string, unknown>;
  return {
    website: String(input.website ?? ""),
    instagram: String(input.instagram ?? ""),
    twitter: String(input.twitter ?? ""),
    source: String(input.source ?? ""),
    payment_method: String(input.payment_method ?? ""),
    payment_details: String(input.payment_details ?? ""),
    notifications: Boolean(input.notifications),
  };
}

export const affiliateResolvers = {
  AffiliateOverview: () => ({ affiliateOverview: { min_payout: MIN_PAYOUT, programs: programsFor(null) } }),

  AffiliateAccount: async (_v: Vars, token?: string | null) => {
    const state = await read(token);
    const approved = state.status === "approved";
    return {
      affiliateAccount: {
        status: state.status,
        group_name: approved ? CURRENT_GROUP : "Default",
        referral_url: `https://www.banglashoppers.com/?acc=${REFERRAL_KEY}`,
        orders_referred: approved ? ORDERS_REFERRED : 0,
        balance: approved ? balanceFor(state) : { current: 0, on_hold: 0, lifetime: 0, paid: 0, open_withdrawals: 0, min_payout: MIN_PAYOUT },
        programs: programsFor(approved ? CURRENT_GROUP : "Default"),
        coupons: approved ? COUPONS : [],
        banners: approved ? BANNERS : [],
        profile: state.profile ?? null,
        payment_methods: PAYMENT_METHODS,
        sources: SOURCES,
        widget_products: MOCK_PRODUCTS.slice(0, 12).map((p) => ({ name: p.name, image: p.small_image?.url ?? "", price: p.price_range.minimum_price.final_price.value })),
      },
    };
  },

  AffiliateTransactions: async (_v: Vars, token?: string | null) => {
    const state = await read(token);
    const items = state.status === "approved" ? activity().reverse().map(({ kind: _kind, ...row }) => row) : [];
    return { affiliateTransactions: { items } };
  },

  AffiliateWithdrawals: async (_v: Vars, token?: string | null) => {
    const state = await read(token);
    if (state.status !== "approved") return { affiliateWithdrawals: { items: [] } };
    const past = PAST_WITHDRAWALS.map((w) => ({ id: w.id, created_at: new Date(Date.now() - w.days * DAY).toISOString(), amount: w.amount, fee: 0, status: w.status }));
    const open = (state.requests ?? []).map((r) => ({ ...r, fee: 0, status: "pending" })).reverse();
    return { affiliateWithdrawals: { items: [...open, ...past] } };
  },

  AffiliateStatistics: async (v: Vars, token?: string | null) => {
    const state = await read(token);
    const from = new Date(`${String(v.from)}T00:00:00`).getTime();
    const to = new Date(`${String(v.to)}T23:59:59`).getTime();
    const rows = state.status === "approved" ? activity().filter((r) => +new Date(r.created_at) >= from && +new Date(r.created_at) <= to) : [];
    const clicks = rows.filter((r) => r.kind === "click");
    const orders = rows.filter((r) => r.kind === "order");
    const earned = Math.round(rows.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0) * 100) / 100;
    const days = Math.max(1, Math.round((to - from) / DAY));
    const step = days > 45 ? 14 : days > 14 ? 7 : 1;
    const chart: Array<{ date: string; balance: number; earned: number }> = [];
    for (let start = from; start <= to; start += step * DAY) {
      const end = Math.min(to, start + step * DAY - 1);
      const inBucket = rows.filter((r) => +new Date(r.created_at) >= start && +new Date(r.created_at) <= end);
      const last = activity().filter((r) => +new Date(r.created_at) <= end).pop();
      chart.push({
        date: new Date(start).toISOString(),
        balance: state.status === "approved" ? (last?.balance ?? 0) : 0,
        earned: Math.round(inBucket.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0) * 100) / 100,
      });
    }
    return {
      affiliateStatistics: {
        clicks: clicks.length,
        unique_clicks: Math.ceil(clicks.length * 0.8),
        leads: orders.length > 0 ? 1 : 0,
        orders: orders.length,
        views: clicks.length * 3 + orders.length,
        earned,
        chart,
        events: rows
          .filter((r) => r.kind !== "withdrawal")
          .reverse()
          .slice(0, 8)
          .map((r) => ({ created_at: r.created_at, type: r.kind === "order" ? "Order" : "Click", details: r.details })),
      },
    };
  },

  JoinAffiliateProgram: async (v: Vars, token?: string | null) => {
    await read(token);
    const status = REQUIRE_APPROVAL ? "pending" : "approved";
    await write({ status, profile: readProfile(v) });
    return { joinAffiliateProgram: { status } };
  },

  UpdateAffiliateProfile: async (v: Vars, token?: string | null) => {
    const state = await read(token);
    await write({ ...state, profile: readProfile(v) });
    return { updateAffiliateProfile: { status: state.status } };
  },

  RequestAffiliateWithdrawal: async (v: Vars, token?: string | null) => {
    const state = await read(token);
    const amount = Number(v.amount);
    const balance = balanceFor(state);
    const available = balance.current - balance.open_withdrawals;
    if (balance.current < MIN_PAYOUT) throw new Error(`A minimum balance of TK ${MIN_PAYOUT.toFixed(2)} is required for a withdrawal.`);
    if (!(amount > 0) || amount > available) throw new Error(`You can withdraw up to TK ${available.toFixed(2)}.`);
    const requests = [...(state.requests ?? []), { id: `w${5 + (state.requests?.length ?? 0)}`, created_at: new Date().toISOString(), amount }];
    await write({ ...state, requests });
    return { requestAffiliateWithdrawal: { status: "pending" } };
  },
};
