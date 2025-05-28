import { BankingInfo } from "@/app/profile/page";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

const AddMoneyByTransferPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Cargar dinero" />
      <div className="flex flex-col gap-5 px-5">
        <BankingInfo />
      </div>
    </div>
  );
};

export default AddMoneyByTransferPage;
