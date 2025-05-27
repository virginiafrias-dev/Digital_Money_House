import Card from "@/components/Card/Card";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import ArrowRight from "@/public/icons/arrow-right";
import Plus from "@/public/icons/plus";
import Link from "next/link";
import React from "react";

const PaymentMethodsPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Tarjetas" />

      <div className="px-5 flex flex-col gap-5 pb-5">
        {/* New cards link */}
        <Link href={"/payment-methods/new"}>
          <Card
            style="black"
            className="flex flex-col gap-6 shadow-lg py-4 px-6"
          >
            <p className="font-bold">Agregá tu tarjeta de débito o crédito</p>
            <div className="flex justify-between items-center pb-8">
              <div className="flex items-center gap-4">
                <Plus />
                <p className="font-bold text-brand-green">Nueva tarjeta</p>
              </div>
              <ArrowRight fill="#c1fd35" />
            </div>
          </Card>
        </Link>

        {/* Cards */}
        <ActivityCard />
      </div>
    </div>
  );
};

const ActivityCardItem = () => (
  <div className="flex flex-col gap-6">
    <DividerLine />
    <div className="flex gap-3 items-center pb-6">
      <div className="bg-brand-green rounded-full w-6 h-6" />
      <p className="text-sm grow">Terminada en 4067</p>
      <button>
        <p className="text-black text-xs font-bold">Eliminar</p>
      </button>
    </div>
  </div>
);

const ActivityCard = () => (
  <Card className="bg-white flex flex-col p-6! shadow-lg">
    <p className="font-bold mb-4">Tu actividad</p>

    <ActivityCardItem />
    <ActivityCardItem />
    <ActivityCardItem />
  </Card>
);

export default PaymentMethodsPage;
