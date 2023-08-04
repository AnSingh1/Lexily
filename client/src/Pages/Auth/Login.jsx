import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthInput from "./Components/AuthInput";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const logIn = (e) => {
    e.preventDefault();

    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center">
      <div>
        <form className="flex flex-col items-center gap-8 rounded-lg p-12 shadow-lg">
          <h2 className="mb-4 font-poppins text-2xl text-test-dark">Log In</h2>
          <AuthInput type="email" placeholder="Email" ref={emailRef} />
          <AuthInput type="password" placeholder="Password" ref={passwordRef} />
          <button
            disabled={loading}
            type="submit"
            onClick={logIn}
            className="ml-auto mt-4 rounded-md bg-brand px-6 py-2 font-poppins text-sm text-white disabled:bg-brand/50"
          >
            Log In
          </button>
        </form>
      </div>
      <span className="mt-4 font-roboto text-sm text-test-dark">
        Need an account? Sign up{" "}
        <Link className="underline" to="/signup">
          here
        </Link>
        .
      </span>
      {error && <span className="font-roboto text-red-500">{error}</span>}
    </div>
  );
}
