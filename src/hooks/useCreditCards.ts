import { CreditCard } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useCreditCards = () => {
  const [creditCardsLoading, setCreditCardsLoading] = useState(false);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCreditCard, setSelectedCreditCard] = useState<CreditCard>(
    {} as CreditCard
  );
  const getCreditCards = async () => {
    try {
      setCreditCardsLoading(true);
      const response = await axios.get("/api/cards");
      setCreditCards(response.data);
      if (!!response.data.length) setSelectedCreditCard(response.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setCreditCardsLoading(false);
    }
  };

  useEffect(() => {
    getCreditCards();
  }, []);

  return {
    creditCards,
    selectedCreditCard,
    setSelectedCreditCard,
    creditCardsLoading,
  };
};

export default useCreditCards;
