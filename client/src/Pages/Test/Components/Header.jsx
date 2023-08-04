import React from "react";

import { useNavigate } from "react-router-dom";

import { Settings, AccountCircle } from "@mui/icons-material";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex w-full justify-between gap-6 border-b-[1px] border-b-gray-border/[.18] bg-white px-6 py-4 sm:border-none">
      <img
        onClick={(_) => navigate("/")}
        className="cursor-pointer"
        src="/logo-small.svg"
        alt="Logo"
      />
      <div className="flex items-center gap-4">
        <Settings className="cursor-pointer text-test-lgt/50 hover:text-test-lgt/75" />
        <AccountCircle
          className="cursor-pointer text-test-lgt/75 hover:text-test-lgt"
          fontSize="large"
        />
      </div>
    </header>
  );
}
