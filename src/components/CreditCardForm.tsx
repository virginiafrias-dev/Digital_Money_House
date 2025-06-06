"use client";
import AmexLogo from "@/public/icons/AmexLogo";
import DefaultCreditCardLogo from "@/public/icons/DefaultCreditCardLogo";
import DiscoverLogo from "@/public/icons/DiscoverLogo";
import MasterCardLogo from "@/public/icons/MasterCardLogo";
import VisaLogo from "@/public/icons/VisaLogo";
import { getCreditCardIssuer } from "@/utils/utils";
import axios from "axios";
import React, { useState } from "react";
import Card from "./Card/Card";
import { toast, ToastContainer } from "react-toastify";

const CreditCardForm = () => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    focus: "",
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setCardData((prev) => ({
      ...prev,
      focus: e.target.name,
    }));
  };

  const handleInputBlur = () => {
    setCardData((prev) => ({
      ...prev,
      focus: "",
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    setCardData((prev) => ({
      ...prev,
      number: value,
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.replace(/^(\d{2})(\d{1,2})/, "$1/$2");
    setCardData((prev) => ({
      ...prev,
      expiry: value,
    }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    setCardData((prev) => ({
      ...prev,
      cvv: value,
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");
    value = value.slice(0, 22);
    setCardData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await axios.post("/api/cards", {
        ...cardData,
        expiry: cardData.expiry
          .split("")
          .map((char: string) => (char !== "/" ? char : "/20"))
          .join(""),
      });

      location.href = "/payment-methods";
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la tarjeta");
    }
  };

  return (
    <div className="px-5 pb-5 md:p-20">
      <ToastContainer />
      <Card className="flex flex-col gap-6 p-6! shadow-lg bg-white">
        <div
          className="relative w-full max-w-sm mx-auto mb-6 card-flip"
          style={{ height: "176px" }}
        >
          <div
            className={`card-flip-inner relative w-full h-full ${
              cardData.focus === "cvv" ? "rotate-y-180" : ""
            }`}
            style={{
              transform:
                cardData.focus === "cvv" ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side */}
            <div className="card-flip-front rounded-xl bg-gradient-to-tr from-brand-green to-brand-gray via-brand-black text-white shadow-lg p-6 h-44 flex flex-col justify-between">
              <div className="flex justify-between items-center gap-1">
                <span className="text-base sm:text-lg font-semibold tracking-widest block max-w-[190px] sm:max-w-[220px]">
                  {cardData.number
                    ? formatCardNumber(cardData.number)
                    : "•••• •••• •••• ••••"}
                </span>
                {getCreditCardIssuer(cardData.number) === "VISA" && (
                  <VisaLogo className="h-12 w-12" />
                )}
                {getCreditCardIssuer(cardData.number) === "MASTERCARD" && (
                  <MasterCardLogo className="h-12 w-12" />
                )}
                {getCreditCardIssuer(cardData.number) === "AMEX" && (
                  <AmexLogo className="h-12 w-12" />
                )}
                {getCreditCardIssuer(cardData.number) === "DISCOVER" && (
                  <DiscoverLogo className="h-12 w-12" />
                )}
                {!getCreditCardIssuer(cardData.number) && (
                  <DefaultCreditCardLogo className="h-12 w-12" stroke="white" />
                )}
              </div>
              <div>
                <div className="flex justify-between items-end mt-4 gap-x-6">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase opacity-70">Nombre</div>
                    <div className="font-semibold tracking-wide">
                      {cardData.name.toUpperCase() || "NOMBRE Y APELLIDO"}
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0 w-16">
                    <div className="text-xs uppercase opacity-70">Vence</div>
                    <div className="font-semibold tracking-wide">
                      {cardData.expiry || "MM/AA"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="card-flip-back rounded-xl bg-gradient-to-tl from-brand-green to-brand-gray via-brand-black text-white shadow-lg p-6 h-44 flex flex-col justify-end">
              <div className="bg-black h-8 w-full mb-4 rounded"></div>
              <div className="flex flex-col items-end">
                <div className="text-xs uppercase opacity-70 mb-1">CVV</div>
                <div className="bg-white text-black px-4 py-1 rounded font-mono tracking-widest text-lg">
                  {cardData.cvv || "•••"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="number"
            placeholder="Número de tarjeta*"
            className="ring-transparent shadow-lg grow"
            value={cardData.number}
            onChange={handleNumberChange}
            onFocus={handleInputFocus}
            maxLength={19}
            autoComplete="cc-number"
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre y apellido*"
            className="ring-transparent shadow-lg grow"
            value={cardData.name}
            onChange={handleNameChange}
            onFocus={handleInputFocus}
            autoComplete="cc-name"
          />
          <input
            type="text"
            name="expiry"
            placeholder="Fecha de vencimiento* (MM/AA)"
            className="ring-transparent shadow-lg grow"
            value={cardData.expiry}
            onChange={handleExpiryChange}
            onFocus={handleInputFocus}
            maxLength={5}
            autoComplete="cc-exp"
          />
          <input
            type="text"
            name="cvv"
            placeholder="Código de seguridad*"
            className="ring-transparent shadow-lg grow"
            value={cardData.cvv}
            onChange={handleCvvChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            maxLength={4}
            autoComplete="cc-csc"
          />
          <button className="btn btn-primary mt-4" onClick={handleSubmit}>
            Continuar
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreditCardForm;
