"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    identification: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("La contraseña es obligatoria")
      .min(6, "Debe tener al menos 6 caracteres")
      .max(20, "No debe superar los 20 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .matches(/[0-9]/, "Debe contener al menos un número")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un carácter especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
      .required("Debes confirmar la contraseña"),
    phone: yup.number().positive().integer().required(),
  })
  .required();

const page = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
      <h1 className="mb-4">Crear Cuenta</h1>
      <input type="text" {...register("firstName")} placeholder="Nombre*" />
      <input type="text" {...register("lastName")} placeholder="Apellido*" />
      <input type="number" {...register("identification")} placeholder="DNI*" />
      <p>{errors.identification?.message && "asd"}</p>
      <input
        type="email"
        {...register("email")}
        placeholder="Correo Electrónico*"
      />

      <p className="mb-4">
        Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter
        especial, una mayúscula y un número).
      </p>
      <input
        {...register("password")}
        type="password"
        placeholder="Contraseña*"
      />
      <p>{errors.password?.message}</p>

      {/* <label htmlFor="confirmPassword">Confirmar Contraseña</label> */}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirmar Contraseña*"
      />
      {/* <label htmlFor="phone">Teléfono</label> */}
      <input type="tel" {...register("phone")} placeholder="Teléfono*" />
      <button onClick={onSubmit} className="w-80">
        Crear Cuenta
      </button>
    </form>
  );
};

export default page;
