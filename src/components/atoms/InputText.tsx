import React from "react";
import { Field } from "formik";
import { PropsWithChildren } from "react";

interface InputText {
  name: string;
  placeholder: string;
  error: boolean;
  password?: boolean;
}

function InputText(props: PropsWithChildren & InputText) {
  const { name, children, placeholder, error, password } = props;
  return (
    <div className="flex relative w-fit h-fit items-center text-md">
      <div className="left-2 absolute w-fit h-fit text-gray-400">
        {children}
      </div>
      <Field
        className={`w-full border border-gray-200 p-2 my-2 rounded-sm ${
          error ? "border-red" : null
        } focus:outline-gray-300 pl-8`}
        name={name}
        placeholder={placeholder}
        type={password ? "password" : "text"}
      />
    </div>
  );
}

export default InputText;
