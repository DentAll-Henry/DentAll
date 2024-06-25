import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="text-white">
      <div className="bg-gray-800 flex justify-between items-center p-4">
        <div>
          <Image
            src="/images/Logo.svg"
            alt="Logo.svg"
            width={200}
            height={50}
            priority
          />
        </div>
        <div className="flex flex-wrap w-[578px] items-start gap-x-[61px]">
          <a
            href="#"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal"
          >
            INICIO
          </a>
          <a
            href="#"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal"
          >
            NOSOTROS
          </a>
          <a
            href="#"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal"
          >
            TRATAMIENTOS
          </a>
          <a
            href="#"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal"
          >
            SERVICIOS
          </a>
        </div>
        <div className="inline-flex items-center px-[10px] gap-[50px]">
          <button className="flex w-[177px] h-[38px] px-[25px] py-[10px] justify-center items-center gap-x-[10px] rounded-[1px] border-2 border-green-500 text-green-500 font-maven-pro text-[16px] font-semibold leading-normal">
            Agendar cita
          </button>
          <button className="rounded-[1px] bg-green-500 px-[25px] py-[10px] text-[#0D0508] font-maven-pro text-[16px] font-semibold leading-normal">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
