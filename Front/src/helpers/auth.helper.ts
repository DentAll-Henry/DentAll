import { LoginProps, RegisterProps } from "@/types";
import { enviroment } from "@/utils/config";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;




export async function register(userData: RegisterProps) {
  try {
    console.log(enviroment.apiUrl)
    const res = await fetch(`${enviroment.apiUrl}/auth/signup`, {

      method: "POST",
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(userData),
    }).then();

    if (res.ok) {
      console.log(res)
      return res.json();
    } else {
        Swal.fire({
          title: "¡Upps!",
          text: "Hubo un error en el registro.",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          },
        });
      throw new Error("Error en el registro");
    }
  } catch (error: any) {
    console.log(error);
  }
}



export async function login(userData: LoginProps) {
  try {
    const res = await fetch(`${enviroment.apiUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      return res.json();
    } else {
          Swal.fire({
            title: "¡Upps!",
            text: "Hubo un error al iniciar sesión.",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton:
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
            },
          });
      throw new Error("Error al iniciar sesión");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
