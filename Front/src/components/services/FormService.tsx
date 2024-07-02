import { login } from "@/helpers/auth.helper";
import {
  validateLoginForm,
  validateNewServiceForm,
} from "@/helpers/formValidation";
import { createService } from "@/helpers/service.helper";
import { NewServiceErrorProps, NewServiceProps } from "@/types";
import { error } from "console";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FormService = () => {
  const [newServiceData, setNewService] = useState<NewServiceProps>({
    name: "",
    price: "",
    description: "",
    img: "",
  });
  const [errorService, setErrorService] = useState<NewServiceErrorProps>({
    name: "",
    price: "",
    description: "",
    img: "",
  });

  // useEffect(() => {
  //   const userSession = localStorage.getItem("userSession");
  //   if (userSession) {

  //   }
  // }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({
      ...newServiceData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateNewServiceForm(newServiceData);
    setErrorService(errors);

    if (Object.keys(errors).length === 0) {
      try {
        
        const response = await createService(newServiceData);

        Swal.fire({
          title: "¡Excelente!",
          text: `${newServiceData.name}, Se ha creado correctamente `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
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
          </div>
          <div className="w-full max-w-[72%] flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  NOMBRE
                </label>
                <input
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="mail@mail.com"
                  value={newServiceData.name}
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                />
                {errorService.name && (
                  <p className="text-red-500">{errorService.name}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  PRECIO
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={newServiceData.price}
                  onChange={handleChange}
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="20.50$"
                />
                {errorService.price && (
                  <p className="text-red-500">{errorService.price}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  DESCRIPCION
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={newServiceData.description}
                  onChange={handleChange}
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="description"
                />
                {errorService.description && (
                  <p className="text-red-500">{errorService.description}</p>
                )}
              </div>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  IMAGEN
                </label>
                <input
                  id="img"
                  name="img"
                  type="text"
                  value={newServiceData.img}
                  onChange={handleChange}
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="img"
                />
              </div>
              <div className="w-full max-w-[80%] mt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex w-[340px] h-[38px] px-[25px] py-[11px] justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
                >
                  <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                    ENVIAR
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormService;
