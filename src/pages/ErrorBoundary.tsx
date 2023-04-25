"use client";

import Error from "next/error";
import React, { ReactElement, useState } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: Error) => {
    setHasError(true);
  };

  return (
    <>
      {hasError ? (
        <h1>loi</h1>
      ) : (
        <>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as ReactElement, {
              onError: handleError,
            });
          })}
        </>
      )}
    </>
  );
}

export default ErrorBoundary;
