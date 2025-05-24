import clsx from "clsx";
import React from "react";

const Card = ({
  children,
  style = "white",
}: {
  children: React.ReactNode;
  style?: "white" | "black" | "green";
}) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-3xl",
        style === "white" && "bg-brand-white text-brand-black",
        style === "black" && "bg-brand-black text-brand-white",
        style === "green" && "bg-brand-green text-brand-black"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
