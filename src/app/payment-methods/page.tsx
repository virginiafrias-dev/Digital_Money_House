import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import ActivityCardItem from "@/components/PaymentMethods/ActivityCardItem";
import ArrowRight from "@/public/icons/arrow-right";
import Plus from "@/public/icons/plus";
import Link from "next/link";
import { getCards } from "../actions/cardsActions";
import { DividerLine } from "@/components/DividerLine";

export const dynamic = "force-dynamic";

const PaymentMethodsPage = async () => {
  const cards = await getCards();
  console.log(cards);

  return (
    <div className="absolute inset-0">
      <PageTitle text="Tarjetas" />

      <div className="px-5 flex flex-col gap-5 pb-5 md:p-20">
        {/* New cards link */}
        <Link href={"/payment-methods/new"}>
          <Card
            style="black"
            className="flex flex-col gap-6 shadow-lg py-4 px-6"
          >
            <p className="font-bold">Agregá tu tarjeta de débito o crédito</p>
            <div className="flex justify-between items-center pb-8">
              <div className="flex items-center gap-4">
                <Plus />
                <p className="font-bold text-brand-green">Nueva tarjeta</p>
              </div>
              <ArrowRight fill="#c1fd35" />
            </div>
          </Card>
        </Link>

        {/* Cards */}
        <ActivityCard cards={cards} />
      </div>
    </div>
  );
};

interface Card {
  id: number;
  account_id: number;
  number_id: number;
  first_last_name: string;
  cod: number;
  expiration_date: string;
}

const ActivityCard = ({ cards }: { cards: Card[] }) => (
  <Card className="bg-white flex flex-col p-6! shadow-lg">
    <p className="font-bold mb-4">Tus tarjetas</p>

    {!!cards.length ? (
      cards.map((card) => (
        <ActivityCardItem
          key={card.id}
          cardInfo={{ id: card.id, number_id: card.number_id }}
        />
      ))
    ) : (
      <div className="flex flex-col gap-6">
        <DividerLine />
        <div className="flex gap-3 items-center pb-6">
          <p className="text-sm grow">No tenés tarjetas asociadas</p>
        </div>
      </div>
    )}
  </Card>
);

export default PaymentMethodsPage;
