"use client";

import React, { ReactNode } from "react";
import { useAnimeStore } from "./store-provider";

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const { isAnimeLoading } = useAnimeStore((state) => state);

  if (!isAnimeLoading) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-10 animate-pulse bg-black bg-opacity-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-20 w-20 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
      {children}
    </div>
  );
};

export default LoadingProvider;
