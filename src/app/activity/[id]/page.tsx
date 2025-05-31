"use client";
import Card from "@/components/Card/Card";
import { Activity } from "@/components/Dashboard/ActivityCardDashboard";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import Spinner from "@/components/Spinner";
import CheckVerde from "@/public/icons/check-verde";
import { AccountInfo } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleActivityPage = () => {
  const { id } = useParams();
  const [activityInfo, setactivityInfo] = useState<Activity>({} as Activity);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(
    {} as AccountInfo
  );
  const [isLoading, setIsLoading] = useState(true);
  const getActivityInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const [activityResponse, accountResponse] = await Promise.all([
        axios.get(`/api/activity/${id}`, { data: { id } }),
        axios.get(`/api/account`),
      ]);
      setactivityInfo(activityResponse.data);
      setAccountInfo(accountResponse.data);
    } catch (error) {
      toast.error("Error obteniendo los datos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getActivityInfo();
  }, [getActivityInfo]);

  return (
    <div className="absolute inset-0">
      <PageTitle text="Tu actividad" />
      <div className="flex flex-col gap-5 p-6! px-5 md:p-20!">
        {!isLoading ? (
          <Card style="black" className="flex flex-col gap-6 p-6! shadow-lg">
            <div className="flex gap-4 items-center">
              <CheckVerde className="h-6 w-6" />
              <p className="font-bold text-brand-green text-xl">Aprobada</p>
            </div>
            <DividerLine />
            <p className="text-xs">
              Creada el{" "}
              {new Date(activityInfo.dated).toLocaleDateString("es-Ar", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
            <div>
              <p className="text-sm font-bold">Transferencia de dinero</p>
              <p className="font-bold text-xl text-brand-green">
                {new Intl.NumberFormat("es-Ar", {
                  style: "currency",
                  currency: "ARS",
                }).format(activityInfo.amount)}
              </p>
            </div>
            <div>
              <p className="text-xs">
                {activityInfo.type === "Transaction"
                  ? "Pagaste"
                  : activityInfo.type === "Deposit"
                  ? "Ingresaste a"
                  : String(accountInfo.id) === activityInfo.destination
                  ? "Te transfirieron a"
                  : "Transferiste a"}
              </p>
              <p className="font-bold text-xl text-brand-green">
                {activityInfo.type === "Transaction"
                  ? activityInfo.description
                  : activityInfo.type === "Deposit" ||
                    String(accountInfo.id) === activityInfo.destination
                  ? "Cuenta propia"
                  : activityInfo.destination}
              </p>
            </div>
            <div>
              <p className="text-xs">Número de operación</p>
              <p className="text-brand-green">{activityInfo.id}</p>
            </div>
          </Card>
        ) : (
          <Card
            style="black"
            className="h-40 relative grid place-items-center grow"
          >
            <div className="relative">
              <Spinner bg="brand-black" />
            </div>
          </Card>
        )}
        <div className="flex max-md:flex-col-reverse gap-5">
          <Link
            href={"/dashboard"}
            className="btn btn-primary shadow-lg basis-1/2 flex items-center justify-center"
          >
            Ir al inicio
          </Link>
          <button
            className="btn btn-primary shadow-lg basis-1/2 flex items-center justify-center"
            onClick={() => {}}
          >
            <p>Descargar comprobante</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleActivityPage;
