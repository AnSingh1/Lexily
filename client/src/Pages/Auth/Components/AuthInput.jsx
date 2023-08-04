import React, { forwardRef } from "react";

export default forwardRef(function AuthInput(props, ref) {
  return (
    <input
      ref={ref}
      type={props.type || "text"}
      placeholder={props.placeholder || ""}
      required={props.required !== undefined ? props.required : true}
      className="rounded-md border-[1px] border-gray-border/[.16] px-6 py-3 font-roboto text-base text-test-lgt focus-visible:border-2 focus-visible:placeholder:text-test-lgt/50"
    />
  );
});
