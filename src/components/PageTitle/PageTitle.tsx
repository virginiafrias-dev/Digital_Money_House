import ArrowRight from "@/public/icons/arrow-right";
import React from "react";

const PageTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 p-5">
      <ArrowRight />
      <p className="font-semibold underline">{text}</p>
    </div>
  );
};

export default PageTitle;
