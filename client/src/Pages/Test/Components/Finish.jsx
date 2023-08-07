import React from "react";
import { useNavigate } from "react-router-dom";

import Confetti from "react-confetti";

export default function Finish({
  numCorrect,
  startingDifficulty,
  endingDifficulty: difficulty,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed left-0 top-0 z-[999] flex h-full w-full flex-col items-center justify-center gap-6 bg-black/30 backdrop-blur-sm">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={150}
        />
        <div className="flex animate-slide-down flex-col gap-12 rounded-xl bg-white p-12 shadow-xl dark:bg-dark-card sm:flex-row">
          <div>
            <h1 className="font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
              Test complete! 🎉
            </h1>
            <span className="font-open text-test-lgt dark:text-dark-test-lgt">
              You are now level {difficulty}.
            </span>
          </div>
          <div className="font-open flex items-center gap-6 text-test-lgt dark:text-dark-test-lgt">
            <div
              className="grid h-20 w-20 place-items-center rounded-full text-white dark:text-dark-card"
              style={{
                background: `radial-gradient(closest-side, currentColor 77%, transparent 80% 100%), conic-gradient(#3EB489 ${
                  (numCorrect / 4) * 100
                }%, rgba(0, 0, 0, .25) 0)`,
              }}
            >
              <span className="font-roboto text-sm text-test-lgt dark:text-dark-test-lgt">
                {numCorrect}/4
              </span>
            </div>
            <span className="font-poppins text-3xl">
              {startingDifficulty} →{" "}
              <span className="text-brand">{difficulty}</span>
            </span>
          </div>
        </div>
        <div className="flex animate-slide-down gap-6">
          <button
            onClick={(_) => navigate("/")}
            className="rounded-lg border-[1px] border-gray-border/[.16] px-12 py-4 font-poppins text-gray-border/[.16] hover:border-gray-border/[.32] hover:text-gray-border/[.32] dark:border-dark-gray-border/[.16] dark:text-dark-gray-border/[.16] dark:hover:border-dark-gray-border/[.32] dark:hover:text-dark-gray-border/[.32]"
          >
            Back
          </button>
          <button
            onClick={(_) => navigate(0)}
            className="rounded-lg bg-brand px-12 py-4 font-poppins text-white"
          >
            Next Test
          </button>
        </div>
      </div>
    </div>
  );
}
