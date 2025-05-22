"use client";
import { getToken } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getToken() || "");
  }, []);

  return (
    <header className="flex justify-between items-center px-5 md:px-20 py-10">
      <h1 className="hidden md:block">Digital Money House</h1>
      <h1 className="md:hidden block">DMH</h1>
      <nav className="flex gap-2">
        <Link href={"/home"}>Home</Link>
        <Link href={"/signup"}>Registro</Link>
        {token ? (
          <Link href={"/logout"}>Cerrar sesión</Link>
        ) : (
          <Link href={"/login"}>Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
