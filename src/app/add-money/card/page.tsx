import Card from "@/components/Card/Card";
import { DividerLine } from "@/components/DividerLine";
import PageTitle from "@/components/PageTitle/PageTitle";
import CircleItemSelected from "@/public/icons/CircleItemSelected";
import CircleItemUnselected from "@/public/icons/CircleItemUnselected";
import Plus from "@/public/icons/plus";
import Link from "next/link";

const AddMoneyByCardPage = () => {
  return (
    <div className="absolute inset-0">
      <PageTitle text="Cargar dinero" />

      {/* STEP 1 */}
      <div className="flex flex-col gap-5 px-5 pb-5 md:p-20">
        <Card style="black" className="flex flex-col gap-6 p-6!">
          <p className="font-bold text-xl text-brand-green">
            Seleccionar tarjeta
          </p>

          <ActivityCard />

          <Link href="/payment-methods/new" className="flex items-center gap-2">
            <Plus />
            <p className="font-bold text-brand-green">Nueva tarjeta</p>
          </Link>
        </Card>

        {/* STEP 2 */}
        <Card style="black" className="flex flex-col gap-6 p-6!">
          <p className="font-bold text-xl text-brand-green">
            ¿Cuánto querés ingresar a la cuenta?
          </p>
          <input type="text" placeholder="$0" />
        </Card>

        {/* Confirm button */}
        <button className="btn btn-primary shadow-lg self-end px-10!">
          <p>Continuar</p>
        </button>
      </div>
    </div>
  );
};

const ActivityCardItem = ({ selected }: { selected: boolean }) => (
  <div className="flex flex-col gap-6">
    <DividerLine />
    <div className="flex gap-3 items-center pb-6">
      <div className="bg-brand-green rounded-full w-6 h-6" />
      <p className="text-sm grow">Terminada en 4067</p>
      <button>
        {selected ? <CircleItemSelected /> : <CircleItemUnselected />}
      </button>
    </div>
  </div>
);

const ActivityCard = () => (
  <Card className="bg-white flex flex-col p-6! shadow-lg">
    <p className="font-bold mb-4">Tus tarjetas</p>

    <ActivityCardItem selected={true} />
    <ActivityCardItem selected={false} />
  </Card>
);

export default AddMoneyByCardPage;
