import React from "react";
import "./Text.scss";

const Text: React.FC<{ variant?: "sm" | "md" | "lg" | "xl" }> = ({
  variant,
  children,
}) => {
  return (
    <div>
      <span className={variant ? `text--${variant}` : "text"}>{children}</span>
    </div>
  );
};

export default Text;
