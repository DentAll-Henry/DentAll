"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormService from "./FormService";
import { Service } from "@/types";
import Modal from "@/components/Modal/Modal"; // Importar tu componente Modal
import { fetchService, updateIsActiveService } from "@/helpers/service.helper";

const Services = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Cambiar nombre de la propiedad a isModalOpen

  const handleDelete = async (id: string) => {
    try {
      const response = await updateIsActiveService(id);

      // const updatedServices = serviceData.map((service) =>
      //   service.id === id ? { ...service, isActive: service.isActive } : service
      // );

      // setServiceData(updatedServices);
      await getData();
    } catch (error) {
      
    }
  };

  const addNewService = (newService: Service) => {
    setServiceData((prevServiceData) => [...prevServiceData, newService]);
    setIsModalOpen(false); // Cerrar el modal después de agregar el servicio
  };
  const getData = async () => {
    try {
      const data = await fetchService();
      setServiceData(data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <section className="flex flex-col p-10 gap-5">
        <div className="flex justify-between mx-[8%]">
          <h2 className="text-[30px] text-white font-bold leading-normal">
            Editar servicios
          </h2>
          <div
            className="flex bg-greenD-500 items-center p-1 rounded cursor-pointer"
            onClick={() => setIsModalOpen(true)} // Abrir modal al hacer clic
          >
            Agregar servicios +
          </div>
        </div>

        <div className="grid grid-cols-2 px-20 gap-8">
          {serviceData.map((service) => (
            <div key={service.id} className="flex flex-row">
              <div className="flex justify-center bg-darkD-400 p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                <Image
                  className="group-hover:fill-current text-white"
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720998845/layer_group_lykgin.svg"
                  width={35}
                  height={35}
                  alt="usuarios"
                />
              </div>
              <div
                className={`${
                  service.isActive ? "bg-greenD-500" : "bg-[#ff00009e]"
                } w-[80%] p-4 rounded-tl-0  rounded-bl-0 flex flex-col gap-2`}
              >
                <p className="text-base text-white font-bold">{service.name}</p>
                <p className="text-sm text-white">{service.description}</p>
                <button onClick={() => handleDelete(service.id)}>
                  {service.isActive ? "Dar de baja" : "Dar de alta"}
                </button>
              </div>
              <div className="flex justify-center items-center bg-darkD-400 p-4 w-[20%] rounded-tr-[10px] rounded-tl-0 rounded-bl-0 rounded-br-[10px]">
                <p className="font-extrabold">$ {service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal para agregar servicios */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-bold">Agregar Servicio</h2>
          <FormService addNewService={addNewService} />
        </div>
      </Modal>
    </div>
  );
};

export default Services;
