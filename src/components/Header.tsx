"use client";
import LogoNegro from "@/public/icons/logo-negro";
import LogoVerde from "@/public/icons/logo-verde";
import { getToken } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const Header = () => {
  const [token, setToken] = useState("");

  const pathName = usePathname();

  useEffect(() => {
    const readToken = async () => {
      const tokenResult = await getToken();
      setToken(tokenResult || "");
    };
    readToken();
  }, []);

  const isOnSignupOrLogin = useMemo(
    () =>
      pathName === "/login" ||
      pathName === "/signup" ||
      pathName === "/signup/success",
    [pathName]
  );

  return (
    <header
      className={clsx(
        "flex justify-between items-center h-16 px-5",
        isOnSignupOrLogin ? "bg-brand-green" : "bg-brand-black"
      )}
    >
      <Link href={"/home"}>
        {isOnSignupOrLogin ? (
          <LogoNegro className="sm:w-16 sm:h-16 max-sm:h-15 max-sm:w-15" />
        ) : (
          <LogoVerde className="sm:w-16 sm:h-16 max-sm:h-15 max-sm:w-15" />
        )}
      </Link>

      {isOnSignupOrLogin ? (
        <>
          {pathName === "/signup" ? (
            <Link className="btn btn-header btn-tertiary" href={"/login"}>
              Iniciar sesión
            </Link>
          ) : null}
        </>
      ) : (
        <nav className="flex gap-5 py-2">
          {token ? (
            <Link className="btn btn-header btn-secondary" href={"/logout"}>
              Cerrar sesión
            </Link>
          ) : (
            <Link className="btn btn-header btn-secondary" href={"/login"}>
              Ingresar
            </Link>
          )}
          <Link className="btn btn-header btn-primary" href={"/signup"}>
            Crear cuenta
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
