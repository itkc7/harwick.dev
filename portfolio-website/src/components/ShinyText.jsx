import React from "react";

const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  as: Component = "button", // default is <button>
  ...props // spread remaining props like onClick, onMouseEnter, etc.
}) => {
  const animationDuration = `${speed}s`;

  return (
    <Component
      {...props}
      disabled={disabled}
      className={`
        text-[#b5b5b5a4] bg-clip-text inline-block
        ${disabled ? "" : "animate-shine"}
        ${className}
      `}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </Component>
  );
};

export default ShinyText;
