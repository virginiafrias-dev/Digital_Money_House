"use client";
import BGImage from "@/public/img/home-hero-img.png";
import Card from "../Card";

const cardsInfo: { title: string; description: string }[] = [
  {
    title: "Transferí dinero",
    description:
      "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual.",
  },
  {
    title: "Pago de servicios",
    description:
      "Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel.",
  },
];

const LandingPage = () => {
  return (
    <div
      className="flex min-h-full flex-col gap-5 justify-between"
      style={{
        backgroundImage: `url(${BGImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <div className="px-5 py-10 flex flex-col gap-6">
        <p className="text-[27px] leading-[32px] font-semibold">
          De ahora
          <br />
          en adelante,
          <br />
          hacés más
          <br />
          con tu dinero
        </p>
        <div className="bg-brand-green w-[25px] h-1"></div>
        <p className="text-xl text-brand-green">
          Tu nueva
          <br />
          <span className="font-bold">billetera virtual</span>
        </p>
      </div>
      <div className="h-25"></div>
      <div className="flex flex-col relative">
        <div className="absolute bg-brand-green rounded-t-xl top-10 bottom-0 left-0 right-0"></div>
        <div className="px-5 z-[100] flex flex-col gap-5 pb-5">
          {cardsInfo.map((card) => (
            <LandingPageCard
              title={card.title}
              description={card.description}
              key={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface LandingPageCardProps {
  title: string;
  description: string;
}

const LandingPageCard = ({ title, description }: LandingPageCardProps) => {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-[28px]">{title}</p>
        <div className="h-0.5 bg-brand-green"></div>
        <p>{description}</p>
      </div>
    </Card>
  );
};

export default LandingPage;
