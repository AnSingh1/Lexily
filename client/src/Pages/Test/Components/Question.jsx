import React, { useState, useEffect } from "react";

import Loading from "../../../Components/Loading";

export default function Question({ data, onSubmit, id }) {
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);

  const clickHandler = async (_) => {
    if (selectedOption == undefined || loading) return;

    setLoading(true);
    await onSubmit(selectedOption);
    setLoading(false);
  };

  useEffect((_) => {
    [...document.querySelectorAll(".multipleChoiceOption")].forEach((e) => {
      if (e.checked) e.checked = false;
    });
  }, []);

  return (
    <div
      className={`${
        (!data.active && "hidden") || "z-50"
      } absolute bottom-0 left-1/2 flex w-[85%] -translate-x-1/2 translate-y-[85%] flex-col gap-6 rounded-2xl border-[1px] border-gray-border/[.08] bg-white px-12 py-6 font-poppins shadow-lg dark:bg-dark-card`}
    >
      <h3 className="text-center text-lg text-test-dark dark:text-dark-test-dark sm:text-left">
        {data.question}
      </h3>
      <ul className="flex flex-col items-start text-base text-test-lgt dark:text-dark-test-lgt">
        {data.options.map((o, i) => {
          return (
            <li className="multipleChoiceOption" key={i}>
              <input
                type="radio"
                id={`option-${id}-${i}`}
                name="answerChoice"
                className="mr-3 cursor-pointer"
                onClick={(_) => setSelectedOption(i)}
              />
              <label htmlFor={`option-${id}-${i}`} className="cursor-pointer">
                {o}
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span className="text-test-lgt/50 dark:text-dark-test-lgt/50">
          Question {data.questionNumber} of {data.totalQuestions}
        </span>
        <button
          onClick={clickHandler}
          className={`rounded-full px-6 py-3 text-white ${
            selectedOption !== undefined
              ? "bg-brand"
              : "cursor-default bg-brand/50"
          }`}
        >
          {data.type
            .substring(0, 1)
            .toUpperCase()
            .concat(data.type.substring(1))}
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
}
