"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { validateRegisterForm } from "@/helpers/formValidation";
import { RegisterErrorProps, RegisterProps } from "@/types";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import PasswordInput from "../../components/PasswordImput";

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
    
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateRegisterForm(dataUser);
    setErrorUser(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await register(dataUser);
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
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const inputClass =
    "h-[28px] px-[8px] py-[4px] items-center gap-[10px] self-stretch border border-gray-300 bg-[#BBB] w-full rounded-[5px]";

  return (
    <div className="h-screen flex justify-center items-center bg-[#1D1D1D] relative">
      <a
        href="/"
        className="flex flex-row justify-center items-center absolute top-4 left-4 text-white gap-2"
      >
        <Image
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720967334/ArrowCircleRight_aln0la.png"
          alt="Arrow"
          width={30}
          height={30}
        />
        Volver
      </a>
      <div className="flex w-full h-full">
        <div className="w-2/3 flex flex-col items-center bg-[#1D1D1D] text-white p-8">
          <h2 className="text-[#ECEDF6] font-maven-pro text-[34px] font-semibold leading-normal mb-4 p-2">
            Bienvenido a DentAll
          </h2>
          <div className="w-[80%] flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    NOMBRE/S
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Juan"
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
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    APELLIDO/S
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Perez"
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
              </div>
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    DNI
                  </label>
                  <input
                    className={inputClass}
                    placeholder="12345678"
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
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    TELÉFONO
                  </label>
                  <input
                    className={inputClass}
                    placeholder="0123456789"
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
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal text-center">
                  FECHA DE NACIMIENTO
                </label>
                <input
                  className={`${inputClass} text-left`}
                  value={dataUser.birthdate}
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  required
                  onChange={handleChange}
                  style={{ lineHeight: "30px" }}
                />
                {errorUser.birthdate && (
                  <p className="text-red-500">{errorUser.birthdate}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  className={inputClass}
                  placeholder="mail@mail.com"
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
                  className={inputClass}
                  placeholder="Calle Falsa 123"
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
                  className={inputClass}
                  placeholder="Lugar falso"
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
                  className={inputClass}
                  placeholder="País de origen"
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
              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    CONTRASEÑA
                  </label>
                  <PasswordInput
                    value={dataUser.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    required
                    className={inputClass}
                  />
                  {errorUser.password && (
                    <p className="text-red-500">{errorUser.password}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    REPETIR CONTRASEÑA
                  </label>
                  <PasswordInput
                    value={dataUser.confirmPass}
                    onChange={handleChange}
                    id="confirmPass"
                    name="confirmPass"
                    required
                    className={inputClass}
                  />
                  {errorUser.confirmPass && (
                    <p className="text-red-500">{errorUser.confirmPass}</p>
                  )}
                </div>
              </div>
              <div className="w-full mt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] bg-[#00CE90] rounded-[5px]"
                >
                  <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                    Crear cuenta
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-2/3 h-full relative">
          <Image
            src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720203080/Group_48095527_bgwmit.webp"
            alt="Register Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
