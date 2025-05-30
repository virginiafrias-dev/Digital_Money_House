import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import Card from "../Card/Card";
import RedErrorCross from "@/public/icons/RedErrorCross";
import { DividerLine } from "../DividerLine";
import Link from "next/link";

const ServiceNotFound = () => {
  return (
    <div className="inset-0 absolute">
      <PageTitle text="Pagar servicios" />

      {/* STEP 2 */}
      <div className="flex flex-col gap-5 px-5 pb-5">
        <Card style="black" className="flex flex-col gap-5 p-6!">
          <RedErrorCross className="self-center" />
          <p className="font-bold text-xl text-white text-center">
            No encontramos facturas asociadas a ese dato
          </p>
          <DividerLine />
          <p className="text-brand-white text-xs text-center">
            Revisá el dato ingresado. Si es correcto, es posible que la empresa
            aún no haya cargado tu factura.
          </p>
        </Card>
        <Link
          href={`/services`}
          className="btn btn-primary shadow-lg self-end px-10!"
        >
          Revisar dato
        </Link>
      </div>
    </div>
  );
};

export default ServiceNotFound;
