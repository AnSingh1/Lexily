import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  AccountCircle,
  Brightness4 as DarkMode,
  Brightness5 as LightMode,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Header() {
  const [darkModeEnabled, setDarkModeEnabled] = useState();

  const navigate = useNavigate();

  useEffect(
    (_) => {
      if (darkModeEnabled === undefined)
        setDarkModeEnabled(window.localStorage.getItem("dark") || false);

      if (darkModeEnabled === "true")
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      window.localStorage.setItem("dark", darkModeEnabled);
    },
    [darkModeEnabled],
  );

  return (
    <header className="sticky top-0 z-50 flex w-full justify-between gap-6 border-b-[1px] border-b-gray-border/[.18] bg-white px-6 py-4 shadow-sm dark:border-b-dark-gray-border/[.16] dark:bg-dark-bg sm:border-none">
      <img
        onClick={(_) => navigate("/")}
        className="cursor-pointer"
        src="/logo-small.svg"
        alt="Logo"
      />
      <div className="flex items-center gap-4">
        <IconButton
          id="DARKMODE"
          onClick={(_) =>
            setDarkModeEnabled((p) => (p === "true" ? "false" : "true"))
          }
        >
          {darkModeEnabled === "true" && (
            <LightMode className="cursor-pointer text-test-lgt/50 dark:text-dark-test-lgt/50" />
          )}
          {darkModeEnabled === "false" && (
            <DarkMode className="cursor-pointer text-test-lgt/50 dark:text-dark-test-lgt/50" />
          )}
        </IconButton>
        {/* <AccountCircle className="cursor-pointer text-brand" fontSize="large" /> */}
      </div>
    </header>
  );
}
