"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaEmail = yup.object({
  email: yup
    .string()
    .email("Introduce un email válido")
    .required("Campo obligatorio"),
});

const schemaPassword = yup.object({
  password: yup.string().required("Campo obligatorio"),
});

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState<"one" | "two">("one");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
    getValues: getValuesEmail,
    reset: resetEmail,
  } = useForm({ resolver: yupResolver(schemaEmail) });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({ resolver: yupResolver(schemaPassword) });

  const onSubmitEmail = handleSubmitEmail(async () => {
    setSteps("two");
    setIncorrectCredentials(false);
  });

  const onSubmitPassword = handleSubmitPassword(async (data) => {
    setIsLoading(true);

    const email = getValuesEmail("email");
    const password = data.password;

    console.log({ email, password });

    try {
      const response = await axios.post(`/api/login`, { email, password });
      console.log(response.data);
      location.href = "/home";
    } catch (error) {
      console.error(error);
      setSteps("one");
      resetEmail();
      resetPassword();
      setIncorrectCredentials(true);
    }
    setIsLoading(false);
  });

  return (
    <div className="my-[50%] px-10 md:mx-[30%] md:max-w-[500px]">
      {/* STEP 1 */}
      {steps === "one" && (
        <form onSubmit={onSubmitEmail} className="flex flex-col gap-4">
          <label htmlFor="email" className="font-bold text-xl text-center">
            ¡Hola! Ingresá tu e-mail
          </label>
          <input
            id="email"
            placeholder="Correo electrónico"
            className={clsx(errorsEmail.email && "input-error")}
            {...registerEmail("email")}
          />
          <button className="btn btn-primary">Continuar</button>
          <Link className="btn btn-primary" href={"/signup"}>
            Crear cuenta
          </Link>
          {errorsEmail.email && (
            <p className="error-p">{errorsEmail.email?.message}</p>
          )}
          {incorrectCredentials && (
            <p className="error-p">
              Credenciales incorrectas, intentá nuevamente
            </p>
          )}
        </form>
      )}

      {/* STEP 2 */}
      {steps === "two" && (
        <form onSubmit={onSubmitPassword} className="flex flex-col gap-4">
          <label htmlFor="password" className="font-bold text-xl text-center">
            Ingresá tu contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            {...registerPassword("password")}
            className={clsx(errorsPassword.password && "input-error")}
          />
          <button className="btn btn-primary" disabled={isLoading}>
            Ingresar
          </button>
          {errorsPassword.password && (
            <p className="error-p">{errorsPassword.password?.message}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default page;
