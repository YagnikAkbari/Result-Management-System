import React, { ChangeEventHandler } from "react";
type inputVarients =
  | "text"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "password"
  | "email"
  | "submit";

const Input = ({
  type = "text",
  name,
  id,
  placeholder,
  className,
  required = false,
  children,
  onChange,
}: {
  type: inputVarients;
  name: string;
  id: string;
  placeholder: string;
  className: string;
  required?: boolean;
  children?: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      required={required}
      onChange={onChange}
    >
      {children}
    </input>
  );
};

export default Input;
