import Card from "@/components/Card/Card";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import ArrowRight from "@/public/icons/arrow-right";
import CarbonCopy from "@/public/icons/carbon-copy";
import Edit from "@/public/icons/edit";
import Link from "next/link";
import React from "react";

const FIELDS = {
  fullName: { label: "Nombre y apellido", matchingField: "fullName" },
  email: { label: "Email", matchingField: "email" },
  dni: { label: "DNI", matchingField: "dni" },
  phone: { label: "Teléfono", matchingField: "phone" },
  password: { label: "Contraseña", matchingField: "password" },
};

const mockPersonalInfo = {
  fullName: "Mauricio Brito",
  email: "mauriciobrito@digitalhouse.com",
  dni: "123123123",
  phone: "113131321",
  password: "******",
};

const ProfilePage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Perfil" />

      <div className="px-5 flex flex-col gap-5 pb-5">
        {/* Personal info */}
        <PersonalInfo />

        {/* Link to payment methods */}
        <Link href={"/payment-methods"}>
          <Card
            style="green"
            className="flex justify-between items-center shadow-lg py-[22px]"
          >
            <p className="font-bold text-black">Gestioná los medios de pago</p>
            <ArrowRight />
          </Card>
        </Link>

        {/* Banking info */}
        <BankingInfo />
      </div>
    </div>
  );
};

const PersonalInfo = () => (
  <Card className="bg-white flex flex-col gap-2 p-6! shadow-lg ">
    <p className="font-bold text-xl text-black">Tus datos</p>

    {Object.entries(FIELDS).map(([key, value]) => (
      <PersonalInfoItem
        key={key}
        label={value.label}
        value={
          mockPersonalInfo[value.matchingField as keyof typeof mockPersonalInfo]
        }
      />
    ))}
  </Card>
);

const PersonalInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <>
    <DividerLine />

    <div className="flex justify-between items-center">
      <div className="-space-y-0.5">
        <p>{label}</p>
        <p className="text-black/50 text-ellipsis">{value}</p>
      </div>
      <Edit />
    </div>
  </>
);

export const BankingInfo = () => (
  <Card style="black" className="flex flex-col gap-6 p-6! shadow-lg">
    <p className="text-sm">
      Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
    </p>

    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-brand-green">CVU</p>
          <p>0000002100075320000000</p>
        </div>
        <CarbonCopy />
      </div>

      <DividerLine />

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-brand-green">Alias</p>
          <p>este.alias.noexiste</p>
        </div>
        <CarbonCopy />
      </div>
    </div>
  </Card>
);

export default ProfilePage;
