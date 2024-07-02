"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { validateLoginForm } from "@/helpers/formValidation";
import { LoginErrorProps, LoginProps } from "@/types";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import PasswordInput from "../PasswordImput";

const Login = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [errorUser, setErrorUser] = useState<LoginErrorProps>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Componente Login renderizado");
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      router.push("/page/patients");
    }
  }, [router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(dataUser);
    setErrorUser(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await login(dataUser);
        const { token, userData } = response;
        console.log(response);
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token: token, userData })
        );
        Swal.fire({
          title: "¡Excelente!",
          text: `${userData.first_name}, has iniciado sesión correctamente. `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
        router.push("/page/patients");
      } catch (error: any) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al iniciar sesión. Por favor, intente de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex w-full h-full max-h-[1024px]">
        <a href="/" className="absolute top-4 left-4 text-[#00CE90]">
          Volver
        </a>
        <div className="w-[35%] flex flex-col items-center bg-darkD-500 text-white p-8">
          <div className="flex flex-col items-start justify-start mb-8">
            <h2 className="text-[#ECEDF6] text-[34px] font-semibold leading-normal mb-4">
              Bienvenido a DentAll
            </h2>
            <p>Por favor ingresa tu correo electrónico y tu contraseña</p>
          </div>
          <div className="w-full max-w-[72%] flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  EMAIL
                </label>
                <input
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="mail@mail.com"
                  value={dataUser.email}
                  type="text"
                  id="email-address"
                  name="email"
                  required
                  onChange={handleChange}
                />
                {errorUser.email && (
                  <p className="text-red-500">{errorUser.email}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  CONTRASEÑA
                </label>
                <PasswordInput
                  id="password"
                  name="password"
                  value={dataUser.password}
                  onChange={handleChange}
                  required
                />
                {errorUser.password && (
                  <p className="text-red-500">{errorUser.password}</p>
                )}
              </div>
              <div className="w-full max-w-[100%] mt-2 flex justify-end">
                <a href="#" className="text-[#00CE90] font-mulish text-[15px]">
                  Olvidé mi contraseña
                </a>
              </div>
              <div className="w-full max-w-[80%] mt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
                >
                  <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                    Iniciar Sesión
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="w-full max-w-[80%] text-[#00CE90] mt-8 flex flex-col items-center space-y-4">
            <p>O inicia sesión con:</p>
            <div className="flex space-x-4">
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS1.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS2.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <Image
                  src="/images/RS3.svg"
                  alt="Register Image"
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <div className="w-full max-w-[80%] text-[#00CE90] mt-8 flex flex-row items-center justify-center gap-4">
            <p>No tienes cuenta?</p>
            <a href="/register">Regístrate</a>
          </div>
        </div>
        <div className="w-[65%] h-full relative">
          <Image
            className="hidden md:block"
            src="/images/imgLogin.png"
            alt="Login Image"
            layout="fill"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
