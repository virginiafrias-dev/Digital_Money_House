import React from "react";

const RedErrorCross = ({ className }: { className?: string }) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.5078 14.5078L26.4924 26.4924"
        stroke="#E91010"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5078 26.4922L26.4924 14.5076"
        stroke="#E91010"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20.5" cy="20.5" r="18.5" stroke="#E91010" strokeWidth="4" />
    </svg>
  );
};

export default RedErrorCross;
