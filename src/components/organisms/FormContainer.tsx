import React, { PropsWithChildren } from "react";
import AuthQuestion from "../molecules/AuthQuestion";
import GoogleAuth from "../molecules/GoogleAuth";

function FormContainer(props: PropsWithChildren & { type: string }) {
  return (
    <div className="flex flex-col items-center mt-20 sm:border sm:w-2/5">
      <h1 className="mb-12 text-6xl font-vibes sm:hidden">Doggygram</h1>
      <GoogleAuth />
      {props.children}
      <AuthQuestion type={props.type} />
    </div>
  );
}

export default FormContainer;
