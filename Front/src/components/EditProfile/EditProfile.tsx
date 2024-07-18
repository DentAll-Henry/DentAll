"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { updateRegisterForm } from "@/helpers/formValidation";
import axiosInstance, { setAuthToken } from "@/utils/axiosInstance";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  nationality: string;
  is_auth0: boolean;
  [key: string]: any;
};

type DataUser = {
  phone: string;
  email: string;
  address: string;
  location: string;
  password: string;
  nationality: string;
};

type ErrorDataUser = {
  phone?: string;
  email?: string;
  address?: string;
  location?: string;
  password?: string;
  nationality?: string;
};

const EditProfile = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [dataUser, setDataUser] = useState<DataUser>({
    phone: "",
    email: "",
    address: "",
    nationality: "",
    location: "",
    password: "",
  });
  const [errorUser, setErrorUser] = useState<ErrorDataUser>({
    phone: "",
    email: "",
    nationality: "",
    address: "",
    location: "",
    password: "",
  });

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
      setDataUser({
        phone: parsedUser.userData.phone,
        email: parsedUser.userData.email,
        address: parsedUser.userData.address,
        location: parsedUser.userData.location,
        nationality: parsedUser.userData.location,
        password: "",
      });
      setAuthToken(parsedUser.token);
    } else {
      router.push("/login");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
    // console.log("Nuevo estado de dataUser:", {
    //   ...dataUser,
    //   [event.target.name]: event.target.value,
    // });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = updateRegisterForm(dataUser, user?.is_auth0);
    setErrorUser(errors);
      
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axiosInstance.patch("/auth/updateperson", {
          id: user?.id,
          ...dataUser,
        });
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            token: response.data.token,
            userData: response.data.userData,
          })
        );
        Swal.fire({
          title: "¡Excelente!",
          text: "Información actualizada.",
          icon: "success",
          confirmButtonText: "Aceptar",
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-greenD-500",
            popup: "text-white",
          },
        }).then((result) => {
          if(result.isConfirmed) {
            router.push("/users/account");
          }
        });
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-red-500",
            popup: "text-white",
          },
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center  bg-darkD-400 p-4 rounded">
        <div className="text-white p-8 w-full max-w-3xl">
          {/* <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                NOMBRE
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                placeholder={user?.first_name}
                type="text"
                id="first_name"
                name="first_name"
                disabled={true}
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                APELLIDO
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                placeholder={user?.last_name}
                type="text"
                id="last_name"
                name="last_name"
                disabled={true}
                required
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                NACIONALIDAD
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full "
                placeholder={user?.nationality}
                type="text"
                id="nationality"
                name="nationality"
                disabled={true}
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                FECHA DE NACIMIENTO
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                placeholder={
                  user?.birthdate
                    ? new Date(user.birthdate).toLocaleDateString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : ""
                }
                type="text"
                id="birthdate"
                name="birthdate"
                disabled={true}
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                DNI
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                placeholder={user?.dni}
                type="text"
                id="dni"
                name="dni"
                disabled={true}
                required
                onChange={handleChange}
              />
            </div>
          </form> */}

          <h2 className="text-xl mb-8 text-center">Editar información</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                TELÉFONO
              </label>
              <input
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
                placeholder={user?.phone}
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
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
                placeholder={user?.email}
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
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
                placeholder={user?.address}
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
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
                placeholder={user?.location}
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
            {
              !user?.is_auth0 && 
                <div className="flex w-full flex justify-center md:col-span-2">
                  <div className="w-full">
                    <p>Corfirma tu contraseña para <br/> guardar los cambios</p>
                  </div>
                  <div className="w-full">
                    <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                      CONTRASEÑA
                    </label>
                    <input
                      type="password"
                      className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
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
                </div>
            }
            {/* <div className="w-full">
              <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                REPETIR CONTRASEÑA
              </label>
              <input
                type="password"
                className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#FFF] w-full text-black"
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
            </div> */}
            <div className="w-full mt-4 flex justify-center md:col-span-2">
              <button
                type="submit"
                className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
              >
                <span className="text-black font-maven-pro text-[16px] font-semibold leading-normal">
                  Guardar información
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default EditProfile;
