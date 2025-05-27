import React from "react";

interface Props {
  onClick: () => void;
}

const HamburgerMenuButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center flex-col gap-[7px] cursor-pointer"
    >
      <div className="w-[33px] border-2 border-brand-green rounded-full"></div>
      <div className="w-[33px] border-2 border-brand-green rounded-full"></div>
      <div className="w-[33px] border-2 border-brand-green rounded-full"></div>
    </button>
  );
};

export default HamburgerMenuButton;
