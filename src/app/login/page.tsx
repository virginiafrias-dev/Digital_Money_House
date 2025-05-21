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

  const handleLogin = async () => {
    setIsLoading(true);
    console.log({ email, password });
    try {
      if (incorrectInfo) setIncorrectInfo(false);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        { email, password }
      );
      console.log(response.data);
      router.push("/home");
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
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <button
            className={clsx(!email && "cursor-not-allowed", "")}
            disabled={isLoading || !email}
            onClick={() => {
              if (!email) return;
              setSteps("two");
            }}
          >
            Continuar
          </button>
          <button onClick={() => router.push("/signup")}>Crear cuenta</button>
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
