/**
 * Magento / Apollo errors → text a customer can act on. Transport details (HTTP status, "Response not
 * successful", network errors) must never reach the UI.
 */

interface ApolloLike {
  message?: string;
  graphQLErrors?: Array<{ message?: string } | null> | null;
  networkError?: { statusCode?: number; message?: string } | null;
}

const asApollo = (error: unknown) => (error && typeof error === "object" ? (error as ApolloLike) : null);

/** Messages Magento sent in the GraphQL body (business errors), not the HTTP layer. */
export function graphqlMessages(error: unknown): string[] {
  return (asApollo(error)?.graphQLErrors ?? []).flatMap((g) => (g?.message ? [g.message] : []));
}

export function httpStatus(error: unknown): number | undefined {
  return asApollo(error)?.networkError?.statusCode;
}

const isTransportOnly = (error: unknown, messages: string[]): boolean => {
  if (messages.length) return false;
  const status = httpStatus(error);
  if (status && status >= 400) return true;
  return /Response not successful|Received status code|Network error|fetch failed|ECONNREFUSED|ETIMEDOUT/i.test(
    asApollo(error)?.message ?? "",
  );
};

/** Wrong email/password, disabled account, or a rejected token. */
export function signInErrorMessage(error: unknown): string {
  const text = graphqlMessages(error).join(" ").toLowerCase();
  const status = httpStatus(error);
  if (
    status === 401 ||
    status === 403 ||
    /sign-in was incorrect|account is disabled|invalid login|not authorized|unauthorized|access denied/.test(text)
  ) {
    return "Invalid email or password.";
  }
  return "Unable to sign in right now. Please try again.";
}

/** Account creation errors: keep Magento's actionable validation, hide transport noise. */
export function registerErrorMessage(error: unknown): string {
  const messages = graphqlMessages(error);
  const text = messages.join(" ").toLowerCase();
  if (/already exists|already registered|already been taken|is already/.test(text)) {
    return "An account with this email already exists. Please sign in instead.";
  }
  if (/captcha|recaptcha/.test(text)) {
    return "We couldn't verify your request. Please refresh the page and try again.";
  }
  if (/password/.test(text) && /(minimum|at least|must)/.test(text)) {
    return messages[0];
  }
  if (/email/.test(text) && /(valid|invalid)/.test(text)) {
    return "Enter a valid email address.";
  }
  if (messages.length && !isTransportOnly(error, messages)) {
    return messages[0];
  }
  return "We couldn't create your account right now. Please try again.";
}
