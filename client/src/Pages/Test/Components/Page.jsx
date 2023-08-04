import React from "react";

import story from "../../../Utils/story";
import question from "../../../Utils/question";

import Question from "./Question";

export default function Page() {
  return (
    <div className="relative flex w-[8.5in] flex-col gap-12 rounded border-gray-border/[.16] px-[9vw] py-24 sm:border-[1px]">
      <div className="text-center font-poppins">
        <h1 className="text-3xl text-test-dark">The Great Women Meet</h1>
        <h2 className="text-lg uppercase text-test-lgt">Simone Ribke</h2>
      </div>
      <svg
        width="60"
        height="6"
        viewBox="0 0 60 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M0 4.71328H60M0 1.37994H60"
          stroke="#5F6366"
          strokeOpacity="0.25"
        />
      </svg>
      <div className="flex flex-col gap-6 font-sans text-base text-test-lgt">
        {story.split("\n").map((p, i) => {
          return (
            <p key={i}>
              <span className="relative bottom-[.25em] mr-[.75em] rounded-full bg-test-dark px-2 py-[2px] font-roboto text-[10px] font-medium text-white">
                {i + 1}
              </span>
              {p}
            </p>
          );
        })}
      </div>
      <Question
        data={{
          ...question,
          questionNumber: 1,
          totalQuestions: 4,
        }}
        onSubmit={(_) => {
          console.log("submit");
        }}
      />
    </div>
  );
}
