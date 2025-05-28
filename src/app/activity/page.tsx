import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import Filter from "@/public/icons/Filter";
import LookingGlass from "@/public/icons/looking-glass";

const ActivityPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Tu actividad" />
      <div className="flex flex-col gap-5 px-5">
        {/* Search input */}
        <div className="relative flex">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <LookingGlass />
          </div>
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="ring-transparent shadow-lg grow pl-10! py-5! md:text-lg"
          />
        </div>

        {/* Activity card */}
        <ActivityCard />
      </div>
    </div>
  );
};

const ActivityCardItem = () => (
  <div className="flex gap-3 items-center">
    <div className="bg-brand-green rounded-full w-6 h-6" />
    <p className="text-sm md:text-base grow">Transferiste a Rodrigo</p>
    <div className="flex flex-col justify-evenly items-end">
      <p className="text-sm md:text-base text-brand-gray">-$ 1265,57</p>
      <p className="text-xs md:text-sm text-black/50">Sábado</p>
    </div>
  </div>
);

const ActivityCard = () => (
  <Card className="bg-white flex flex-col gap-5 p-6! shadow-lg">
    <div className="flex justify-between items-center">
      <p className="font-bold mb-1">Tu actividad</p>
      <button className="flex items-center gap-3">
        <p className="font-semibold underline">Filtrar</p>
        <Filter />
      </button>
    </div>

    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />
    <ActivityCardItem />
    <div className="h-px bg-brand-white" />

    <div className="flex items-center justify-center gap-2 pt-2">
      <button className="w-8 h-8 font-bold rounded-lg bg-brand-white">
        <p>1</p>
      </button>
      <button className="w-8 h-8 font-bold rounded-lg">
        <p>2</p>
      </button>
      <button className="w-8 h-8 font-bold rounded-lg">
        <p>3</p>
      </button>
    </div>
  </Card>
);

export default ActivityPage;
