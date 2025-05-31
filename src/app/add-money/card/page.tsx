import CreditCardsSection from "@/components/AddMoney/CreditCardsSection";
import PageTitle from "@/components/PageTitle/PageTitle";

export const dynamic = "force-dynamic";

const AddMoneyByCardPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Cargar dinero" />
      <CreditCardsSection />
    </div>
  );
};

export default AddMoneyByCardPage;
