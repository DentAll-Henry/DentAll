'use client'
import { fetchService } from "@/helpers/service.helper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FormService from "./FormService";

const Services = () => {
  const [serviceData, setSerive] = useState([
    {
      name: "",
      price: "",
      description: "",
      img: "",
      isActive: true,
    },
  ]);
 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchService();
        setSerive(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    getData();
  }, []);
  return (
    <div>
      <section className="flex flex-col bg-[#1D1D1D] p-10 gap-5">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
        </h2>

        {serviceData.map((service, index) => {
          if (index % 2 == 0) {
            return (
              <div className="flex flex-row gap-12 ">
                <div
                  key={index}
                  className={`${
                    service.isActive ? "bg-[#00CE90]" : "bg-red-600"
                  } flex flex-col gap-3 p-9 rounded-lg`}
                >
                  <h3 className="text-[34px] font-semibold">{service.name}</h3>
                  <p className="text-[16px] font-semibold">
                    {service.description}
                  </p>
                  <div className="flex justify-center pr-16">
                    <Image
                      className="text-center"
                      src="/"
                      alt=""
                      width={150}
                      height={150}
                    />
                  </div>
                  <p>{service.price}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="flex flex-row gap-8 text-center">
                <div
                  key={index}
                  className={`${
                    service.isActive ? "bg-white" : "bg-red-600"
                  } flex flex-col gap-3 p-9 rounded-lg`}
                >
                  {service.name}
                  <p className="text-[16px] font-semibold">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </section>
      <section>

      </section>
      <FormService></FormService>
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
