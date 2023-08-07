import React, { useRef, useState, useEffect } from "react";

import Question from "./Question";
import Loading from "../../../Components/Loading";
import Progress from "./Progress";
import Finish from "./Finish";

export default function Page() {
  const containerRef = useRef();
  const numCorrect = useRef(0);

  const [numTests, setNumTests] = useState();
  const [difficulty, setDifficulty] = useState();
  const [startingDifficulty, setStartingDifficulty] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [sectionData, setSectionData] = useState();
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
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

  useEffect((_) => {
    const difficulty = parseInt(window.localStorage.getItem("difficulty")) || 5;
    const numTests = parseInt(window.localStorage.getItem("numTests")) || 0;

    setDifficulty(difficulty);
    setStartingDifficulty(difficulty);
    setNumTests(numTests);
    numCorrect.current = 0;

    const theme = new URLSearchParams(location.search).get("type"); // VALIDATE IN BACKEND

    generateSection(difficulty, numTests, theme).then((data) =>
      setSectionData(data),
    );
  }, []);

  useEffect(
    (_) => {
      if (!sectionData) return;

      numCorrect.current = 0;
      setLoading(false);
    },
    [sectionData],
  );

  return (
    <div
      ref={containerRef}
      className="relative mb-96 mt-12 flex w-[8.5in] flex-col gap-12 rounded border-gray-border/[.16] bg-white px-[9vw] dark:border-dark-gray-border/[.16] dark:bg-transparent sm:border-[1px] sm:py-24 sm:dark:bg-dark-card/25"
    >
      {finished && (
        <Finish
          numCorrect={numCorrect.current}
          endingDifficulty={difficulty}
          startingDifficulty={startingDifficulty}
        />
      )}
      <Progress completed={activeQuestion} />
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
                id={i}
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

                  if (choice == parseInt(question.answer)) numCorrect.current++;

                  if (i !== sectionData.questions.length - 1)
                    setActiveQuestion((p) => p + 1);
                  else {
                    setLoading(true);

                    const newNumTests = numTests + 1;

                    setNumTests(newNumTests);
                    window.localStorage.setItem("numTests", newNumTests);

                    const difficultyChange = ["-2", "-2", "-1", "1", "2"][
                      numCorrect.current
                    ];

                    const newDifficulty = clamp(
                      0,
                      startingDifficulty + parseInt(difficultyChange),
                      10,
                    );

                    setDifficulty(newDifficulty);
                    window.localStorage.setItem("difficulty", newDifficulty);

                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    setActiveQuestion((p) => p + 1);
                    setFinished(true);
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
