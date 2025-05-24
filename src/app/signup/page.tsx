"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import clsx from "clsx";

const schema = yup
  .object({
    firstName: yup.string().required("Campo obligatorio"),
    lastName: yup.string().required("Campo obligatorio"),
    identification: yup
      .string()
      .required("Campo obligatorio")
      .matches(/^\d+$/, "Debe contener solo números")
      .min(7, "Debe tener al menos 7 dígitos"),

    email: yup
      .string()
      .email("Introduce un email válido")
      .required("Campo obligatorio"),
    password: yup
      .string()
      .required("Campo obligatorio")
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
    phone: yup
      .string()
      .required("Campo obligatorio")
      .matches(
        /^(\+?\d[\d\s-]{6,19})$/,
        "Número inválido. Puede incluir +, espacios o guiones, y debe tener entre 7 y 20 caracteres"
      ),
  })
  .required();

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (
        !data.firstName ||
        !data.lastName ||
        !data.identification ||
        !data.email ||
        !data.password ||
        !data.phone
      ) {
        return console.error("Falta algún dato");
      }

      await axios.post("/api/signup", {
        firstname: data.firstName,
        lastname: data.lastName,
        dni: Number(data.identification),
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      router.push("/signup/success");
    } catch (error) {
      throw error;
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 mx-10">
      <h1 className="text-xl font-bold text-center mt-10 mb-2">Crear Cuenta</h1>
      <input
        className={clsx(errors.firstName && "input-error")}
        type="text"
        {...register("firstName")}
        placeholder="Nombre*"
      />
      <p className="error-p">{errors.firstName?.message}</p>
      <input
        className={clsx(errors.lastName && "input-error")}
        type="text"
        {...register("lastName")}
        placeholder="Apellido*"
      />
      <p className="error-p">{errors.lastName?.message}</p>
      <input
        className={clsx(errors.identification && "input-error")}
        type="number"
        {...register("identification")}
        placeholder="DNI*"
      />

      <p className="error-p">{errors.identification?.message}</p>

      <input
        className={clsx(errors.email && "input-error")}
        type="email"
        {...register("email")}
        placeholder="Correo electrónico*"
      />
      <p className="error-p">{errors.email?.message}</p>
      <p className="text-justify text-[12px]">
        Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter
        especial, una mayúscula y un número).
      </p>
      <input
        className={clsx(errors.password && "input-error")}
        {...register("password")}
        type="password"
        placeholder="Contraseña*"
      />
      <p className="error-p">{errors.password?.message}</p>
      <input
        className={clsx(errors.confirmPassword && "input-error")}
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirmar contraseña*"
      />

      <p className="error-p">{errors.confirmPassword?.message}</p>

      <input
        className={clsx(errors.phone && "input-error")}
        type="tel"
        {...register("phone")}
        placeholder="Teléfono*"
      />
      <p className="error-p">{errors.phone?.message}</p>

      <button className="mt-4 btn btn-primary">Crear Cuenta</button>
    </form>
  );
};

export default page;
