"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center bg-brand-surface rounded-lg my-6">
          <div className="mb-4 text-5xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-brand-dark">
            Something went wrong
          </h2>
          <p className="mb-6 text-brand-muted max-w-md">
            We are sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-brand-coral px-5 py-2.5 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Refresh Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="rounded-lg border border-card-border px-5 py-2.5 text-brand-dark hover:bg-white transition-colors"
            >
              Try Again
            </button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 w-full max-w-2xl text-left">
              <summary className="cursor-pointer text-sm text-brand-muted">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 overflow-auto rounded bg-white p-4 text-xs text-brand-alert border border-card-border">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export function ProductErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-card-border p-6 text-center bg-brand-surface">
          <div>
            <div className="mb-2 text-3xl">📦</div>
            <p className="text-sm text-brand-muted">
              Product catalog temporarily unavailable
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function SectionErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-card-border p-6 text-center bg-brand-surface my-4">
          <p className="text-sm text-brand-muted">
            This section is temporarily unavailable.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
