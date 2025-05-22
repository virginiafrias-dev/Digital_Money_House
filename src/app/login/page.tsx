"use client";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState<"one" | "two">("one");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectInfo, setIncorrectInfo] = useState(false);

  const router = useRouter();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({ email, password });
    try {
      if (incorrectInfo) setIncorrectInfo(false);
      const response = await axios.post(`/api/login`, { email, password });
      console.log(response.data);
      location.href = "/home";
    } catch (error) {
      console.error(error);
      setEmail("");
      setPassword("");
      setSteps("one");
      setIncorrectInfo(true);
    }
    setIsLoading(false);
  };

  return (
    <form>
      {steps === "one" ? (
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="email">¡Hola! Ingresá tu e-mail</label>
          <input
            id="email"
            required
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <button
            className={clsx(!email && "cursor-not-allowed", "")}
            disabled={isLoading || !email}
            onClick={(e) => {
              e.preventDefault();
              if (!email) return;
              setSteps("two");
            }}
          >
            Continuar
          </button>
          <button type="button" onClick={() => router.push("/signup")}>
            Crear cuenta
          </button>
          {incorrectInfo && (
            <p className="text-red-500">
              Credenciales incorrectas. Vuelve a intentarlo
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="password">Ingresá tu contraseña</label>
          <input
            id="password"
            required
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <button onClick={handleLogin} disabled={isLoading}>
            Ingresar
          </button>
        </div>
      )}
    </form>
  );
};

export default page;
