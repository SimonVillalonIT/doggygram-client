import React from "react";
import { PropsWithChildren } from "react";

interface ButtonSubmit {
  text: string;
  color: string;
  disabled: boolean;
}

function ButtonSubmit(props: PropsWithChildren<ButtonSubmit>) {
  const { children, text, color, disabled } = props;
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${color} flex items-center justify-center w-60 py-2 mt-2 text-white rounded-md`}
    >
      {children}
      {text}
    </button>
  );
}

export default ButtonSubmit;
