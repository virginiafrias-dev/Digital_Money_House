import CheckVerde from "@/public/icons/check-verde";
import Link from "next/link";
import React from "react";

const SignupSuccessPage = () => {
  return (
    <div className="flex flex-col items-center gap-5 my-[50%] px-10">
      <p className="text-[34px] font-semibold">Registro Exitoso</p>
      <CheckVerde className="h-[98px] w-[95px]" />
      <p className="text-center">
        Hemos enviado un correo de confirmación para validar tu email, por favor
        revisalo para iniciar sesión.
      </p>
      <Link href={"/login"} className="btn btn-primary self-stretch">
        Continuar
      </Link>
    </div>
  );
};

export default SignupSuccessPage;
