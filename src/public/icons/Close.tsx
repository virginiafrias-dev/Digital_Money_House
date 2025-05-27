import React from "react";

const Close = ({ className }: { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 2L16 16"
        stroke="#C1FD35"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 2L2 15"
        stroke="#C1FD35"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Close;
