import React from "react";

const Spinner = () => {
  return (
    <div className="inset-0 absolute">
      <div className="flex items-center justify-center h-full pb-[30vh]">
        <div className="bg-brand-gray rounded-full w-[50px] h-[50px] relative grid place-items-center">
          <div className="bg-brand-green rounded-full w-12 h-12 relative animate-spin">
            <div className="absolute inset-2 bg-brand-gray rounded-full" />
            <div className="absolute inset-[9px] bg-brand-white rounded-full" />
            <div className="absolute -top-[2px] -right-[2px] w-[26px] h-[26px] bg-brand-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
