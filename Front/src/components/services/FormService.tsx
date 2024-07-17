import { validateNewServiceForm } from "@/helpers/formValidation";
import { createService } from "@/helpers/service.helper";
import { NewServiceErrorProps, NewServiceProps, Service } from "@/types";
import { useState } from "react";
import Swal from "sweetalert2";

interface FormServiceProps {
  addNewService: (newService: Service) => void;
}

const FormService: React.FC<FormServiceProps> = ({ addNewService }) => {
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
          text: `${newServiceData.name}, se ha creado correctamente `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });

        addNewService(response); // Agregar el nuevo servicio al estado del componente padre
        setNewService({ name: "", price: "", description: "", img: "" }); // Limpiar el formulario
      } catch (error: any) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear el servicio. Por favor, intente de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    
      
        
          <div className="w-full max-w-[72%] flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="text-[#ECEDF6] font-mulish text-[15px] font-medium leading-normal">
                  NOMBRE
                </label>
                <input
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Nombre del servicio"
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
                  DESCRIPCIÓN
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={newServiceData.description}
                  onChange={handleChange}
                  className="flex h-[38px] px-[15px] py-[11px] items-start gap-[10px] self-stretch border border-gray-300 rounded-[1px] bg-[#BBB] w-full"
                  placeholder="Descripción del servicio"
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
                  placeholder="URL de la imagen"
                />
              </div>
              <div className="w-full max-w-[80%] mt-4 flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-[10px] rounded-[1px] bg-[#00CE90]"
                >
                  <span className="text-[#030423] font-maven-pro text-[16px] font-semibold leading-normal">
                    ENVIAR
                  </span>
                </button>
              </div>
            </form>
          </div>
      
      
    
  );
};

export default FormService;
