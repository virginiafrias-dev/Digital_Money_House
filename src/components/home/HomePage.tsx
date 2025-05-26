import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import Card from "../Card/Card";
import Link from "next/link";
import LookingGlass from "@/public/icons/looking-glass";
import ArrowRight from "@/public/icons/arrow-right";

const moneyAvailable = 6890534.17;

const HomePage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Inicio" />
      <div className="px-5 flex flex-col gap-5 pb-5">
        {/* Black CC */}
        <Card style="black" className="flex flex-col gap-2 p-6! shadow-lg">
          <div className="flex gap-2">
            <div className="grow" />
            <Link
              href={"/payment-methods"}
              className="text-xs font-semibold relative after:bottom-[2px] after:inset-x-0 after:h-[1px] after:absolute after:content-[''] after:bg-brand-white/50"
            >
              Ver tarjetas
            </Link>
            <Link
              href={"/payment-methods"}
              className="text-xs font-semibold relative after:bottom-[2px] after:inset-x-0 after:h-[1px] after:absolute after:content-[''] after:bg-brand-white/50"
            >
              Ver CVU
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p>Dinero disponible</p>
            <div className="flex">
              <p className="font-bold text-2xl border border-brand-green rounded-full px-4 py-2">
                $
                {new Intl.NumberFormat("es", {
                  style: "currency",
                  currency: "ARS",
                })
                  .format(moneyAvailable)
                  .replace("ARS", "")}
              </p>
            </div>
          </div>
        </Card>

        {/* Green links */}
        <Link href={"/transactions"}>
          <Card
            style="green"
            className="grid place-items-center shadow-lg py-[22px]"
          >
            <p className="font-bold text-black">Ingresar dinero</p>
          </Card>
        </Link>

        <Link href={"/services"}>
          <Card
            style="green"
            className="grid place-items-center shadow-lg py-[22px]"
          >
            <p className="font-bold text-black">Pago de servicios</p>
          </Card>
        </Link>

        {/* Search bar */}
        <div className="relative flex">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LookingGlass />
          </div>
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="ring-transparent shadow-lg grow pl-10!"
          />
        </div>

        {/* Activity card */}
        <ActivityCard />
      </div>
    </div>
  );
};

const ActivityCardItem = () => (
  <div className="flex gap-3 items-center">
    <div className="bg-brand-green rounded-full w-6 h-6" />
    <p className="text-sm grow">Transferiste a Rodrigo</p>
    <div className="flex flex-col justify-evenly items-end">
      <p className="text-sm text-brand-gray">-$ 1265,57</p>
      <p className="text-xs text-black/50">Sábado</p>
    </div>
  </div>
);

const ActivityCard = () => (
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
      <p className="font-bold text-xs">Ver toda tu actividad</p>
      <ArrowRight />
    </Link>
  </Card>
);

export default HomePage;
