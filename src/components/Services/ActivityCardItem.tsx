"use client";
import { DividerLine } from "../DividerLine";

export const ActivityCardItem = ({
  name,
  id,
  amount,
}: {
  name: string;
  id: number;
  amount: number;
}) => {
  const handleSelect = () => {
    console.log({ name, id, amount });
  };

  return (
    <div className="flex flex-col gap-6">
      <DividerLine />
      <button
        className="flex gap-3 justify-between items-center pb-6"
        type="button"
        onClick={handleSelect}
      >
        <p>{name}</p>
        <p className="text-black text-xs font-bold">Seleccionar</p>
      </button>
    </div>
  );
};
