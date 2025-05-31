import { BankingInfo } from "@/components/BankingInfo";
import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import { PersonalInfo } from "@/components/Profile/PersonalInfo";
import ArrowRight from "@/public/icons/arrow-right";
import Link from "next/link";
import { getUserData } from "../actions/loginActions";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const personalInfo = await getUserData();
  console.log(personalInfo);

  const userData = {
    firstname: personalInfo.firstname,
    lastname: personalInfo.lastname,
    email: personalInfo.email,
    dni: String(personalInfo.dni),
    phone: personalInfo.phone,
    password: "******",
  };
  console.log(userData);

  return (
    <div className="absolute inset-0">
      <PageTitle text="Perfil" />

      <div className="px-5 md:p-20 flex flex-col gap-5 pb-5">
        {/* Personal info */}
        <PersonalInfo userData={userData} />

        {/* Link to payment methods */}
        <Link href={"/payment-methods"}>
          <Card
            style="green"
            className="flex justify-between items-center shadow-lg py-[22px]"
          >
            <p className="font-bold text-black">Gestioná los medios de pago</p>
            <ArrowRight />
          </Card>
        </Link>

        {/* Banking info */}
        <BankingInfo cvu={personalInfo.cvu} alias={personalInfo.alias} />
      </div>
    </div>
  );
};

export default ProfilePage;
