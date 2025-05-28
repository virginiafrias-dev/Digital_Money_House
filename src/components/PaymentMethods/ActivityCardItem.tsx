"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { DividerLine } from "../DividerLine";

const ActivityCardItem = ({
  cardInfo,
}: {
  cardInfo: { id: number; number_id: number };
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete("/api/cards/" + cardInfo.id);
    router.refresh();
    // "/payment-methods"
  };
  return (
    <div className="flex flex-col gap-6">
      <DividerLine />
      <div className="flex gap-3 items-center pb-6">
        <div className="bg-brand-green rounded-full w-6 h-6" />
        <p className="text-sm grow">
          Terminada en {String(cardInfo.number_id).slice(-4)}
        </p>
        <button onClick={handleDelete}>
          <p className="text-black text-xs font-bold">Eliminar</p>
        </button>
      </div>
    </div>
  );
};

export default ActivityCardItem;
