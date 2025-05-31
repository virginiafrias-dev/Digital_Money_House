import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import ArrowRight from "@/public/icons/arrow-right";
import CreditCard from "@/public/icons/CreditCard";
import Profile from "@/public/icons/Profile";
import Link from "next/link";
import React from "react";

const AddMoneyPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Cargar dinero" />
      <div className="flex flex-col gap-5 px-5 md:p-20">
        <Link href="/add-money/transfer">
          <Card style="black" className="p-6 py-10 flex items-center">
            <Profile />
            <p className="text-brand-green grow font-bold text-xl px-5">
              Transferencia
              <br />
              bancaria
            </p>
            <ArrowRight fill="#c1fd35" className="w-6 h-6" />
          </Card>
        </Link>
        <Link href="/add-money/card">
          <Card style="black" className="p-6 py-10 flex items-center">
            <CreditCard />
            <p className="text-brand-green grow font-bold text-xl px-5">
              Seleccionar
              <br />
              tarjeta
            </p>
            <ArrowRight fill="#c1fd35" className="w-6 h-6" />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AddMoneyPage;
