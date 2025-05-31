import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import { ActivityCardItem } from "@/components/Services/ActivityCardItem";
import LookingGlass from "@/public/icons/looking-glass";

const SERVICES = [
  {
    id: 1,
    name: "Netflix",
    amount: 1000,
  },
  {
    id: 2,
    name: "Amazon Prime Video",
    amount: 1000,
  },
  {
    id: 3,
    name: "Hbo Max",
    amount: 1000,
  },
  {
    id: 5,
    name: "Paramount+",
    amount: 1000,
  },
];

const ServicesPage = () => {
  return (
    <div className="inset-0 absolute">
      <PageTitle text="Pagar servicios" />

      <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
        {/* Search input */}
        <div className="relative flex">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LookingGlass />
          </div>
          <input
            type="text"
            placeholder="Buscá entre más de 5.000 empresas"
            className="ring-transparent shadow-lg grow pl-10! py-5! md:text-lg"
          />
        </div>

        {/* Services list */}
        <ActivityCard />
      </div>
    </div>
  );
};

const ActivityCard = () => (
  <Card className="bg-white flex flex-col p-6! shadow-lg">
    <p className="font-bold mb-4">Más recientes</p>

    {SERVICES.map(({ id, name, amount }) => (
      <ActivityCardItem key={id} id={id} name={name} amount={amount} />
    ))}
  </Card>
);

export default ServicesPage;
