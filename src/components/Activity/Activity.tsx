"use client";
import LookingGlass from "@/public/icons/looking-glass";
import React, { useEffect, useMemo, useState } from "react";
import Card from "../Card/Card";
import Filter from "@/public/icons/Filter";
import { Activity as ActivityType } from "../Dashboard/ActivityCardDashboard";
import { DividerLine } from "../DividerLine";
import clsx from "clsx";

interface ActivityProps {
  activity: ActivityType[];
}

const Activity = ({ activity: originalActivity }: ActivityProps) => {
  const [renderedActivity, setRenderedActivity] = useState<ActivityType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const navigateToPage = (page: number) => {
    setCurrentPage(page);
    setRenderedActivity(originalActivity.slice(page * 10, (page + 1) * 10));
  };

  useEffect(() => {
    console.log(originalActivity);
    setRenderedActivity(
      originalActivity
        .sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        )
        .slice(0, 10)
    );
  }, [originalActivity]);

  const getAmountOfPages = useMemo(() => {
    return Math.ceil(originalActivity.length / 10);
  }, [originalActivity]);

  return (
    <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
      {/* Search input */}
      <div className="flex gap-5">
        <div className="relative flex grow">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LookingGlass />
          </div>
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="ring-transparent shadow-lg pl-10! py-5! grow"
          />
        </div>
        <button className="btn btn-primary flex items-center lg:gap-16 max-md:hidden gap-2">
          <p>Filtrar</p>
          <Filter />
        </button>
      </div>

      {/* Activity card */}
      <Card className="bg-white flex flex-col gap-5 p-6! shadow-lg">
        <div className="flex justify-between items-center">
          <p className="font-bold mb-1">Tu actividad</p>
          <button className="flex items-center gap-3 md:hidden">
            <p className="font-semibold underline">Filtrar</p>
            <Filter />
          </button>
        </div>

        {!!renderedActivity.length
          ? renderedActivity.map((each) => (
              <ActivityCardItem
                key={each.id}
                description={each.description}
                amount={each.amount}
                dated={each.dated}
              />
            ))
          : null}

        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: getAmountOfPages }).map((each, i) => (
            <button
              className={clsx(
                "w-8 h-8 font-bold rounded-lg",
                currentPage === i && "bg-brand-white"
              )}
              key={i}
              onClick={() => {
                navigateToPage(i);
                console.log("navegando a ", i + 1);
              }}
            >
              <p>{i + 1}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

interface ActivityCardItemProps {
  description: string;
  amount: number;
  dated: string;
}

const ActivityCardItem = ({
  description,
  amount,
  dated,
}: ActivityCardItemProps) => (
  <>
    <DividerLine />
    <div className="flex gap-3 items-center">
      <div className="bg-brand-green rounded-full w-6 h-6" />
      <p className="text-sm md:text-base grow">{description}</p>
      <div className="flex flex-col justify-evenly items-end">
        <p className="text-sm md:text-base text-brand-gray">
          {new Intl.NumberFormat("es", {
            style: "currency",
            currency: "ARS",
          })
            .format(amount)
            .replace("ARS", "")}
        </p>
        <p className="text-xs md:text-sm text-black/50">
          {new Date(dated).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </p>
      </div>
    </div>
  </>
);

export default Activity;
