"use client";
import ArrowRight from "@/public/icons/arrow-right";
import Link from "next/link";
import Card from "../Card/Card";

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

const ActivityCardDashboard = ({ activity }: ActivityProps) => (
  <Card className="bg-white flex flex-col gap-2 p-6! shadow-lg">
    <p className="font-bold mb-1">Tu actividad</p>

    {activity.map((eachActivity) => (
      <div key={eachActivity.id}>
        <div className="h-px bg-brand-white" />
        <ActivityCardItem activity={eachActivity} />
      </div>
    ))}

    <Link href={"/activity"} className="mt-2 flex items-center justify-between">
      <p className="font-bold text-xs md:text-base">Ver toda tu actividad</p>
      <ArrowRight />
    </Link>
  </Card>
);

export default ActivityCardDashboard;
