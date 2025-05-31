"use client";
import CarbonCopy from "@/public/icons/carbon-copy";
import Card from "./Card/Card";
import { DividerLine } from "./DividerLine";

export const BankingInfo = ({ cvu, alias }: { cvu: string; alias: string }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card style="black" className="flex flex-col gap-6 p-6! shadow-lg">
      <p className="text-sm">
        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-brand-green">CVU</p>
            <p>{cvu}</p>
          </div>
          <button onClick={() => handleCopy(cvu)}>
            <CarbonCopy />
          </button>
        </div>

        <DividerLine />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-brand-green">Alias</p>
            <p>{alias}</p>
          </div>
          <button onClick={() => handleCopy(alias)}>
            <CarbonCopy />
          </button>
        </div>
      </div>
    </Card>
  );
};
