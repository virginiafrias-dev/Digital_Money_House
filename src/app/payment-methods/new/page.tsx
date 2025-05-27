import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

const NewPaymentMethodPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Nueva tarjeta" />
      <div className="px-5 pb-5">
        <Card className="flex flex-col gap-6 p-6! shadow-lg bg-white">
          <div className="bg-brand-gray h-44" />

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Número de tarjeta*"
              className="ring-transparent shadow-lg grow"
            />
            <input
              type="text"
              placeholder="Nombre y apellido*"
              className="ring-transparent shadow-lg grow"
            />
            <input
              type="date"
              placeholder="Fecha de vencimiento*"
              className="ring-transparent shadow-lg grow"
            />
            <input
              type="number"
              placeholder="Código de seguridad*"
              className="ring-transparent shadow-lg grow"
            />
            <button className="btn btn-primary mt-4">Continuar</button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewPaymentMethodPage;
