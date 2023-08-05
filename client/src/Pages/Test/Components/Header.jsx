import React, { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  Settings,
  AccountCircle,
  Brightness4 as DarkMode,
  Brightness5 as LightMode,
} from "@mui/icons-material";

export default function Header() {
  const settingsRef = useRef();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const navigate = useNavigate();

  useEffect((_) => {
    const clickHandler = (e) => {
      const targetExists = getComputedStyle(e.target).display !== "";

      if (
        settingsRef.current &&
        targetExists &&
        !settingsRef.current.contains(e.target)
      ) {
        setSettingsOpen(false);
      }
    };

    window.addEventListener("click", clickHandler);

    return (_) => window.removeEventListener("click", clickHandler);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full justify-between gap-6 border-b-[1px] border-b-gray-border/[.18] bg-white px-6 py-4 shadow-sm dark:border-b-dark-gray-border/[.16] dark:bg-dark-bg sm:border-none">
      <img
        onClick={(_) => navigate("/")}
        className="cursor-pointer"
        src="/logo-small.svg"
        alt="Logo"
      />
      <div className="flex items-center gap-4">
        <Settings
          onClick={(_) => setSettingsOpen((p) => !p)}
          className={`${
            settingsOpen ? "rotate-90" : "rotate-0"
          } cursor-pointer text-test-lgt/50 hover:text-test-lgt/75 dark:text-dark-test-lgt/50 dark:hover:text-dark-test-lgt/75`}
          style={{
            transition: "transform 100ms ease",
          }}
        />
        <div
          ref={settingsRef}
          className={`${
            settingsOpen ? "scale-1" : "scale-0"
          } absolute top-3/4 -translate-x-1/2 rounded-md border-[1px] border-gray-border/[.08] bg-white p-4 shadow-lg`}
        >
          {darkModeEnabled ? <LightMode /> : <DarkMode />}
        </div>
        <AccountCircle className="cursor-pointer text-brand" fontSize="large" />
      </div>
    </header>
  );
}
