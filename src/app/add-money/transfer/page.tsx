import { getUserData } from "@/app/actions/loginActions";
import { BankingInfo } from "@/components/BankingInfo";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

export const dynamic = "force-dynamic";

const AddMoneyByTransferPage = async () => {
  const personalInfo = await getUserData();

  return (
    <div className="absolute inset-0">
      <PageTitle text="Cargar dinero" />
      <div className="flex flex-col gap-5 px-5 md:p-20">
        <BankingInfo cvu={personalInfo.cvu} alias={personalInfo.alias} />
      </div>
    </div>
  );
};

export default AddMoneyByTransferPage;
