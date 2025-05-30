"use client";
import React from "react";
import Card from "../Card/Card";
import ArrowRight from "@/public/icons/arrow-right";
import Link from "next/link";

const ActivityCardItem = () => (
  <div className="flex gap-3 items-center">
    <div className="bg-brand-green rounded-full w-6 h-6" />
    <p className="text-sm md:text-base grow">Transferiste a Rodrigo</p>
    <div className="flex flex-col justify-evenly items-end">
      <p className="text-sm md:text-base text-brand-gray">-$ 1265,57</p>
      <p className="text-xs md:text-sm text-black/50">Sábado</p>
    </div>
  </div>
);

const ActivityCardDashboard = () => (
  <Card className="bg-white flex flex-col gap-2 p-6! shadow-lg">
    <p className="font-bold mb-1">Tu actividad</p>

    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />

    <Link href={"/activity"} className="mt-2 flex items-center justify-between">
      <p className="font-bold text-xs md:text-base">Ver toda tu actividad</p>
      <ArrowRight />
    </Link>
  </Card>
);

export default ActivityCardDashboard;
