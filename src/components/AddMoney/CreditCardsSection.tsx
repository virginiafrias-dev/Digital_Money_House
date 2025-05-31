"use client";
import CreditCards from "@/components/CreditCards/CreditCards";
import useCreditCards from "@/hooks/useCreditCards";
import Edit2 from "@/public/icons/Edit2";
import Plus from "@/public/icons/plus";
import { getCreditCardIssuer } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Card from "../Card/Card";
import Spinner from "../Spinner";
import axios from "axios";
import CheckVerde from "@/public/icons/check-verde";
import { toast, ToastContainer } from "react-toastify";

const CreditCardsSection = () => {
  const [step, setStep] = useState<"one" | "two" | "three" | "four">("one");
  const [amount, setAmount] = useState(0);
  const [dated, setDated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object({
    amount: yup
      .number()
      .required("Campo obligatorio")
      .typeError("Ingresá un número válido")
      .min(1, "El monto debe ser mayor a 0")
      .max(1000000, "El monto máximo es de 1.000.000"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    creditCards,
    selectedCreditCard,
    creditCardsLoading,
    setSelectedCreditCard,
  } = useCreditCards();

  const handleNextStep = () => {
    if (step === "one") goToStep("two");
    if (step === "three") goToStep("four");
  };

  const goToStep = (step: "one" | "two" | "three" | "four") => {
    setStep(step);
  };

  const onSubmit = handleSubmit((data) => {
    setStep("three");
    setAmount(data.amount);
  });

  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/account/deposits", {
        amount,
        creditCard: selectedCreditCard.number_id,
      });
      setDated(response.data.dated);
      goToStep("four");
    } catch (error) {
      console.error(error);
      toast.error("Error al transferir");
    } finally {
      setIsLoading(false);
    }
  };

  if (!!creditCards.length) {
    return (
      <>
        <ToastContainer />
        {/* STEP 1 */}
        <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
          {step === "one" && (
            <>
              <Card style="black" className="flex flex-col gap-6 p-6!">
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
                  className="flex items-center gap-2"
                >
                  <Plus />
                  <p className="font-bold text-brand-green">Nueva tarjeta</p>
                </Link>
                <button
                  className="btn btn-primary shadow-lg self-stretch"
                  onClick={handleNextStep}
                >
                  <p>Continuar</p>
                </button>
              </Card>
            </>
          )}

          {/* STEP 2 */}
          {step === "two" && (
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <Card
                style="black"
                className="flex flex-col gap-6 p-6! shadow-lg"
              >
                <p className="font-bold text-xl text-brand-green">
                  ¿Cuánto querés ingresar a la cuenta?
                </p>
                <div className="flex items-center">
                  <span className="text-brand-white font-bold text-xl mr-5">
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={1000000}
                    placeholder="0"
                    {...register("amount")}
                    className={clsx(errors.amount && "input-error", "grow")}
                  />
                </div>
                {errors.amount && (
                  <small className="text-red-500">
                    {errors.amount.message}
                  </small>
                )}
                <button
                  type="submit"
                  className="btn btn-primary shadow-lg self-stretch"
                >
                  <p>Continuar</p>
                </button>
              </Card>
            </form>
          )}

          {/* STEP 3 */}
          {step === "three" && (
            <>
              <Card
                style="black"
                className="flex flex-col gap-6 p-6! shadow-lg"
              >
                <p className="font-bold text-xl text-brand-green">
                  Revisá que esté todo bien
                </p>
                <div>
                  <p className="flex gap-4 ">
                    Vas a transferir
                    <button onClick={() => goToStep("two")}>
                      <Edit2 />
                    </button>
                  </p>
                  <p className="font-bold">$ {amount}</p>
                </div>
                <div>
                  <p className="text-xs">Para</p>
                  <p className="font-bold text-xl">Cuenta propia</p>
                </div>
                <div>
                  {getCreditCardIssuer(selectedCreditCard.number_id) ? (
                    <p>{getCreditCardIssuer(selectedCreditCard.number_id)}</p>
                  ) : (
                    <p>Tarjeta propia</p>
                  )}
                  <p>
                    **** **** ****{" "}
                    {String(selectedCreditCard.number_id).slice(-4)}
                  </p>
                </div>
                <button
                  className="btn btn-primary shadow-lg self-strech"
                  onClick={handleTransfer}
                  disabled={isLoading}
                >
                  <p>Transferir</p>
                </button>
              </Card>
            </>
          )}

          {/* STEP 4 */}
          {step === "four" && (
            <>
              <Card
                style="green"
                className="flex flex-col gap-5 p-6! shadow-lg items-center"
              >
                <CheckVerde fill="#000" className="w-11 h-11" />
                <p className="font-bold">Ya cargamos el dinero en tu cuenta</p>
              </Card>
              <Card
                style="black"
                className="flex flex-col gap-6 p-6! shadow-lg"
              >
                <div>
                  <p className="flex gap-4 ">
                    {new Date(dated).toLocaleDateString("es-Ar", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    })}
                  </p>
                  <p className="font-bold text-xl text-brand-green">
                    $ {amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs">Para</p>
                  <p className="font-bold text-xl text-brand-green">
                    Cuenta propia
                  </p>
                </div>
                <div>
                  {getCreditCardIssuer(selectedCreditCard.number_id) ? (
                    <p>{getCreditCardIssuer(selectedCreditCard.number_id)}</p>
                  ) : (
                    <p>Tarjeta propia</p>
                  )}
                  <p>
                    **** **** ****{" "}
                    {String(selectedCreditCard.number_id).slice(-4)}
                  </p>
                </div>
              </Card>
              <div className="flex gap-5 max-md:flex-col">
                <Link
                  href={"/dashboard"}
                  className="btn btn-primary shadow-lg basis-1/2 flex items-center justify-center"
                >
                  Ir al inicio
                </Link>
                <button
                  className="btn btn-primary shadow-lg basis-1/2 flex items-center justify-center"
                  onClick={handleNextStep}
                >
                  <p>Descargar comprobante</p>
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  } else return <Spinner />;
};

export default CreditCardsSection;
