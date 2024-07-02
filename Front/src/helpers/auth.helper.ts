import { LoginProps, RegisterProps } from "@/types";
import { enviroment } from "@/utils/config";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: RegisterProps) {
  try {
    const response = await axios.post(
      `${enviroment.apiUrl}/auth/signup`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  // try {
  //   const res = await fetch(`${enviroment.apiUrl}/auth/signup`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       "ngrok-skip-browser-warning": "true",
  //     },
  //     body: JSON.stringify(userData),
  //   });
  //   if (res.ok) {
  //     return await res.json();
  //   } else {
  //     Swal.fire({
  //       title: "¡Upps!",
  //       text: "Hubo un error en el registro.",
  //       icon: "error",
  //       confirmButtonText: "Aceptar",
  //       customClass: {
  //         confirmButton:
  //           "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  //       },
  //     });
  //     throw new Error("Error en el registro");
  //   }
  // } catch (error: any) {
  //   Swal.fire({
  //     title: "¡Error!",
  //     text: "Ocurrió un error durante el registro. Por favor, inténtelo de nuevo más tarde.",
  //     icon: "error",
  //     confirmButtonText: "Aceptar",
  //     customClass: {
  //       confirmButton:
  //         "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  //     },
  // });
  // return await error.json;
  //   }
}

export async function login(userData: LoginProps) {
  try {
    const response = await axios.post(
      `${enviroment.apiUrl}/auth/signin`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  // try {
  //   const res = await fetch(`${enviroment.apiUrl}/auth/signin`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       "ngrok-skip-browser-warning": "true",
  //     },
  //     body: JSON.stringify(userData),
  //   });

  //   console.log(res);

  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     Swal.fire({
  //       title: "¡Upps!",
  //       text: "Hubo un error al iniciar sesión.",
  //       icon: "error",
  //       confirmButtonText: "Aceptar",
  //       customClass: {
  //         confirmButton:
  //           "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  //       },
  //     });
  //     throw new Error("Error al iniciar sesión");
  //   }
  // } catch (error: any) {
  //   console.error("Error en login:", error);
  //   Swal.fire({
  //     title: "¡Error!",
  //     text: "Ocurrió un error durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.",
  //     icon: "error",
  //     confirmButtonText: "Aceptar",
  //     customClass: {
  //       confirmButton:
  //         "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  //     },
  //   });
  //   throw error;
  // }
}
