"use client";
import Card from "@/components/Card/Card";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import ServiceNotFound from "@/components/Services/ServiceNotFound";
import Spinner from "@/components/Spinner";
import CheckVerde from "@/public/icons/check-verde";
import CircleItemSelected from "@/public/icons/CircleItemSelected";
import CircleItemUnselected from "@/public/icons/CircleItemUnselected";
import Plus from "@/public/icons/plus";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ServiceData {
  id: number | undefined;
  name: string;
  date: string;
  invoice_value: number | undefined;
}

const PayServicePage = () => {
  const { id } = useParams();
  const [step, setStep] = useState<"one" | "two" | "three">("one");

  const [serviceData, setServiceData] = useState<ServiceData>({
    id: undefined,
    name: "",
    date: "",
    invoice_value: undefined,
  });
  const [fetchedServiceData, setFetchedServiceData] = useState(false);

  const getServiceData = async (id: string) => {
    try {
      const response = await axios(`/api/service/${id}`);
      setServiceData(response.data);
      setFetchedServiceData(true);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching service data:", error);
      setFetchedServiceData(true);
      return error;
    }
  };

  useEffect(() => {
    if (id) {
      getServiceData(id as string);
    }
  }, [id]);

  if (!fetchedServiceData) {
    return <Spinner />;
  } else if (serviceData.name) {
    return (
      <div className="inset-0 absolute">
        <PageTitle text="Pagar servicios" />

        {/* STEP 1 */}
        {step === "one" && (
          <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
            <Card style="black" className="flex flex-col gap-5 pb-20! p-6!">
              <p className="text-brand-green font-bold text-xl md:hidden">
                Número de cuenta <br />
                sin el primer 2
              </p>
              <p className="text-brand-green font-bold text-xl max-md:hidden">
                Número de cuenta sin el primer 2
              </p>
              <input type="text" placeholder="Ingresá el número de cuenta" />
            </Card>
            <button
              type="button"
              onClick={() => setStep("two")}
              className="btn btn-primary shadow-lg self-end px-10!"
            >
              <p>Continuar</p>
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === "two" && (
          <div className="flex flex-col gap-5 px-5 pb-5">
            <Card style="black" className="flex flex-col gap-5 p-6!">
              <div className="space-y-2">
                <p className="text-xs font-semibold underline text-end">
                  Ver detalles de pago
                </p>
                <p className="font-bold text-xl text-brand-green">
                  {serviceData.name}
                </p>
              </div>
              <DividerLine />
              <div className="flex items-center">
                <p className="font-bold grow">Total a pagar</p>
                <p className="font-bold">
                  $
                  {serviceData.invoice_value
                    ? new Intl.NumberFormat("es", {
                        style: "currency",
                        currency: "ARS",
                      })
                        .format(serviceData.invoice_value)
                        .replace("ARS", "")
                    : "0"}
                </p>
              </div>
            </Card>
            <Card style="black" className="flex flex-col gap-5 p-6!">
              <p className="font-bold text-xl text-brand-green">
                Seleccionar tarjeta
              </p>
              <ActivityCard />
              <Link
                href="/payment-methods/new"
                className="flex gap-2 items-center"
              >
                <Plus />
                <p className="font-bold text-brand-green">Nueva tarjeta</p>
              </Link>
            </Card>
            <button
              className="btn btn-primary shadow-lg self-end px-10!"
              type="button"
              onClick={() => setStep("three")}
            >
              <p>Pagar</p>
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === "three" && (
          <div className="flex flex-col gap-5 px-5 pb-5">
            <Card
              style="green"
              className="flex flex-col gap-5 p-6! items-center"
            >
              <CheckVerde fill="#000" className="w-11 h-11" />
              <p className="font-bold">Ya realizamos tu pago</p>
            </Card>
            <Card style="black" className="flex flex-col gap-5 p-6!">
              <div className="space-y-2">
                <p className="text-xs">UNA FECHA</p>

                <p className="font-bold text-xl text-brand-green">
                  $
                  {serviceData.invoice_value
                    ? new Intl.NumberFormat("es", {
                        style: "currency",
                        currency: "ARS",
                      })
                        .format(serviceData.invoice_value)
                        .replace("ARS", "")
                    : "0"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs">Para</p>

                <p className="font-bold text-xl text-brand-green">
                  Cuenta propia
                </p>
              </div>
              <div className="space-y-2">
                <p>Tarjeta</p>

                <p>VISA **** **** **** 4067</p>
              </div>
            </Card>
            <button className="btn btn-primary shadow-lg px-10!">
              <p>Descargar comprobante</p>
            </button>
            <Link
              href="/dashboard"
              className="btn btn-primary shadow-lg px-10!"
            >
              <p>Ir al inicio</p>
            </Link>
          </div>
        )}
      </div>
    );
  } else {
    return <ServiceNotFound />;
  }
};

const ActivityCardItem = ({ selected }: { selected: boolean }) => (
  <div className="flex flex-col gap-6">
    <DividerLine />
    <div className="flex gap-3 items-center pb-6">
      <div className="bg-brand-green rounded-full w-6 h-6" />
      <p className="text-sm grow">Terminada en 4067</p>
      <button>
        {selected ? <CircleItemSelected /> : <CircleItemUnselected />}
      </button>
    </div>
  </div>
);

const ActivityCard = () => (
  <Card className="bg-white flex flex-col p-6! shadow-lg">
    <p className="font-bold mb-4">Tus tarjetas</p>

    <ActivityCardItem selected={true} />
    <ActivityCardItem selected={false} />
  </Card>
);

export default PayServicePage;
