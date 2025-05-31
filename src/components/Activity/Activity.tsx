"use client";
import LookingGlass from "@/public/icons/looking-glass";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../Card/Card";
import Filter from "@/public/icons/Filter";
import { Activity as ActivityType } from "../Dashboard/ActivityCardDashboard";
import { DividerLine } from "../DividerLine";
import clsx from "clsx";
import CircleItemUnselected from "@/public/icons/CircleItemUnselected";
import CircleItemSelected from "@/public/icons/CircleItemSelected";
import {
  isThisWeek,
  isToday,
  isWithinInterval,
  isYesterday,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

interface ActivityProps {
  activity: ActivityType[];
}

type Sort =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastFortnight"
  | "lastMonth"
  | "lastYear"
  | "all";

const SORT_OPTIONS: { label: string; value: Sort }[] = [
  { label: "Hoy", value: "today" },
  { label: "Ayer", value: "yesterday" },
  { label: "Última semana", value: "lastWeek" },
  { label: "Última 15 días", value: "lastFortnight" },
  { label: "Último mes", value: "lastMonth" },
  { label: "Último año", value: "lastYear" },
  { label: "Todos", value: "all" },
];

const Activity = ({ activity: originalActivity }: ActivityProps) => {
  const [filteredActivity, setFilteredActivity] = useState<ActivityType[]>([]);
  const [sortedActivity, setSortedActivity] = useState<ActivityType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false);
  const [sort, setSort] = useState<Sort>("all");
  const [searchValue, setSearchValue] = useState("");

  const navigateToPage = (page: number) => {
    setCurrentPage(page);
    setSortedActivity(filteredActivity.slice(page * 10, (page + 1) * 10));
  };

  const handleClearFilters = () => {
    setSort("all");
    setSearchValue("");
    setFilteredActivity(originalActivity);
    setFilterMenuIsOpen(false);
  };

  const handleSearch = (value: string) => {
    setSort("all");
    setSearchValue(value);
    setFilteredActivity(
      originalActivity.filter((each) =>
        each.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFilteredSort = useCallback((sort: Sort) => {
    setSort(sort);
    console.log("cambiando SORT", sort);
  }, []);

  const applyFilteredSort = () => {
    setFilterMenuIsOpen(false);
    setSearchValue("");
    setFilteredActivity(
      originalActivity
        .filter((each) => {
          const date = new Date(each.dated);
          if (sort === "today") return isToday(date);
          if (sort === "yesterday") return isYesterday(date);
          if (sort === "lastWeek") return isThisWeek(date);
          if (sort === "lastFortnight")
            return isWithinInterval(date, {
              start: subDays(new Date(), 15),
              end: new Date(),
            });
          if (sort === "lastMonth")
            return isWithinInterval(date, {
              start: subMonths(new Date(), 1),
              end: new Date(),
            });
          if (sort === "lastYear")
            return isWithinInterval(date, {
              start: subYears(new Date(), 1),
              end: new Date(),
            });
          return true;
        })
        .sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        )
    );
  };

  useEffect(() => {
    setSortedActivity(
      filteredActivity
        .sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        )
        .slice(0, 10)
    );
    setCurrentPage(0);
  }, [filteredActivity]);

  useEffect(() => {
    applyFilteredSort();
    console.log(originalActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalActivity]);

  const getAmountOfPages = useMemo(() => {
    return Math.ceil(filteredActivity.length / 10);
  }, [filteredActivity]);

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
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary flex items-center lg:gap-16 max-md:hidden gap-2"
          onClick={() => setFilterMenuIsOpen((prev) => !prev)}
        >
          <p>Filtrar</p>
          <Filter />
        </button>
      </div>

      {/* Activity card */}
      <Card className="bg-white flex flex-col gap-5 p-6! shadow-lg relative">
        {/* Filter Menu */}
        {filterMenuIsOpen && (
          <div
            className="fixed inset-0"
            onClick={() => setFilterMenuIsOpen(false)}
          />
        )}
        {filterMenuIsOpen && (
          <div className="absolute -top-2 -right-2 w-[350px] bg-white rounded-lg shadow-2xl border border-brand-gray/20 flex flex-col z-[90]">
            <div className="flex items-center justify-between px-5 py-3">
              <p className="font-bold">Período</p>
              <button onClick={handleClearFilters}>
                <p>Borrar filtros</p>
              </button>
            </div>
            <div className="h-px bg-brand-white left-0 right-0" />

            <div className="flex flex-col">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className="flex justify-between w-full py-4 px-5"
                  onClick={() => handleFilteredSort(option.value)}
                >
                  <p className="text-black/50">{option.label}</p>
                  {sort === option.value ? (
                    <CircleItemSelected />
                  ) : (
                    <CircleItemUnselected />
                  )}
                </button>
              ))}
            </div>

            <div className="px-5 pb-3 flex justify-end">
              <button
                className="btn btn-primary px-10!"
                onClick={applyFilteredSort}
              >
                <p>Aplicar</p>
              </button>
            </div>
          </div>
        )}
        {/* / Filter Menu */}

        <div className="flex justify-between items-center">
          <p className="font-bold mb-1">Tu actividad</p>
          <button
            className="flex items-center gap-3 md:hidden"
            onClick={() => setFilterMenuIsOpen((prev) => !prev)}
          >
            <p className="font-semibold underline">Filtrar</p>
            <Filter />
          </button>
        </div>

        {!!sortedActivity.length ? (
          sortedActivity.map((each) => (
            <ActivityCardItem
              key={each.id}
              description={each.description}
              amount={each.amount}
              dated={each.dated}
            />
          ))
        ) : (
          <p>No hay actividad para mostrar</p>
        )}

        {!!sortedActivity.length && (
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
                }}
              >
                <p>{i + 1}</p>
              </button>
            ))}
          </div>
        )}
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
