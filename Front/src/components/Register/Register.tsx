"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { validateRegisterForm } from "@/helpers/formValidation";
import { RegisterErrorProps, RegisterProps } from "@/types";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Register = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<RegisterProps>({
    first_name: "",
    last_name: "",
    birthdate: "",
    dni: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    nationality: "",
    password: "",
    confirmPass: "",
  });

  const [errorUser, setErrorUser] = useState<RegisterErrorProps>({
    first_name: "",
    last_name: "",
    birthdate: "",
    dni: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    nationality: "",
    password: "",
    confirmPass: "",
  });

  useEffect(() => {
    console.log("Componente Register renderizado");
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange llamado");
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
    console.log("Nuevo estado de dataUser:", {
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit llamado");
    const errors = validateRegisterForm(dataUser);
    setErrorUser(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await register(dataUser);
        console.log("Este es el response", response);
        Swal.fire({
          title: "¡Excelente!",
          text: "Cuenta creada correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
        router.push("/login");
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear la cuenta. Por favor, intente de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-[#1D1D1D]">
      <div className="flex w-full h-full">
        <div className="w-1/3 flex flex-col items-center bg-[#1D1D1D] text-white p-8">
          <h2 className="text-[#ECEDF6] font-maven-pro text-[34px] font-semibold leading-normal mb-4">
            Bienvenido a DentAll
          </h2>
          <div className="w-[80%] flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  NOMBRE
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Nombre"
                  value={dataUser.first_name}
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  onChange={handleChange}
                />
                {errorUser.first_name && (
                  <p className="text-red-500">{errorUser.first_name}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  APELLIDO
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Apellido"
                  value={dataUser.last_name}
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  onChange={handleChange}
                />
                {errorUser.last_name && (
                  <p className="text-red-600">{errorUser.last_name}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  FECHA DE NACIMIENTO
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Fecha de Nacimiento"
                  value={dataUser.birthdate}
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  required
                  onChange={handleChange}
                />
                {errorUser.birthdate && (
                  <p className="text-red-500">{errorUser.birthdate}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  DNI
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="DNI"
                  value={dataUser.dni}
                  type="text"
                  id="dni"
                  name="dni"
                  required
                  onChange={handleChange}
                />
                {errorUser.dni && (
                  <p className="text-red-500">{errorUser.dni}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  TELÉFONO
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Teléfono"
                  value={dataUser.phone}
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                />
                {errorUser.phone && (
                  <p className="text-red-500">{errorUser.phone}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Correo Electrónico"
                  value={dataUser.email}
                  type="email"
                  id="email"
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
                  DIRECCIÓN
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Dirección"
                  value={dataUser.address}
                  type="text"
                  id="address"
                  name="address"
                  required
                  onChange={handleChange}
                />
                {errorUser.address && (
                  <p className="text-red-500">{errorUser.address}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  LOCALIDAD
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Localidad"
                  value={dataUser.location}
                  type="text"
                  id="location"
                  name="location"
                  required
                  onChange={handleChange}
                />
                {errorUser.location && (
                  <p className="text-red-500">{errorUser.location}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  NACIONALIDAD
                </label>
                <input
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Nacionalidad"
                  value={dataUser.nationality}
                  type="text"
                  id="nationality"
                  name="nationality"
                  required
                  onChange={handleChange}
                />
                {errorUser.nationality && (
                  <p className="text-red-500">{errorUser.nationality}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  CONTRASEÑA
                </label>
                <input
                  type="password"
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Contraseña"
                  value={dataUser.password}
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                />
                {errorUser.password && (
                  <p className="text-red-500">{errorUser.password}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  REPETIR CONTRASEÑA
                </label>
                <input
                  type="password"
                  className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Contraseña"
                  value={dataUser.confirmPass}
                  id="confirmPass"
                  name="confirmPass"
                  required
                  onChange={handleChange}
                />
                {errorUser.confirmPass && (
                  <p className="text-red-500">{errorUser.confirmPass}</p>
                )}
              </div>
              <div className="w-full mt-2 flex justify-end">
                <a href="#" className="text-[#00CE90] font-mulish text-[15px]">
                  Olvidé mi contraseña
                </a>
              </div>
              <div className="w-full mt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
                >
                  <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                    Crear cuenta
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="w-full text-[#00CE90] mt-8 flex flex-col items-center space-y-4">
            <p>O registrate con:</p>
            <div className="flex space-x-4">
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS1.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS2.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
              <div className="w-[44px] h-[44px] flex-shrink-0 relative">
                <a href="#">
                  <Image
                    src="/images/RS3.svg"
                    alt="Register Image"
                    layout="fill"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-full relative">
          <Image
            src="/images/ImgReg.svg"
            alt="Register Image"
            layout="fill"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
