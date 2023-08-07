import React, { useState, useEffect } from "react";

export default function Loading() {
  const [cookies, setCookies] = useState(0);

  useEffect((_) => {
    const interval = setInterval((_) => {
      setCookies((p) => p + 1);
    }, 10000);

    return (_) => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-[min(100%,82vw)] flex-col items-center justify-center gap-12 rounded text-test-lgt/20 dark:text-dark-test-lgt/20">
      {cookies > 0 && (
        <span
          style={{ translate: "0 100%" }}
          className="absolute -bottom-[5em] flex max-w-[82vw] animate-slide-down flex-col font-poppins text-sm text-test-lgt/25 dark:text-dark-test-lgt/25 sm:-bottom-[2em]"
        >
          Loading is taking longer than expected... here's a cookie for now 🍪
          {[...Array(cookies - 1)].map((_, i) => {
            return (
              <span key={i} className="animate-slide-down">
                ... and another 🍪
              </span>
            );
          })}
        </span>
      )}
      {/* <div className="absolute bottom-0 left-1/2 z-50 flex w-[85%] -translate-x-1/2 translate-y-[125%] flex-col gap-6 rounded-2xl border-[1px] border-gray-border/[.08] bg-white px-12 py-6 font-poppins shadow-lg dark:bg-dark-card sm:translate-y-[50%]">
        <h3 className="h-6 w-4/5 max-w-md rounded-full bg-current"></h3>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-3">
            <span className="h-4 w-4 rounded-full bg-current"></span>
            <span className="h-4 w-2/5 max-w-sm rounded-full bg-current"></span>
          </li>
          <li className="flex gap-3">
            <span className="h-4 w-4 rounded-full bg-current"></span>
            <span className="h-4 w-2/5 max-w-sm rounded-full bg-current"></span>
          </li>
          <li className="flex gap-3">
            <span className="h-4 w-4 rounded-full bg-current"></span>
            <span className="h-4 w-2/5 max-w-sm rounded-full bg-current"></span>
          </li>
          <li className="flex gap-3">
            <span className="h-4 w-4 rounded-full bg-current"></span>
            <span className="h-4 w-2/5 max-w-sm rounded-full bg-current"></span>
          </li>
        </ul>
      </div> */}
      <div className="w-full animate-pulse">
        <h1 className="mx-auto h-6 w-4/5 max-w-sm rounded-full bg-current"></h1>
        <h2 className="mx-auto mt-3 h-5 w-3/5 max-w-xs rounded-full bg-current"></h2>
      </div>
      <div className="flex w-full animate-pulse flex-col gap-6">
        {[...Array(2)].map((_, i) => {
          return (
            <p key={i} className="flex flex-col gap-3">
              <span className="flex gap-2">
                <span className="h-4 w-6 rounded-full bg-current"></span>
                <span className="h-4 flex-grow rounded-full bg-current"></span>
              </span>
              <span className="h-4 flex-grow rounded-full bg-current"></span>
              <span className="h-4 flex-grow rounded-full bg-current"></span>
              <span className="h-4 flex-grow rounded-full bg-current"></span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
