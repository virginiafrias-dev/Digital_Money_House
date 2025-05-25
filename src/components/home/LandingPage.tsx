"use client";

import Card from "../Card";
import clsx from "clsx";

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
      className={clsx(
        `flex min-h-full flex-col gap-5 justify-between bg-cover max-md:bg-center lg:bg-center absolute bottom-0 left-0 right-0 top-0`,
        "bg-[url(@/public/img/landing-image-mobile.png)]",
        "md:bg-[url(@/public/img/landing-image-tablet.png)]",
        "lg:bg-[url(@/public/img/landing-image-desktop.png)]"
      )}
    >
      <div className="px-5 md:px-13 py-10 md:py-20 flex flex-col gap-6">
        <p className="text-[27px] leading-[32px] font-semibold md:hidden">
          De ahora <br />
          en adelante, <br />
          hacés más <br />
          con tu dinero
        </p>
        <p className="text-5xl leading-[50px] max-md:hidden">
          De ahora en <br />
          adelante, hacés <br />
          más con tu dinero
        </p>
        <div className="bg-brand-green w-[25px] h-1 md:hidden"></div>
        <p className="text-xl md:text-[34px] md:leading-[50px] text-brand-green">
          Tu nueva <br className="md:hidden" />
          <span className="font-bold">billetera virtual</span>
        </p>
      </div>

      {/* <div className="h-25 md:h-35"></div> */}

      {/* <div className="absolute bottom-0 left-0 right-0 max-h-[500px]"> */}
      <div className="flex flex-col relative">
        <div className="absolute bg-brand-green rounded-t-xl md:rounded-t-[48px] top-10 md:top-20 -bottom-0.5 left-0 right-0"></div>
        <div className="px-5 z-[100] flex flex-col gap-5 pb-5 md:pb-15 md:items-center lg:flex-row lg:items-stretch mx-auto">
          {cardsInfo.map((card) => (
            <LandingPageCard
              title={card.title}
              description={card.description}
              key={card.title}
            />
          ))}
          {/* </div> */}
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
    <Card className="md:p-6 md:w-[597px] lg:w-[500px] shadow">
      <div className="flex flex-col">
        <p className="font-bold text-[28px] md:text-[40px] mb-2 md:mb-1">
          {title}
        </p>
        <div className="h-0.5 bg-brand-green/99 mb-2 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-brand-black/7"></div>
        </div>
        <p className="md:text-xl">{description}</p>
      </div>
    </Card>
  );
};

export default LandingPage;
