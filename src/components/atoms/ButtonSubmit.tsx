import React from "react";
import { PropsWithChildren } from "react";

interface ButtonSubmit {
  text: string;
  color: string;
}

function ButtonSubmit(props: PropsWithChildren<ButtonSubmit>) {
  const { children, text, color } = props;
  return (
    <button
      className={`${color} flex items-center justify-center w-full py-2 mt-2 text-white rounded-md`}
    >
      {children}
      {text}
    </button>
  );
}

export default ButtonSubmit;
