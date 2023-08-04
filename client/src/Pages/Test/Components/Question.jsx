import React from "react";

export default function Question({ data, onSubmit }) {
  return (
    <div className="absolute bottom-0 flex max-w-[706px] -translate-x-[10%] translate-y-[85%] flex-col gap-6 rounded-2xl border-[1px] border-gray-border/[.08] bg-white px-12 py-6 font-poppins shadow-lg">
      <h3 className="text-lg text-test-dark">{data.question}</h3>
      <ul className="text-base text-test-lgt">
        {data.options.map((o, i) => {
          return (
            <li key={i}>
              <input
                type="radio"
                id={`option-${i}`}
                name="answerChoice"
                className="mr-3"
              />
              <label htmlFor={`option-${i}`}>{o}</label>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span className="text-test-lgt/50">
          Question {data.questionNumber} of {data.totalQuestions}
        </span>
        <button
          onClick={onSubmit}
          className="rounded-full bg-brand px-6 py-3 text-white "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
