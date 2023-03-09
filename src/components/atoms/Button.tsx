import React from "react";

interface Button {
  text: string;
  className?: string;
  onClick?: () => any;
}

function Button({ text, className, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-light-blue text-white p-2 rounded-md`}
    >
      {text}
    </button>
  );
}

export default Button;
