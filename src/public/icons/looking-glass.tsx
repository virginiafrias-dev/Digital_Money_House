import React from "react";

const LookingGlass = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="6.39988"
        cy="6.39988"
        r="5.64988"
        stroke="#828282"
        strokeWidth="1.5"
      />
      <path
        d="M10.1914 10L14.5149 14.7045"
        stroke="#828282"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default LookingGlass;
