"use client";
import Link from "next/link";
import Card from "../Card/Card";

const InfoBanner = ({ moneyAvailable }: { moneyAvailable: any }) => {
  if (String(moneyAvailable).length === 0) return;
  return (
    <Card
      style="black"
      className="flex flex-col gap-2 p-6! lg:p-10! lg:pb-15! shadow-lg"
    >
      <div className="flex gap-2">
        <div className="grow" />
        <Link
          href={"/payment-methods"}
          className="text-xs md:text-base font-semibold relative after:bottom-[2px] after:inset-x-0 after:h-[1px] after:absolute after:content-[''] after:bg-brand-white/50"
        >
          Ver tarjetas
        </Link>
        <Link
          href={"/payment-methods"}
          className="text-xs md:text-base font-semibold relative after:bottom-[2px] after:inset-x-0 after:h-[1px] after:absolute after:content-[''] after:bg-brand-white/50"
        >
          Ver CVU
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <p className="md:font-bold">Dinero disponible</p>
        <div className="flex">
          <p className="font-bold text-2xl md:text-[32px] lg:text-[36px] border border-brand-green rounded-full px-4 py-2">
            $
            {new Intl.NumberFormat("es", {
              style: "currency",
              currency: "ARS",
            })
              .format(Number(moneyAvailable))
              .replace("ARS", "")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default InfoBanner;
