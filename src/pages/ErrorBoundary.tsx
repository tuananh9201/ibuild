"use client";
import React, { ErrorInfo, ReactElement, ReactNode, useState } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const resetErrorBoundary = () => setError(null);

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error(error, errorInfo);
    setError(error);
  };

  if (error) {
    return (
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
