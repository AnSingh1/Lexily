import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Pages/Test/Components/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Test from "./Pages/Test/Test";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
