import Card from "@/components/Card/Card";
import CreditCardForm from "@/components/CreditCardForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

const NewPaymentMethodPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Nueva tarjeta" />
      <CreditCardForm />
    </div>
  );
};

export default NewPaymentMethodPage;
