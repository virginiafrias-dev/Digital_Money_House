import React from "react";

const Filter = ({ className }: { className?: string }) => {
  return (
    <svg
      width="17"
      height="13"
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line y1="9.7002" x2="17" y2="9.7002" stroke="#201F22" />
      <line
        x1="17"
        y1="2.7666"
        x2="-4.37114e-08"
        y2="2.7666"
        stroke="#201F22"
      />
      <circle
        cx="5.09993"
        cy="9.63314"
        r="2.33333"
        fill="white"
        stroke="#201F22"
      />
      <circle
        cx="11.9001"
        cy="2.83366"
        r="2.33333"
        transform="rotate(-180 11.9001 2.83366)"
        fill="white"
        stroke="#201F22"
      />
    </svg>
  );
};

export default Filter;
