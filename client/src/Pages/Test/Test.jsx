import React from "react";

import Header from "./Components/Header";
import Page from "./Components/Page";

export default function Test() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex w-full justify-center">
        <Page />
      </div>
    </div>
  );
}
