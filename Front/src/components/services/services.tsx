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
      console.log("Servicio eliminado:", response);

      // Actualizar el estado para reflejar el cambio de isActive
      const updatedServices = serviceData.map((service) => {
        if (service.id === id) {
          return { ...service, isActive: false }; // Cambiar isActive a false para el servicio eliminado
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
    <div>
      <section className="flex flex-col bg-[#1D1D1D] p-10 gap-5">
        <h2 className="text-[58px] text-center text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
        </h2>

        {serviceData.map((service, index) => (
          <div className="flex flex-row gap-12" key={service.id}>
            <div
              className={`${
                service.isActive ? "bg-[#00CE90]" : "bg-red-600"
              } flex flex-col gap-3 p-9 rounded-lg`}
            >
              <h3 className="text-[34px] font-semibold">{service.name}</h3>
              <p className="text-[16px] font-semibold">{service.description}</p>
              <div className="flex justify-center pr-16">
                <Image src="/" alt="" width={150} height={150} />
              </div>
              <p>{service.price}</p>
              <button onClick={() => handleDelete(service.id)}>
                Dar de baja
              </button>
            </div>
          </div>
        ))}
      </section>
      <section>
        <FormService addNewService={addNewService} />
      </section>
    </div>
  );
};

export default Services;

// return (
//     <div>
//       <section className="flex flex-col bg-[#1D1D1D] p-10 gap-5">
//         <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
//           NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
//         </h2>
//         <div className="flex flex-row gap-12 ">
//           <div className="bg-[#00CE90] flex flex-col gap-3 p-9 rounded-lg">
//             <h3 className="text-[34px] font-semibold">Blanqueamiento dental</h3>
//             <p className="text-[16px] font-semibold">
//               {" "}
//               Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental
//               profesional elimina manchas y decoloraciones para un aspecto más
//               luminoso y juvenil
//             </p>
//             <div className="flex justify-center pr-16">
//               <Image
//                 className="text-center"
//                 src="/images/dentalVeneer.png"
//                 alt=""
//                 width={150}
//                 height={150}
//               />
//             </div>
//           </div>

//           <div className="bg-white flex flex-col gap-3 p-9 rounded-lg">
//             <h3 className="text-[34px] font-semibold">Blanqueamiento dental</h3>
//             <p className="text-[16px] font-semibold">
//               {" "}
//               Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental
//               profesional elimina manchas y decoloraciones para un aspecto más
//               luminoso y juvenil
//             </p>
//             <div className="flex justify-center pr-16">
//               <Image
//                 className="text-center"
//                 src="/images/toothWhite.png"
//                 alt=""
//                 width={150}
//                 height={150}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row gap-8 text-center">
//           <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
//             Implantes dentales
//           </div>
//           <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
//             Reconstrucción Dental
//           </div>
//           <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
//             Puentes dentales
//           </div>
//         </div>
//       </section>
//     </div>
