import React from "react";
import Link from "next/link";

function AuthQuestion(props: { type: string }) {
  return (
    <div className="border mt-6 w-full">
      <p className="py-4 text-gray-600 text-center">
        {props.type === "Login"
          ? "Dont have an account? "
          : "Already have an account? "}
        <Link
          href={props.type === "Login" ? "/signUp" : "/"}
          className="text-light-blue"
        >
          {props.type === "Login" ? "Sign up" : "Log In"}
        </Link>
      </p>
    </div>
  );
}

export default AuthQuestion;
