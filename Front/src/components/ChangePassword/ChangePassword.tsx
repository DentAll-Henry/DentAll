"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { changePassForm } from "@/helpers/formValidation";
import axiosInstance, { setAuthToken } from "@/utils/axiosInstance";
import { enviroment } from "@/utils/config";

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

type DataUserPass = {
  currentPass: string;
  newPass: string;
  confirmNewPass: string;
};

type ErrorDataUserPass = {
  currentPass?: string;
  newPass?: string;
  confirmNewPass?: string;
};

const ChangePassword = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [dataUserPass, setDataUserPass] = useState<DataUserPass>({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errorUserPass, setErrorUserPass] = useState<ErrorDataUserPass>({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
      setAuthToken(parsedUser.token);
    } else {
      router.push("/login");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUserPass({
      ...dataUserPass,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = changePassForm(dataUserPass);
    setErrorUserPass(errors);
      
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axiosInstance.patch("/auth/changePassword", {
          email: user?.email,
          ...dataUserPass,
        });
        await Swal.fire({
          title: "¡Excelente!",
          text: "Contraseña actualizada.",
          icon: "success",
          confirmButtonText: "Aceptar",
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-greenD-500",
            popup: "text-white",
          },
        });
        localStorage.removeItem("userSession");

        const clientId = encodeURIComponent(enviroment.auth0.clientId + "");
        const domain = encodeURIComponent(enviroment.auth0.domain + "");
        const returnTo = encodeURIComponent(window.location.origin);
      
        Swal.fire({
          title: "¡Excelente!",
          text: "Sesión cerrada correctamente.",
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
          if (result.isConfirmed) {
            const url = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}/api/auth/logout`;
            router.push(url);
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
    <div className="flex justify-center items-center  bg-darkD-600 p-4 rounded">
      <div className="text-white p-8 w-full max-w-3xl">
        <h2 className="text-xl mb-8 text-center">Cambiar constraseña</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              CONTRASEÑA ACTUAL
            </label>
            <input
              type="password"
              className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[5px] bg-[#FFF] w-full text-black"
              placeholder="Contraseña"
              value={dataUserPass.currentPass}
              id="currentPass"
              name="currentPass"
              required
              onChange={handleChange}
            />
            {errorUserPass.currentPass && (
              <p className="text-red-500">{errorUserPass.currentPass}</p>
            )}
          </div>
          <div className="w-full"></div>
          {/* <div className="w-[200%] ml-4 border-t border-gray-400 shadow-sm"></div> */}
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              NUEVA CONTRASEÑA
            </label>
            <input
              type="password"
              className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[5px] bg-[#FFF] w-full text-black"
              placeholder="Contraseña"
              value={dataUserPass.newPass}
              id="newPass"
              name="newPass"
              required
              onChange={handleChange}
            />
            {errorUserPass.newPass && (
              <p className="text-red-500">{errorUserPass.newPass}</p>
            )}
          </div>
          <div className="w-full">
            <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              className="flex h-[30px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[5px] bg-[#FFF] w-full text-black"
              placeholder="Contraseña"
              value={dataUserPass.confirmNewPass}
              id="confirmNewPass"
              name="confirmNewPass"
              required
              onChange={handleChange}
            />
            {errorUserPass.confirmNewPass && (
              <p className="text-red-500">{errorUserPass.confirmNewPass}</p>
            )}
          </div>
          <div className="w-full mt-4 flex justify-center md:col-span-2">
            <button
              type="submit"
              className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[2px] bg-[#00CE90]"
            >
              <span className="text-black font-maven-pro text-[16px] font-semibold leading-normal">
                Cambiar contraseña
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
