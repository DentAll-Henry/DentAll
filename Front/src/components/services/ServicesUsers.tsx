"use client";
import { fetchService } from "@/helpers/service.helper";
import { Service } from "@/types";
import { useEffect, useState } from "react";

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
    <div className=" min-h-screen p-8">
      <h2 className="text-5xl text-center text-white font-bold mb-12">
        NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className="rounded-lg p-6 flex flex-col justify-between bg-[#00CE90] "
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesUsers;
