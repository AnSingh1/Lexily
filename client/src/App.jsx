import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./Pages/Test/Components/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Test from "./Pages/Test/Test";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col dark:bg-dark-bg">
        <Header />
        <div className="h-[calc(100vh-67px)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="*"
              element={
                <div className="flex w-full flex-grow flex-col items-center justify-center gap-6">
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
