import React from "react";

export default function Loading({ dots = 3 }) {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-3 rounded-2xl bg-white">
      {[...Array(dots)].map((_, i) => {
        return (
          <div
            className="h-4 w-3 animate-bounce rounded-full bg-test-lgt/20"
            style={{ animationDelay: `${i * 100}ms` }}
            key={i}
          ></div>
        );
      })}
    </div>
  );
}