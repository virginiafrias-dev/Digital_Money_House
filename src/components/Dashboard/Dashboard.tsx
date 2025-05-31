import LookingGlass from "@/public/icons/looking-glass";
import Link from "next/link";
import Card from "../Card/Card";
import PageTitle from "../PageTitle/PageTitle";
import ActivityCardDashboard from "./ActivityCardDashboard";
import InfoBanner from "./InfoBanner";
import { getUserData } from "@/app/actions/loginActions";
import { getActivity } from "@/app/actions/activityActions";

const Dashboard = async () => {
  const info = await getUserData();

  const activity = await getActivity();

  return (
    <div className="absolute inset-0">
      <PageTitle text="Inicio" />

      <div className="px-5 flex flex-col gap-5 pb-5 md:p-20">
        {/* Black CC */}
        <InfoBanner moneyAvailable={info.available_amount} />

        {/* Green links */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <Link href={"/add-money"} className="lg:grow">
            <Card
              style="green"
              className="grid place-items-center shadow-lg py-[22px] lg:py-10"
            >
              <p className="font-bold md:text-2xl text-brand-black">
                Ingresar dinero
              </p>
            </Card>
          </Link>

          <Link href={"/services"} className="lg:grow">
            <Card
              style="green"
              className="grid place-items-center shadow-lg py-[22px] lg:py-10"
            >
              <p className="font-bold md:text-2xl text-brand-black">
                Pago de servicios
              </p>
            </Card>
          </Link>
        </div>

        <ActivityCardDashboard activity={activity} />
      </div>
    </div>
  );
};

export default Dashboard;
