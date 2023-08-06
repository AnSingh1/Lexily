import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ChevronRight } from "@mui/icons-material";

import tests from "../../Utils/tests";

import InfoButton from "../../Components/InfoButton";

export default function Dashboard() {
  const [customType, setCustomType] = useState();

  const navigate = useNavigate();

  const numTests = window.localStorage.getItem("numTests") || 0;

  const resetLevel = (_) => {
    window.localStorage.setItem("difficulty", 5);
    window.localStorage.setItem("numTests", 0);

    navigate(0);
  };

  return (
    <div className="flex w-full flex-col gap-12 p-12">
      <h1 className="text-center font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
        My Dashboard
      </h1>
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-center">
        <div className="flex flex-col gap-6">
          <div className="h-max max-w-lg rounded-xl bg-white px-12 py-8 text-center shadow-xl dark:bg-dark-card">
            <h2 className="flex gap-3 font-poppins text-lg text-test-dark dark:text-dark-test-dark">
              Reading Level
              <InfoButton
                text={`Your reading level, calculated from ${numTests} test${
                  numTests !== "1" ? "s" : ""
                }.`}
                id="level"
              />
            </h2>
            <h3 className="mt-6 font-roboto text-3xl text-test-lgt dark:text-dark-test-lgt">
              <span className="text-brand">
                {window.localStorage.getItem("difficulty") || 5}
              </span>
              /10
            </h3>
          </div>
          <button
            onClick={resetLevel}
            className="w-full rounded-xl border-[1px] border-red-500 bg-white px-12 py-2 text-center font-poppins text-red-500 hover:bg-test-lgt/5 dark:bg-dark-bg dark:hover:bg-dark-card"
          >
            Reset Level
          </button>
        </div>
        <div className="w-full max-w-lg rounded-xl bg-white px-12 py-8 shadow-xl dark:bg-dark-card">
          <h2 className="flex gap-3 font-poppins text-lg text-test-dark dark:text-dark-test-dark">
            Take a Test
            <InfoButton
              text="Generate a reading test from a theme."
              id="prompt"
            />
          </h2>
          <ul className="mt-6 grid flex-grow grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
            {tests.map((test, i) => {
              return (
                <li
                  onClick={(_) =>
                    navigate(`/test?type=${test.type.toLowerCase()}`)
                  }
                  className="border-gray-border-[.08] flex cursor-pointer justify-between rounded-lg border-[1px] bg-no-repeat p-4 text-test-lgt hover:border-brand hover:text-brand dark:border-dark-gray-border dark:text-dark-test-lgt dark:hover:border-brand dark:hover:text-brand"
                  key={i}
                >
                  <h3 className="font-open text-base">{test.type}</h3>
                  <ChevronRight />
                </li>
              );
            })}
            <li
              className={`${
                customType ? "cursor-pointer" : "border-dashed opacity-50"
              } border-gray-border-[.08] flex justify-between rounded-lg border-[1px] bg-no-repeat p-4 text-test-lgt dark:border-dark-gray-border dark:text-dark-test-lgt`}
              onClick={(_) => {
                if (customType)
                  navigate(
                    `/test?type=${customType
                      .replaceAll(" ", "%20")
                      .toLowerCase()}`,
                  );
              }}
            >
              <input
                type="text"
                placeholder="Custom"
                className="font-open w-16 bg-transparent text-base focus-visible:outline-none"
                onInput={(e) => setCustomType(e.target.value)}
              />
              <ChevronRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Change to "levels"
