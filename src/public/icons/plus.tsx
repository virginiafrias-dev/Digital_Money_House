import React from "react";

const Plus = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.874 0.812988C26.8754 0.812988 34.1758 8.13099 34.1758 17.1626C34.1758 26.1942 26.8754 33.5122 17.874 33.5122C8.87285 33.512 1.57324 26.1941 1.57324 17.1626C1.57324 8.13112 8.87285 0.813202 17.874 0.812988Z"
        stroke="#C1FD35"
        strokeWidth="1.3"
      />
      <path
        d="M17.6255 10.1626V24.6626"
        stroke="#C1FD35"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M24.8545 17.1626L10.3958 17.1626"
        stroke="#C1FD35"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Plus;
