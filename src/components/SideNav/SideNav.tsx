"use client";
import Close from "@/public/icons/Close";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LINKS = [
  {
    path: "/dashboard",
    label: "Inicio",
  },
  {
    path: "/activity",
    label: "Actividad",
  },
  {
    path: "/profile",
    label: "Tu perfil",
  },
  {
    path: "/add-money",
    label: "Cargar dinero",
  },
  {
    path: "/services",
    label: "Pagar servicios",
  },
  {
    path: "/payment-methods",
    label: "Tarjetas",
  },
  {
    path: "/logout",
    label: "Cerrar sesión",
  },
];

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
    <nav className="max-xl:w-[221px] xl:w-[300px] bg-brand-green flex flex-col gap-4 p-10 max-md:hidden">
      {LINKS.map((link) => (
        <Link
          key={link.path + "Desktop"}
          className={clsx("sidenav-link", path === link.path && "active")}
          href={link.path}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export const SideNavMobile = ({
  isMenuOpen,
  setIsMenuOpen,
  name = "Juan Perez",
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  name: string;
}) => {
  const pathName = usePathname();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathName);
  }, [pathName]);

  return (
    <div className="md:hidden">
      {isMenuOpen && (
        <div
          className="bg-brand-gray/50 fixed inset-0 z-[80] backdrop-blur-xs transform transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        className={clsx(
          "bg-brand-green fixed w-[220px] right-0 top-0 bottom-0 z-[90] transition-all duration-400 flex flex-col",
          isMenuOpen ? "translate-x-0" : "translate-x-[100%] "
        )}
      >
        <div className="h-[120px] bg-brand-gray flex flex-col p-5 px-5 gap-4">
          <button onClick={() => setIsMenuOpen(false)} className="self-end">
            <Close />
          </button>
          <div className="self-start px-3">
            <p className="text-brand-green  font-bold">
              Hola, <br />
              {name}
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-4 px-10 py-5">
          {LINKS.map((link) => (
            <Link
              key={link.path + "Desktop"}
              onClick={() => setIsMenuOpen(false)}
              className={clsx("sidenav-link", path === link.path && "active")}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
