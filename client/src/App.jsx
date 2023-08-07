import "react-tooltip/dist/react-tooltip.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./Pages/Test/Components/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import About from "./Pages/About/About";
// import Signup from "./Pages/Auth/Signup";
// import Login from "./Pages/Auth/Login";
import Test from "./Pages/Test/Test";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col overflow-y-hidden dark:bg-dark-bg">
        {!window.localStorage.getItem("visited") && (
          <div className="fixed left-0 top-0 z-[999] flex h-full w-full flex-col items-center justify-center gap-6 bg-black/60 px-8 text-center backdrop-blur-sm">
            <h1 className="font-poppins text-4xl text-white">
              Welcome to Lexily! 👋
            </h1>
            <p className="max-w-lg font-sans text-lg text-white/75">
              Evaluate your reading level with passages on topics you're
              interested in. Get started by selecting your first theme or
              entering a custom theme under <i>take a test</i>. Enjoy!
            </p>
            <button
              onClick={(_) => {
                window.localStorage.setItem("visited", "true");
                location.reload();
              }}
              className="mt-6 rounded-lg bg-brand px-12 py-4 font-poppins text-white transition-transform hover:scale-105"
            >
              Onwards!
            </button>
          </div>
        )}
        <Header />
        <div className="h-[calc(100vh-67px)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route
              path="*"
              element={
                <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                  <h1 className="font-mono text-9xl text-test-dark dark:text-dark-test-dark">
                    404
                  </h1>
                  <Link
                    to="/"
                    className="font-roboto text-test-lgt underline dark:text-dark-test-lgt"
                  >
                    Return to dashboard
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
