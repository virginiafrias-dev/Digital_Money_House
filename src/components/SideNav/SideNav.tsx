"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideNav = () => {
  const pathName = usePathname();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);

  if (
    pathName === "/" ||
    pathName === "/home" ||
    pathName === "/signup" ||
    pathName === "/signup/success" ||
    pathName === "/login"
  ) {
    return null;
  }

  return (
    <nav className="max-xl:w-[25%] xl:w-[300px] bg-brand-green flex flex-col gap-4 p-10 max-md:hidden">
      <Link
        className={clsx("sidenav-link", path === "/dashboard" && "active")}
        href="/dashboard"
      >
        Inicio
      </Link>
      <Link
        className={clsx("sidenav-link", path === "/activity" && "active")}
        href="/activity"
      >
        Actividad
      </Link>
      <Link
        className={clsx("sidenav-link", path === "/profile" && "active")}
        href="/profile"
      >
        Tu perfil
      </Link>
      <Link
        className={clsx("sidenav-link", path === "/transactions" && "active")}
        href="/transactions"
      >
        Cargar dinero
      </Link>
      <Link
        className={clsx("sidenav-link", path === "/services" && "active")}
        href="/services"
      >
        Pagar servicios
      </Link>
      <Link
        className={clsx(
          "sidenav-link",
          path === "/payment-methods" && "active"
        )}
        href="/payment-methods"
      >
        Tarjetas
      </Link>
      <Link
        className={clsx("sidenav-link", path === "/logout" && "active")}
        href="/logout"
      >
        Cerrar sesión
      </Link>
    </nav>
  );
};

export default SideNav;
