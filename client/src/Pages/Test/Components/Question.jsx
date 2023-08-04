import React, { useState } from "react";

export default function Question({ data, onSubmit: clickHandler }) {
  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="absolute bottom-0 left-1/2 flex w-[85%] -translate-x-1/2 translate-y-[85%] flex-col gap-6 rounded-2xl border-[1px] border-gray-border/[.08] bg-white px-12 py-6 font-poppins shadow-lg">
      <h3 className="text-center text-lg text-test-dark sm:text-left">
        {data.question}
      </h3>
      <ul className="flex flex-col items-start text-base text-test-lgt">
        {data.options.map((o, i) => {
          return (
            <li key={i}>
              <input
                type="radio"
                id={`option-${i}`}
                name="answerChoice"
                className="mr-3 cursor-pointer"
                onClick={(_) => setSelectedOption(i)}
              />
              <label htmlFor={`option-${i}`} className="cursor-pointer">
                {o}
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span className="text-test-lgt/50">
          Question {data.questionNumber} of {data.totalQuestions}
        </span>
        <button
          onClick={(_) => clickHandler(selectedOption)}
          className={`rounded-full px-6 py-3 text-white ${
            selectedOption !== undefined
              ? "bg-brand"
              : "cursor-default bg-brand/50"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
