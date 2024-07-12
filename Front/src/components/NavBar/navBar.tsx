"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="text-white">
      <div className="bg-[#1D1D1D] flex justify-between items-center p-4 px-8">
        <div>
          <Image
            src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194389/Logo-DentAll_qh1uqi.webp"
            alt="Logo.svg"
            width={200}
            height={50}
            priority
          />
        </div>
        <div className="flex flex-wrap w-[578px] items-start gap-x-[61px] ">
          <a
            href="/"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal transition-all  hover:scale-110"
          >
            INICIO
          </a>
          <a
            href="/about"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal transition-all  hover:scale-110"
          >
            NOSOTROS
          </a>
          <a
            href="#"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal transition-all  hover:scale-110"
          >
            TRATAMIENTOS
          </a>
          <a
            href="/services"
            className="text-white font-maven-pro text-[16px] font-semibold leading-normal transition-all  hover:scale-110"
          >
            SERVICIOS
          </a>
        </div>
        <div className="inline-flex items-center px-[10px] gap-[50px]">
          <button className="flex px-[25px] py-[10px] justify-center items-center gap-x-[10px] rounded-[1px] border-2 border-[#00CE90] text-[#00CE90] font-maven-pro text-[16px] font-semibold leading-normal">
            Agendar cita
          </button>
          <Link href="/login">
            <button className="rounded-[1px] bg-[#00CE90] px-[25px] py-[10px] text-[#0D0508] font-maven-pro text-[16px] font-semibold leading-normal">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
