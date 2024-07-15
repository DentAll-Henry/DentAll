"use client";
import { fetchService } from "@/helpers/service.helper";
import { Service } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Gradiente from "../Gradiente/Gradiente";
import GradienteAzul from "../GradienteAzul/GradienteAzul";
import Circular from "../Circular/Circular";

const ServicesUsers = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchService();
        const servicesActive = data.filter((service) => {
          if (service.isActive) return service;
        });
        setServiceData(servicesActive);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div  className=" relative min-h-screen p-8">
      <div className=" absolute top-[0px] left-[594px]">
          <Circular />
        </div>
        
      <h2 className="text-5xl text-center text-white font-bold mb-3">
        NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
      </h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className="flex flex-row"
          >
            <h3 className="text-2xl text-[#00CE90] mb-4">{service.name}</h3>
            <p className="text-white mb-4">{service.description}</p>
            <div className="flex justify-center mb-4">
              <Image
                src="/"
                alt={service.name}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <p className="text-white text-lg mb-4">{service.price}</p>
          </div>
        ))}
      </div> */}



      <div className="grid grid-cols-2 p-20 gap-8">
        {serviceData.map((service) => (
         <div key={service.id} className="flex flex-row">
                <div className="flex justify-center bg-greenD-500 p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                  <Image
                    className="group-hover:fill-current text-white"
                    src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720998845/layer_group_lykgin.svg"
                    width={35}
                    height={35}
                    alt="usuarios"
                  />
                </div>
                <div className="bg-[#9af6bf24] w-[80%] p-4 rounded-tl-0  rounded-bl-0 flex flex-col gap-2">
                  <p className="text-base text-greenD-500 font-bold">{service.name}</p>
                  <p className="text-sm text-white">{service.description}</p>
                </div>
                <div className="flex justify-center items-center bg-greenD-500 p-4 w-[20%] rounded-tr-[10px] rounded-tl-0 rounded-bl-0 rounded-br-[10px]">
                  <p className="font-extrabold">$ {service.price}</p>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesUsers;
