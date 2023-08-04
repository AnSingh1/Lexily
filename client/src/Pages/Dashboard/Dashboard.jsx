import React from "react";

import { useNavigate } from "react-router-dom";

import { ChevronRight } from "@mui/icons-material";

const testTypes = ["History", "Science", "Fiction", "Fantasy", "Arts"];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-12 p-12">
      <h1 className="text-center font-poppins text-2xl text-test-dark">
        My Dashboard
      </h1>
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-center">
        <div className="h-max max-w-lg rounded-xl px-12 py-8 text-center shadow-xl">
          <h2 className="font-poppins text-lg text-test-dark">Reading Level</h2>
          <h3 className="mt-6 font-roboto text-3xl text-test-lgt">
            <span className="text-brand">8</span>/10
          </h3>
        </div>
        <div className="w-full max-w-lg rounded-xl px-12 py-8 shadow-xl">
          <h2 className="font-poppins text-lg text-test-dark">Take a Test</h2>
          <ul className="mt-6 grid flex-grow grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
            {testTypes.map((type, i) => {
              return (
                <li
                  onClick={(_) => navigate(`/test?type=${type.toLowerCase()}`)}
                  className="border-gray-border-[.08] flex cursor-pointer justify-between rounded-lg border-[1px] p-4 text-test-lgt hover:border-brand hover:text-brand"
                  key={i}
                >
                  <h3 className="font-open text-base">{type}</h3>
                  <ChevronRight />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
