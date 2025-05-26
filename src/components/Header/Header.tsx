"use client";
import { useAuth } from "@/hooks/useAuth";
import LogoNegro from "@/public/icons/logo-negro";
import LogoVerde from "@/public/icons/logo-verde";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import HamburgerMenuButton from "../HamburgerMenuButton/HamburgerMenuButton";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const pathName = usePathname();

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
      <Link href={isAuthenticated ? "/dashboard" : "/home"}>
        {isOnSignupOrLogin ? (
          <LogoNegro className="sm:w-16 sm:h-16 max-sm:h-15 max-sm:w-15" />
        ) : (
          <LogoVerde className="sm:w-16 sm:h-16 max-sm:h-15 max-sm:w-15" />
        )}
      </Link>

      {isOnSignupOrLogin ? (
        <AuthenticationNav pathName={pathName} />
      ) : (
        <DefaultNav isAuthenticated={isAuthenticated} pathName={pathName} />
      )}
    </header>
  );
};

interface AuthenticationNavProps {
  pathName: string;
}

const AuthenticationNav = ({ pathName }: AuthenticationNavProps) =>
  pathName === "/signup" ? (
    <Link
      data-testid="login-button-on-signup"
      className="btn btn-header btn-tertiary"
      href={"/login"}
    >
      Iniciar sesión
    </Link>
  ) : null;

interface LandingPageNavProps {
  isAuthenticated: boolean;
}

const LandingPageNav = ({ isAuthenticated }: LandingPageNavProps) => (
  <>
    <Link
      data-testid="logout-button"
      className="btn btn-header btn-secondary"
      href={isAuthenticated ? "/logout" : "/login"}
    >
      {isAuthenticated ? "Cerrar sesión" : "Ingresar"}
    </Link>
    <Link
      data-testid="signup-button"
      className="btn btn-header btn-primary"
      href={"/signup"}
    >
      Crear cuenta
    </Link>
  </>
);

interface DefaultNavProps {
  isAuthenticated: boolean;
  pathName: string;
}

const DefaultNav = ({ isAuthenticated, pathName }: DefaultNavProps) => (
  <nav className="flex gap-5 py-2">
    {pathName === "/" || pathName === "/home" ? (
      <LandingPageNav isAuthenticated={isAuthenticated} />
    ) : (
      <>
        <Link
          href={"/profile"}
          className="w-10 h-8 bg-brand-green text-brand-black font-bold grid place-items-center rounded-lg"
        >
          MB
        </Link>
        <form action="/logout" className="grid place-items-center">
          <HamburgerMenuButton />
        </form>
      </>
    )}
  </nav>
);

export default Header;
