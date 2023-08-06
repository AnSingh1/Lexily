import React, { useRef, useState, useEffect } from "react";

import Question from "./Question";
import Loading from "../../../Components/Loading";

import EventEmitter from "eventemitter3";

const emitter = new EventEmitter();

export default function Page() {
  const containerRef = useRef();

  const [difficulty, setDifficulty] = useState(5); // Fetch from backend
  const [numCorrect, setNumCorrect] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [sectionData, setSectionData] = useState();
  const [nextSectionData, setNextSectionData] = useState();
  const [loading, setLoading] = useState(true);
  const [nextSectionLoading, setNextSectionLoading] = useState(true);
  const [error, setError] = useState();

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const generateSection = async (difficulty, numTests, theme) => {
    const formData = new FormData();
    formData.append("difficulty", difficulty);
    formData.append("numTests", numTests);
    formData.append("theme", theme);

    const response = await fetch("/generate", {
      method: "POST",
      body: formData,
    }).catch((e) => setError(e.message));

    const data = await response.json();

    return data;
  };

  const generateNextSections = async (numTests, theme) => {
    const startTime = Date.now();
    setNextSectionLoading(true);

    // const d = [-3, -1, 0, 1, 3].reduce(async (a, c) => {
    //   const data = await generateSection(
    //     clamp(0, difficulty + c, 10),
    //     numTests,
    //     theme,
    //   );

    //   return {
    //     ...a,
    //     [c]: await data,
    //   };
    // }, {});

    const diffs = [-3, -1, 0, 1, 3];
    const data = {};

    for (let i = 0; i < diffs.length; i++)
      data[diffs[i]] = await generateSection(
        clamp(0, difficulty + diffs[i], 10),
        numTests,
        theme,
      );

    console.log(
      `Finished generating next diffs in ${(Date.now() - startTime) / 1000}s.`,
    );

    setNextSectionData(data);
  };

  useEffect((_) => {
    const numTests = 0;
    const theme = new URLSearchParams(location.search).get("type"); // VALIDATE IN BACKEND

    generateSection(difficulty, numTests, theme).then((data) => {
      setSectionData(data);

      generateNextSections(numTests, /*data.title*/ theme);
    });
  }, []);

  useEffect(
    (_) => {
      if (!sectionData) return;

      setLoading(false);
    },
    [sectionData],
  );

  useEffect(
    (_) => {
      if (!nextSectionData) return;

      console.log(nextSectionData);

      setNextSectionLoading(false);
      emitter.emit("loaded");
    },
    [nextSectionData],
  );

  useEffect(
    (_) => {
      console.log(nextSectionData);
    },
    [nextSectionLoading],
  );

  return (
    <div
      ref={containerRef}
      className="relative mb-80 mt-12 flex w-[8.5in] flex-col gap-12 rounded border-gray-border/[.16] bg-white px-[9vw] py-24 dark:border-dark-gray-border/[.16] dark:bg-dark-card/25 sm:border-[1px]"
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="text-center font-poppins">
            <h1 className="text-3xl text-test-dark dark:text-dark-test-dark">
              {sectionData.title}
            </h1>
            <h2 className="text-lg uppercase text-test-lgt dark:text-dark-test-lgt">
              {sectionData.subtitle}
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
            {sectionData.passage
              .replaceAll("\n\n", "\n")
              .slice(
                sectionData.passage.startsWith("\n") ? 1 : 0,
                sectionData.passage.endsWith("\n")
                  ? -1
                  : sectionData.passage.length,
              )
              .split("\n")
              .map((p, i) => {
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
          {sectionData.questions.map((question, i) => {
            return (
              <Question
                key={i}
                data={{
                  question: question.question,
                  questionNumber: i + 1,
                  totalQuestions: sectionData.questions.length,
                  options: question.options,
                  active: activeQuestion == i,
                  type:
                    i == sectionData.questions.length - 1 ? "submit" : "next",
                }}
                onSubmit={async (choice) => {
                  // Secure validation in the future

                  if (choice == parseInt(question.answer))
                    setNumCorrect((p) => p + 1);

                  if (i !== sectionData.questions.length - 1)
                    setActiveQuestion((p) => p + 1);
                  else {
                    if (nextSectionLoading)
                      await new Promise((resolve) =>
                        emitter.once("loaded", resolve),
                      );
                    else
                      await new Promise((resolve) => setTimeout(resolve, 1000));

                    setLoading(true);

                    const difficultyChange = ["-3", "-1", "0", "1", "3"][
                      numCorrect
                    ];

                    console.log(nextSectionData, difficultyChange);
                    setSectionData(nextSectionData[difficultyChange]);
                    setActiveQuestion(0);
                    setDifficulty(nextSectionData[difficultyChange].difficulty);

                    containerRef.current.parentNode.parentNode.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                    setLoading(false);

                    generateNextSections();
                  }
                }}
              />
            );
          })}
        </>
      )}
      {error && <span className="font-roboto text-red-500">{error}</span>}
    </div>
  );
}
