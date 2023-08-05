import React, { useState, useEffect } from "react";

import Question from "./Question";

import data from "../../../Utils/data"; // Temporary until received from backend

export default function Page() {
  const [sectionData, setSectionData] = useState();

  const section = data[1]; // Temp
  const story = section.section.replaceAll("\n\n", "\n").slice(1); // Temp

  useEffect((_) => {
    // fetch backend => user difficulty, numTests, theme
    // setSectionData(response)
  }, []);

  return (
    <div className="relative mb-80 mt-12 flex w-[8.5in] flex-col gap-12 rounded border-gray-border/[.16] bg-white px-[9vw] py-24 dark:border-dark-gray-border/[.16] dark:bg-dark-card/25 sm:border-[1px]">
      <div className="text-center font-poppins">
        <h1 className="text-3xl text-test-dark dark:text-dark-test-dark">
          {data[0].title}
        </h1>
        <h2 className="text-lg uppercase text-test-lgt dark:text-dark-test-lgt">
          {section.subTitle}
        </h2>
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
      <div className="flex flex-col gap-6 font-sans text-base text-test-lgt dark:text-dark-test-lgt">
        {story.split("\n").map((p, i) => {
          return (
            <p key={i}>
              <span className="relative bottom-[.25em] mr-[.75em] rounded-full bg-test-dark px-2 py-[2px] font-roboto text-[10px] font-medium text-white dark:bg-dark-test-dark dark:text-black">
                {i + 1}
              </span>
              {p}
            </p>
          );
        })}
      </div>
      <Question
        data={{
          question: section.question,
          options: section.options,
          questionNumber: 1,
          totalQuestions: section.options.length,
        }}
        onSubmit={async (option) => {
          // Secure validation in the future

          if (option == parseInt(section.correct)) {
            // Correct answer
          } else {
            // Incorrect answer
          }
        }}
      />
    </div>
  );
}
