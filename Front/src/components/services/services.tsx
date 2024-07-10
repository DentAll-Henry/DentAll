"use client";
import { fetchService, updateIsActiveService } from "@/helpers/service.helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormService from "./FormService";
import { Service } from "@/types";

const Services = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const response = await updateIsActiveService(id);
      // Actualizar el estado para reflejar el cambio de isActive
      const updatedServices = serviceData.map((service) => {
        if (service.id === id) {
          return { ...service, isActive : !service.isActive }; // Cambiar isActive a false para el servicio eliminado
        }
        return service;
      });

      setServiceData(updatedServices);
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const addNewService = (newService: Service) => {
    setServiceData((prevServiceData) => [...prevServiceData, newService]);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchService();
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className=" min-h-screen p-8">
      <h2 className="text-5xl text-center text-white font-bold mb-12">
        EDITAR <span className="text-[#00CE90]">SERVICIOS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className={`rounded-lg p-6 flex flex-col justify-between ${
              service.isActive ? "bg-[#00CE90]" : "bg-red-600"
            }`}
          >
            <h3 className="text-2xl text-white mb-4">{service.name}</h3>
            <p className="text-white mb-4">{service.description}</p>
            {/* <div className="flex justify-center mb-4">
              <Image
                src="/"
                alt={service.name}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div> */}
            <p className="text-white text-lg mb-4">{service.price}</p>
            <button
              className="bg-white text-black py-2 px-4 rounded"
              onClick={() => handleDelete(service.id)}
            >
              {service.isActive ? "Dar de baja" : "Dar de alta"}
            </button>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <FormService addNewService={addNewService} />
      </section>
    </div>
  );
};

export default Services;
