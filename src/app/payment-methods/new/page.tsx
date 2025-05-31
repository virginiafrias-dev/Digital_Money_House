import CreditCardForm from "@/components/CreditCardForm";
import PageTitle from "@/components/PageTitle/PageTitle";

export const dynamic = "force-dynamic";

const NewPaymentMethodPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Nueva tarjeta" />
      <CreditCardForm />
    </div>
  );
};

export default NewPaymentMethodPage;
