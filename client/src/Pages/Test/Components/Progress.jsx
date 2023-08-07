import React from "react";

import { SportsScore } from "@mui/icons-material";

export default function Progress({ completed }) {
  return (
    <div className="fixed bottom-8 left-1/2 z-[999] flex h-max w-max -translate-x-1/2 flex-row items-center lg:bottom-1/2 lg:left-auto lg:right-8 lg:translate-x-0 lg:translate-y-1/2 lg:flex-col">
      {[...Array(4)].map((_, i) => {
        return (
          <>
            <div
              key={i}
              className={`grid h-10 w-10 place-items-center rounded-full border-2 after:rounded-full after:bg-brand ${
                i === completed
                  ? "border-brand/50 after:h-5 after:w-5"
                  : i < completed
                  ? "border-brand/50 bg-brand"
                  : "border-gray-border/[.16] dark:border-dark-gray-border/[.16]"
              }`}
            ></div>
            <div
              className={`${
                i < completed
                  ? "bg-brand/50"
                  : "bg-gray-border/[.08] dark:bg-dark-gray-border/[.08]"
              } h-1 w-3 sm:h-3 sm:w-1`}
            ></div>
          </>
        );
      })}
      <div
        className={`${
          completed === 4
            ? "border-brand"
            : "border-gray-border/[.16] dark:border-dark-gray-border/[.16]"
        } grid h-10 w-10 place-items-center rounded-full border-2`}
      >
        <SportsScore
          className={
            completed === 4
              ? "text-brand"
              : "text-gray-border/[.16] dark:text-dark-gray-border/[.16]"
          }
        />
      </div>
    </div>
  );
}
