import { gql } from "@apollo/client";

/*
 * Mirasvit Affiliate has no storefront GraphQL out of the box; these are the operations the
 * backend team is asked to expose (field names follow Magento's snake_case style).
 */

const COMMISSION_FIELDS = /* GraphQL */ `value text`;

const PROGRAM_FIELDS = /* GraphQL */ `
  id
  name
  type
  description
  commissions { ${COMMISSION_FIELDS} }
  groups { name description min_orders commissions { ${COMMISSION_FIELDS} } }
`;

export const AFFILIATE_OVERVIEW_QUERY = gql`
  query AffiliateOverview {
    affiliateOverview {
      min_payout
      programs { ${PROGRAM_FIELDS} }
    }
  }
`;

export const AFFILIATE_ACCOUNT_QUERY = gql`
  query AffiliateAccount {
    affiliateAccount {
      status
      group_name
      referral_url
      orders_referred
      balance { current on_hold lifetime paid open_withdrawals min_payout }
      programs { ${PROGRAM_FIELDS} }
      coupons { program description code discount }
      banners { id title image width height clicks impressions url }
      profile { website instagram twitter source payment_method payment_details notifications }
      payment_methods { code label }
      sources
      widget_products { name image price }
    }
  }
`;

export const AFFILIATE_TRANSACTIONS_QUERY = gql`
  query AffiliateTransactions {
    affiliateTransactions { items { id created_at amount balance details } }
  }
`;

export const AFFILIATE_WITHDRAWALS_QUERY = gql`
  query AffiliateWithdrawals {
    affiliateWithdrawals { items { id created_at amount fee status } }
  }
`;

export const AFFILIATE_STATISTICS_QUERY = gql`
  query AffiliateStatistics($from: String!, $to: String!) {
    affiliateStatistics(from: $from, to: $to) {
      clicks
      unique_clicks
      leads
      orders
      views
      earned
      chart { date balance earned }
      events { created_at type details }
    }
  }
`;

export const JOIN_AFFILIATE_PROGRAM = gql`
  mutation JoinAffiliateProgram($input: AffiliateProfileInput!) {
    joinAffiliateProgram(input: $input) { status }
  }
`;

export const UPDATE_AFFILIATE_PROFILE = gql`
  mutation UpdateAffiliateProfile($input: AffiliateProfileInput!) {
    updateAffiliateProfile(input: $input) { status }
  }
`;

export const REQUEST_AFFILIATE_WITHDRAWAL = gql`
  mutation RequestAffiliateWithdrawal($amount: Float!) {
    requestAffiliateWithdrawal(amount: $amount) { status }
  }
`;
