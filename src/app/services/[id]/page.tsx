"use client";
import Card from "@/components/Card/Card";
import CreditCards from "@/components/CreditCards/CreditCards";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import ServiceNotFound from "@/components/Services/ServiceNotFound";
import Spinner from "@/components/Spinner";
import useCreditCards from "@/hooks/useCreditCards";
import CheckVerde from "@/public/icons/check-verde";
import Plus from "@/public/icons/plus";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { getCreditCardIssuer } from "@/utils/utils";
import { CreditCard } from "@/types/types";
import { toast, ToastContainer } from "react-toastify";

interface ServiceData {
  id: number | undefined;
  name: string;
  date: string;
  invoice_value: number | undefined;
}

const PayServicePage = () => {
  const { id } = useParams();
  const [step, setStep] = useState<"one" | "two" | "three">("one");

  const {
    creditCards,
    creditCardsLoading,
    selectedCreditCard,
    setSelectedCreditCard,
  } = useCreditCards();

  useEffect(() => {}, [selectedCreditCard]);

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
      return response.data;
    } catch (error) {
      console.error("Error fetching service data:", error);
      setFetchedServiceData(true);
      return error;
    }
  };

  const handlePayService = async () => {
    try {
      await axios.post("/api/service", {
        amount: serviceData.invoice_value,
        dated: new Date().toISOString(),
        description: serviceData.name,
      });
      setStep("three");
    } catch (error) {
      console.error(error);
      toast.error("Error al pagar el servicio");
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
        <ToastContainer />

        {/* STEP 1 */}
        {step === "one" && <StepOne handleNextStep={() => setStep("two")} />}

        {/* STEP 2 */}
        {step === "two" && (
          <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
            <Card style="black" className="flex flex-col gap-5 p-6! shadow-lg">
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
                  {serviceData.invoice_value
                    ? new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(serviceData.invoice_value)
                    : "0"}
                </p>
              </div>
            </Card>
            <Card style="black" className="flex flex-col gap-5 p-6! shadow-lg">
              <p className="font-bold text-xl text-brand-green">
                Seleccionar tarjeta
              </p>
              <CreditCards
                creditCards={creditCards}
                selectedCreditCard={selectedCreditCard}
                setSelectedCreditCard={setSelectedCreditCard}
                creditCardsLoading={creditCardsLoading}
              />
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
              onClick={handlePayService}
            >
              <p>Pagar</p>
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === "three" && (
          <StepThree
            serviceData={serviceData}
            handleDownloadReceipt={() => {}}
            selectedCreditCard={selectedCreditCard}
          />
        )}
      </div>
    );
  } else {
    return <ServiceNotFound />;
  }
};

const StepOne = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const schema = yup.object({
    accountNumber: yup
      .string()
      .required("Campo obligatorio")
      .matches(/^\d+$/, "Debe contener solo números")
      .length(11, "Debe tener exactamente 11 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(() => {
    handleNextStep();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5 pb-5 md:p-20">
      <Card style="black" className="flex flex-col gap-5 pb-20! p-6! shadow-lg">
        <p className="text-brand-green font-bold text-xl md:hidden">
          Número de cuenta <br />
          sin el primer 2
        </p>
        <p className="text-brand-green font-bold text-xl max-md:hidden">
          Número de cuenta sin el primer 2
        </p>
        <input
          type="number"
          placeholder="Ingresá el número de cuenta"
          {...register("accountNumber")}
          className={clsx(errors.accountNumber && "input-error")}
        />
        {errors.accountNumber && (
          <small className="text-red-500 text-center">
            {errors.accountNumber.message}
          </small>
        )}
      </Card>
      <button className="btn btn-primary shadow-lg self-end px-10!">
        <p>Continuar</p>
      </button>
    </form>
  );
};

const StepThree = ({
  serviceData,
  handleDownloadReceipt,
  selectedCreditCard,
}: {
  serviceData: ServiceData;
  handleDownloadReceipt: () => void;
  selectedCreditCard: CreditCard;
}) => (
  <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
    <Card
      style="green"
      className="flex flex-col gap-5 p-6! shadow-lg items-center"
    >
      <CheckVerde fill="#000" className="w-11 h-11" />
      <p className="font-bold">Ya realizamos tu pago</p>
    </Card>
    <Card style="black" className="flex flex-col gap-5 p-6!">
      <div className="space-y-2">
        <p className="text-xs">{serviceData.date}</p>

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

        <p className="font-bold text-xl text-brand-green">{serviceData.name}</p>
      </div>
      <div className="space-y-2">
        <p>Tarjeta</p>

        <p>
          {getCreditCardIssuer(selectedCreditCard.number_id)} **** **** ****{" "}
          {selectedCreditCard.number_id.toString().slice(-4)}
        </p>
      </div>
    </Card>
    <div className="flex gap-5 max-md:flex-col-reverse">
      <Link
        href="/dashboard"
        className="btn btn-primary shadow-lg px-10! basis-1/2 grid place-items-center"
      >
        <p>Ir al inicio</p>
      </Link>
      <button
        className="btn btn-primary shadow-lg px-10! basis-1/2 grid place-items-center"
        type="button"
        onClick={handleDownloadReceipt}
      >
        <p>Descargar comprobante</p>
      </button>
    </div>
  </div>
);

export default PayServicePage;
