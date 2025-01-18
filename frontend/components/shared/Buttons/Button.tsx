import React from "react";
type buttonTyes = "submit" | "reset" | "button";
const Button = ({
  children,
  varient = "default",
  type,
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  varient?: "primary" | "secondary" | "danger" | "default";
  type?: buttonTyes;
  className?: string;
  onClick?: Function;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`btn-${varient} ${className}`}
      type={type}
      onClick={(e) => (onClick ? onClick(e) : () => {})}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
