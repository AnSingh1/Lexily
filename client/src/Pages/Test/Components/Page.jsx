import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Question from "./Question";
import Loading from "../../../Components/Loading";
import Progress from "./Progress";

export default function Page() {
  const containerRef = useRef();

  const [theme, setTheme] = useState();
  const [numTests, setNumTests] = useState();
  const [numSectionsCompleted, setNumSectionsCompleted] = useState(0);
  const [difficulty, setDifficulty] = useState();
  const [startingDifficulty, setStartingDifficulty] = useState();
  const [numCorrect, setNumCorrect] = useState(0);
  const [totalNumCorrect, setTotalNumCorrect] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [sectionData, setSectionData] = useState();
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

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

    const theme = new URLSearchParams(location.search).get("type"); // VALIDATE IN BACKEND
    setTheme(theme);

    generateSection(difficulty, numTests, theme).then((data) =>
      setSectionData(data),
    );
  }, []);

  useEffect(
    (_) => {
      if (!sectionData) return;

      setLoading(false);
    },
    [sectionData],
  );

  return (
    <div
      ref={containerRef}
      className="relative mb-80 mt-12 flex w-[8.5in] flex-col gap-12 rounded border-gray-border/[.16] bg-white px-[9vw] py-24 dark:border-dark-gray-border/[.16] dark:bg-transparent sm:border-[1px] sm:dark:bg-dark-card/25"
    >
      {finished && (
        <div className="fixed left-0 top-0 z-[999] flex h-full w-full flex-col items-center justify-center gap-6 bg-black/30 backdrop-blur-sm">
          <div className="flex animate-slide-down flex-col gap-12 rounded-xl bg-white p-12 shadow-xl dark:bg-dark-card sm:flex-row">
            <div>
              <h1 className="font-poppins text-2xl text-test-dark dark:text-dark-test-dark">
                Test complete! 🎉
              </h1>
              <span className="font-open text-test-lgt dark:text-dark-test-lgt">
                You are now level {difficulty}.
              </span>
            </div>
            <p className="font-open flex items-center gap-6 text-test-lgt dark:text-dark-test-lgt">
              <div
                className="grid h-20 w-20 place-items-center rounded-full text-white dark:text-dark-card"
                style={{
                  background: `radial-gradient(closest-side, currentColor 77%, transparent 80% 100%), conic-gradient(#3EB489 ${
                    (totalNumCorrect / 16) * 100
                  }%, rgba(0, 0, 0, .25) 0)`,
                }}
              >
                <span className="font-roboto text-sm text-test-lgt dark:text-dark-test-lgt">
                  {totalNumCorrect}/16
                </span>
              </div>
              <span className="font-poppins text-3xl">
                {startingDifficulty} →{" "}
                <span className="text-brand">{difficulty}</span>
              </span>
            </p>
          </div>
          <button
            onClick={(_) => navigate("/")}
            className="animate-slide-down rounded-lg bg-brand px-12 py-4 font-poppins text-white"
          >
            Back to dashboard
          </button>
        </div>
      )}
      <Progress completed={numSectionsCompleted} />
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

                  if (choice == parseInt(question.answer)) {
                    setNumCorrect((p) => p + 1);
                    setTotalNumCorrect((p) => p + 1);
                  }

                  if (i !== sectionData.questions.length - 1)
                    setActiveQuestion((p) => p + 1);
                  else if (numSectionsCompleted + 1 === 3) {
                    setLoading(true);

                    await new Promise((resolve) => setTimeout(resolve, 2000));

                    setNumSectionsCompleted((p) => p + 1);
                    setFinished(true);
                  } else {
                    setLoading(true);

                    const newNumTests = numTests + 1;
                    setNumTests(newNumTests);

                    const difficultyChange = ["-2", "-2", "-1", "1", "2"][
                      numCorrect
                    ];

                    await generateSection(
                      clamp(0, difficulty + parseInt(difficultyChange), 10),
                      newNumTests,
                      theme,
                    ).then((data) => {
                      setSectionData(data);
                      setNumCorrect(0);
                      setActiveQuestion(0);
                      setDifficulty(data.difficulty);

                      window.localStorage.setItem(
                        "difficulty",
                        data.difficulty,
                      );
                      window.localStorage.setItem("numTests", newNumTests);

                      setLoading(false);

                      setNumSectionsCompleted((p) => p + 1);

                      containerRef.current.parentNode.parentNode.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      // generateNextSections();
                    });
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
