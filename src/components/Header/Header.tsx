"use client";
import React, { useEffect, useMemo, useState } from "react";
import LogoNegro from "@/public/icons/logo-negro";
import LogoVerde from "@/public/icons/logo-verde";
import { getToken } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <Link
              data-testid="login-button-on-signup"
              className="btn btn-header btn-tertiary"
              href={"/login"}
            >
              Iniciar sesión
            </Link>
          ) : null}
        </>
      ) : (
        <nav className="flex gap-5 py-2">
          {token ? (
            <Link
              data-testid="logout-button"
              className="btn btn-header btn-secondary"
              href={"/logout"}
            >
              Cerrar sesión
            </Link>
          ) : (
            <Link
              data-testid="login-button-on-home"
              className="btn btn-header btn-secondary"
              href={"/login"}
            >
              Ingresar
            </Link>
          )}
          <Link
            data-testid="signup-button"
            className="btn btn-header btn-primary"
            href={"/signup"}
          >
            Crear cuenta
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
