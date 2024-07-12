"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { validateRegisterAuth0Form } from "@/helpers/formValidation";
import { RegisterErrorProps, RegisterAuth0Props } from "@/types";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import axiosInstance from "@/utils/axiosInstance";
import { decodeJWT } from "@/helpers/decodeJwt";

const RegisterAuth0 = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [needData, setNeedData] = useState(false);

  const [dataUser, setDataUser] = useState<RegisterAuth0Props>({
    first_name: "",
    last_name: "",
    birthdate: "",
    dni: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    nationality: "",
    photo: "",
    password: "",
    confirmPass: "",
    is_auth0: false,
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

  useEffect(() => {
    setDataUser({
      ...dataUser,
      first_name: user?.given_name,
      last_name: user?.family_name,
      email: user?.email,
      photo: user?.picture,
      password: `${user?.sub}D`,
      confirmPass: `${user?.sub}D`,
      is_auth0: true,
    });
    const loadUser = async () => {
      if (user) {
        try {
          const exist_email = await axiosInstance(
            `/people/byemail?email=${user.email}`
          );
          if (exist_email) {
            if (exist_email.data.is_auth0) {
              const response = await axiosInstance.post("/auth/signin", {
                email: user.email,
                password: `${user?.sub}D`,
              });
              const { token, userData } = response.data;
              localStorage.setItem(
                "userSession",
                JSON.stringify({ token, userData })
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
              const decodedToken: {
                id: string;
                email: string;
                exp: Date;
                iat: Date;
                roles: string;
              } = decodeJWT(token);
              console.log(decodedToken);
              if (decodedToken?.roles === "patient") {
                router.push("/patients");
              } else if (decodedToken?.roles === "dentist") {
                router.push("/professional");
              } else if (decodedToken?.roles === "administrative") {
                router.push("/administrative");
              } else if (decodedToken?.roles === "admin") {
                router.push("/admin");
              } else {
                router.push("/");
              }
            } else {
              Swal.fire({
                title: "¡Error!",
                text: "Correo registrado manualmente.",
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton:
                    "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
                },
              });
              router.push("/login");
            }
          }
        } catch (error) {
          if (
            error?.response?.data?.message ===
            `No existe usuario con el email ${user.email}.`
          ) {
            setNeedData(true);
            Swal.fire({
              title: "¡Bienvenido!",
              text: "Para continuar, por favor complete la siguiente información.",
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton:
                  "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
              },
            });
          } else {
            Swal.fire({
              title: "¡Error!",
              text: "Ocurrio un error durante el ingreso, por favor intente de nuevo más tarde.",
              icon: "error",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton:
                  "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
              },
            });
            router.push("/");
          }
        }
      }
    };
    loadUser();
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit llamado");
    const errors = validateRegisterAuth0Form(dataUser);
    setErrorUser(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const responseSignUp = await register(dataUser);
        const response = await axiosInstance.post("/auth/signin", {
          email: user?.email,
          password: `${user?.sub}D`,
        });
        const { success, token, userData } = response;
        console.log("--> Acá Carlos <--");
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
        const decodedToken: {
          id: string;
          email: string;
          exp: Date;
          iat: Date;
          roles: string;
        } = decodeJWT(token);
        console.log(decodedToken);
        if (decodedToken?.roles === "patient") {
          router.push("/patients");
        } else if (decodedToken?.roles === "dentist") {
          router.push("/professional");
        } else if (decodedToken?.roles === "administrative") {
          router.push("/administrative");
        } else if (decodedToken?.roles === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } catch (error: any) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      console.log(errors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1D1D1D] relative">
      <a href="/" className="absolute top-4 left-4 text-[#00CE90]">
        Volver
      </a>
      {needData && user && (
        <div className="flex w-full h-full">
          <div className="w-1/3 flex flex-col items-center bg-[#1D1D1D] text-white p-8">
            <h2 className="text-[#ECEDF6] font-maven-pro text-[34px] font-semibold leading-normal mb-4">
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
                      className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                      placeholder={user?.given_name}
                      value={user?.given_name}
                      type="text"
                      id="first_name"
                      name="first_name"
                      disabled={true}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                      APELLIDO/S
                    </label>
                    <input
                      className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                      placeholder={user?.family_name}
                      value={user?.family_name}
                      type="text"
                      id="last_name"
                      name="last_name"
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="w-full flex gap-4">
                  <div className="w-1/2">
                    <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                      DNI
                    </label>
                    <input
                      className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
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
                      className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
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
                    className="flex h-[30px] px-[15px] items-center border border-[gray-300] rounded-[1px] bg-[#BBB] w-full text-center"
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
                    className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                    placeholder="mail@mail.com"
                    value={user?.email}
                    type="email"
                    id="email"
                    name="email"
                    disabled={true}
                  />
                </div>
                <div className="w-full">
                  <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                    DIRECCIÓN
                  </label>
                  <input
                    className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
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
                    className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
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
                    className="flex h-[30px] px-[15px] items-center gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
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
                <div className="w-full mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
                  >
                    <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                      Continuar
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
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterAuth0;
