import CheckVerde from "@/public/icons/check-verde";
import { getServerAuthStatus } from "@/utils/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignupSuccessPage = async () => {
  if (await getServerAuthStatus()) redirect("/dashboard");

  return (
    <div className="absolute inset-0 grid place-items-center bg-brand-black">
      <div className="flex flex-col items-center gap-5 my-[50%] md:my-[20vh] px-10 text-white">
        <p className="text-[34px] md:text-[64px] font-semibold">
          Registro Exitoso
        </p>
        <CheckVerde className="h-[98px] w-[95px]" />
        <p className="text-center md:w-[500px] md:mt-4 md:mb-10">
          Hemos enviado un correo de confirmación para validar tu email, por
          favor revisalo para iniciar sesión.
        </p>
        <Link
          href={"/login"}
          className="btn btn-primary self-stretch md:w-[360px] md:self-center md:py-4!"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
};

export default SignupSuccessPage;
