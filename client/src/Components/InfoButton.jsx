import React from "react";

import { Tooltip } from "react-tooltip";
import { Info } from "@mui/icons-material";

export default function InfoButton({ text, id }) {
  return (
    <>
      <Info
        data-tooltip-id={id}
        data-tooltip-content={text}
        data-tooltip-place="top"
        className="cursor-pointer text-test-dark/75 hover:text-test-dark dark:text-dark-test-dark/75 dark:hover:text-dark-test-dark"
      />
      <Tooltip id={id} />
    </>
  );
}
