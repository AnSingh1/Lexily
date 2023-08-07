import React from "react";

import Header from "./Components/Header";
import Page from "./Components/Page";

export default function Test() {
  return (
    <div className="flex w-full flex-grow flex-col">
      <div className="flex justify-center overflow-y-hidden pb-12">
        <Page />
      </div>
    </div>
  );
}
