"use client";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import PasswordInput from "../PasswordImput";
import { Suspense } from'react';

const RestorePasswordSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RestorePasswordInfo />
    </Suspense>
  );
};

const RestorePasswordInfo = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const router = useRouter();
  const [passInfo, setPassInfo] = useState({
    newPass: "",
    confirmNewPass: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPassInfo({
      ...passInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(passInfo.newPass !== passInfo.confirmNewPass) {
      await Swal.fire({
        title: "¡Error!",
        text: "Las contraseñas deben ser iguales",
        icon: "error",
        confirmButtonText: "Aceptar",
        background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
        customClass: {
          confirmButton:
            "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
          title: "text-greenD-500", // Cambia el color del texto del título
          popup: "text-white", // Cambia el color del texto del contenido
        },
      });
      return;
    }

    const regexStrongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regexStrongPass.test(passInfo.newPass)) {
      await Swal.fire({
        title: "¡Error!",
        text: "Las contraseñas deben cumplir las características indicadas.",
        icon: "error",
        confirmButtonText: "Aceptar",
        background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
        customClass: {
          confirmButton:
            "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
          title: "text-greenD-500", // Cambia el color del texto del título
          popup: "text-white", // Cambia el color del texto del contenido
        },
      });
      return;
    };

    try {
      const token = searchParams.split('=')[1];
      const response = await axiosInstance.post(
        `/auth/restore-password/${token}`,
        passInfo,
      );
      await Swal.fire({
        title: "¡Excelente!",
        text: response.data,
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
        customClass: {
          confirmButton:
            "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
          title: "text-greenD-500", // Cambia el color del texto del título
          popup: "text-white", // Cambia el color del texto del contenido
        },
      });
    } catch (error: any) {
      await Swal.fire({
        title: "¡Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Aceptar",
        background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
        customClass: {
          confirmButton:
            "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
          title: "text-greenD-500", // Cambia el color del texto del título
          popup: "text-white", // Cambia el color del texto del contenido
        },
      });
    } finally {
      router.push("/login");
    }
    
  };

  return (
    <div className="bg-[#1A2228] rounded-lg p-6 text-white space-y-4 flex flex-col justify-center items-center">
      <h2 className="text-center text-xl font-semibold">Restaurar contraseña</h2>
      <div className="flex items-center justify-center w-[80%]">
        <div className="m-2 w-[60%]">
          <p>Ingresa la nueva contraseña, recuerda que debe cumplir las siguientes características:</p>
          <ul>
              <li>- Como mínimo 8 carcácteres</li>
              <li>- Como mínimo una letra mayúscula</li>
              <li>- Como mínimo una letra minúscula</li>
              <li>- Como mínimo un número</li>
              <li>- Como mínimo un caracter especial</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg p-6 space-y-4 flex flex-col justify-center items-center w-[40%]">
          <div className="flex flex-col">
            <div className="flex flex-col m-2">
              <label> Nueva contraseña:</label>
              <PasswordInput
                id="newPass"
                className="text-black rounded"
                name="newPass"
                value={passInfo.newPass}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col m-2">
              <label> Confirnar nueva contraseña:</label>
              <PasswordInput
                id="confirmNewPass"
                className="text-black rounded"
                name="confirmNewPass"
                value={passInfo.confirmNewPass}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button
            className="rounded block px-4 py-2 text-l w-fit text-black bg-greenD-500 cursor-pointer"
            type="submit"
          >
            Restaurar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestorePasswordSuspense;
