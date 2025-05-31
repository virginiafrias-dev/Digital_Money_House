"use client";
import ArrowRight from "@/public/icons/arrow-right";
import Link from "next/link";
import Card from "../Card/Card";
import LookingGlass from "@/public/icons/looking-glass";
import { useState } from "react";

export interface Activity {
  id: number;
  account_id: number;
  type: "Transfer" | "Deposit" | string;
  description: string;
  origin: string;
  destination: string;
  amount: number;
  dated: string;
}

interface ActivityProps {
  activity: Activity[];
}

interface EachActivityProps {
  activity: Activity;
}

const ActivityCardItem = ({ activity }: EachActivityProps) => (
  <div className="flex gap-3 items-center">
    <div className="bg-brand-green rounded-full w-6 h-6" />
    <p className="text-sm md:text-base grow">{activity.description}</p>
    <div className="flex flex-col justify-evenly items-end">
      <p className="text-sm md:text-base text-brand-gray">
        $ {activity.amount}
      </p>
      <p className="text-xs md:text-sm text-black/50">
        {new Date(activity.dated).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </p>
    </div>
  </div>
);

const ActivityCardDashboard = ({ activity }: ActivityProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredActivity, setFilteredActivity] = useState(
    activity
      .slice(0, 10)
      .sort((a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime())
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilteredActivity(
      activity
        .filter((eachActivity) =>
          eachActivity.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 10)
        .sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        )
    );
  };

  return (
    <>
      {/* Search bar */}
      <div className="relative flex">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <LookingGlass />
        </div>
        <input
          type="text"
          placeholder="Buscar en tu actividad"
          className="ring-transparent shadow-lg grow pl-10! py-5! md:text-lg"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Activity card */}
      {
        <Card className="bg-white flex flex-col gap-2 p-6! shadow-lg">
          <p className="font-bold mb-1">Tu actividad</p>

          {filteredActivity.map((eachActivity) => (
            <div key={eachActivity.id}>
              <div className="h-px bg-brand-white" />
              <ActivityCardItem activity={eachActivity} />
            </div>
          ))}

          <Link
            href={"/activity"}
            className="mt-2 flex items-center justify-between"
          >
            <p className="font-bold text-xs md:text-base">
              Ver toda tu actividad
            </p>
            <ArrowRight />
          </Link>
        </Card>
      }
    </>
  );
};

export default ActivityCardDashboard;
