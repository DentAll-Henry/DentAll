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
          <h4>INICIO</h4>
          <h4>NOSOTROS</h4>
          <h4>TRATAMIENTOS</h4>
          <h4>SERVICIOS</h4>
        </div>
        <div className="flex gap-x-4">
          <button className="flex w-[177px] h-[38px] px-[25px] py-[10px] justify-center items-center gap-x-[10px] rounded-[1px] border-2 border-green-500 text-green-500">
            Agendar cita
          </button>
          <button className="rounded-[1px] bg-green-500 px-[25px] py-[10px] text-white">
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
