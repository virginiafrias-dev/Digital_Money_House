import CircleItemSelected from "@/public/icons/CircleItemSelected";
import CircleItemUnselected from "@/public/icons/CircleItemUnselected";
import { CreditCard } from "@/types/types";
import Card from "../Card/Card";
import { DividerLine } from "../DividerLine";
import Spinner from "../Spinner";

const CreditCardItem = ({
  selected,
  card,
  setSelectedCreditCard,
}: {
  selected: boolean;
  card: CreditCard;
  setSelectedCreditCard: (card: CreditCard) => void;
}) => (
  <div className="flex flex-col gap-6">
    <DividerLine />
    <button
      className="flex gap-3 items-center pb-6"
      onClick={() => setSelectedCreditCard(card)}
    >
      <div className="bg-brand-green rounded-full w-6 h-6" />
      <p className="text-sm grow text-left">
        Terminada en {String(card.number_id).slice(-4)}
      </p>
      <span>
        {selected ? <CircleItemSelected /> : <CircleItemUnselected />}
      </span>
    </button>
  </div>
);

interface CreditCardsProps {
  creditCards: CreditCard[];
  selectedCreditCard: CreditCard;
  setSelectedCreditCard: (card: CreditCard) => void;
  creditCardsLoading: boolean;
}

const CreditCards = ({
  creditCards,
  selectedCreditCard,
  setSelectedCreditCard,
  creditCardsLoading,
}: CreditCardsProps) => {
  // const {
  //   creditCards,
  //   selectedCreditCard,
  //   setSelectedCreditCard,
  //   creditCardsLoading,
  // } = useCreditCards();

  return (
    <Card className="bg-white flex flex-col p-6! shadow-lg relative">
      {creditCardsLoading ? (
        <div className="h-20 relative grid place-items-center grow">
          <div className="relative">
            <Spinner bg="white" />
          </div>
        </div>
      ) : (
        <>
          <p className="font-bold mb-4">Tus tarjetas</p>

          {!!creditCards.length ? (
            creditCards.map((card) => (
              <CreditCardItem
                key={card.id}
                selected={card.id === selectedCreditCard.id}
                card={card}
                setSelectedCreditCard={setSelectedCreditCard}
              />
            ))
          ) : (
            <p>No tenés tarjetas asociadas</p>
          )}
        </>
      )}
    </Card>
  );
};

export default CreditCards;
