import React from "react";
interface InputText {
  name: string;
  value: string | undefined;
  onChange: Function;
  placeholder: string;
}

function InputText(props: InputText) {
  const { name, value, onChange, placeholder } = props;

  return (
    <input
      className="w-full border border-gray-200 p-2 my-2 rounded-sm focus:outline-gray-300"
      name={name}
      type={
        name === "email"
          ? "email"
          : name === "password" || name === "re-password"
          ? "password"
          : "text"
      }
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      placeholder={placeholder}
      required
    />
  );
}

export default InputText;
