"use client";
import React, { useState } from "react";
import Card from "../Card/Card";
import Link from "next/link";
import { DividerLine } from "../DividerLine";
import LookingGlass from "@/public/icons/looking-glass";
import { Service } from "@/types/types";

const ServicesList = ({ services }: { services: Service[] }) => {
  const [filteredServices, setFilteredServices] = useState(services);
  const [searchValue, setSearchValue] = useState("");

  const handleFilterServices = (value: string) => {
    setSearchValue(value);
    setFilteredServices(
      services.filter((service) =>
        service.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
      {/* Search input */}
      <div className="relative flex">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <LookingGlass />
        </div>
        <input
          type="text"
          placeholder="Buscá entre más de 5.000 empresas"
          className="ring-transparent shadow-lg grow pl-10! py-5! md:text-lg"
          value={searchValue}
          onChange={(e) => handleFilterServices(e.target.value)}
        />
      </div>

      {/* Services list */}
      <Card className="bg-white flex flex-col p-6! shadow-lg">
        <p className="font-bold mb-4">Más recientes</p>

        {filteredServices.map(({ id, name }) => (
          <ActivityCardItem key={id} id={id} name={name} />
        ))}
      </Card>
    </div>
  );
};

const ActivityCardItem = ({ name, id }: { name: string; id: number }) => (
  <div className="flex flex-col gap-6">
    <DividerLine />
    <Link
      href={"/services/" + id}
      className="flex gap-3 justify-between items-center pb-6"
    >
      <p>{name}</p>
      <p className="text-black text-xs font-bold">Seleccionar</p>
    </Link>
  </div>
);

export default ServicesList;
