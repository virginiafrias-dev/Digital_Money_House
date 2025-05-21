"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 items-center mx-10"
    >
      <h1 className="mb-4">Crear Cuenta</h1>
      <input type="text" {...register("firstName")} placeholder="Nombre*" />
      <p className="error-p">{errors.firstName?.message}</p>
      <input type="text" {...register("lastName")} placeholder="Apellido*" />
      <p className="error-p">{errors.lastName?.message}</p>
      <input type="number" {...register("identification")} placeholder="DNI*" />
      <p className="error-p">{errors.identification?.message}</p>
      <input
        type="email"
        {...register("email")}
        placeholder="Correo Electrónico*"
      />
      <p className="error-p">{errors.email?.message}</p>
      <p className="mb-4 text-justify text-sm">
        Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter
        especial, una mayúscula y un número).
      </p>
      <input
        {...register("password")}
        type="password"
        placeholder="Contraseña*"
      />
      <p className="error-p">{errors.password?.message}</p>
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirmar Contraseña*"
      />
      <p className="error-p">{errors.confirmPassword?.message}</p>
      <input type="tel" {...register("phone")} placeholder="Teléfono*" />
      <p className="error-p">{errors.phone?.message}</p>

      <button onClick={onSubmit} className="w-80">
        Crear Cuenta
      </button>
    </form>
  );
};

export default page;
