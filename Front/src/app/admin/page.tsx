import NavDash from "@/components/NavBar/navDash";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BarChart from "@/components/BarChart/BarChart";
function page() {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative ">
      <NavDash />
      <div className="m-4 mt-24 mb-10 ">
      <div className="m-4 flex flex-row gap-4">
        {/* <p>Resumen Estadístico</p> */}
        
          

          <div className=" w-1/2 grid grid-rows-3 gap-3 mx-6 py-6">
            <Link href="/admin/users/patients">
            <div className="flex flex-row  ">
            <div className="flex justify-center bg-[#F69ACC] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201226/UsersThree_zkf6am.svg"
                width={35}
                height={35}
                alt="usuarios"
              />
            </div>

            <div className="bg-[#f69acd24] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
              <p className="text-xs text-[#F69ACC] ">Total de pacientes</p>
              <p className="text-sm">10 pacientes</p>
            </div>
          </div>
            </Link>
          
          <Link href="/admin/users/dentists">
            <div className="flex flex-row  ">
              <div className="flex justify-center bg-[#F6CC9A] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                <Image
                  className="group-hover:fill-current text-white"
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201224/userNurse_kfpvdt.svg"
                  width={35}
                  height={35}
                  alt="usuarios"
                />
              </div>

              <div className="bg-[#f6e79a24] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
                <p className="text-xs text-[#F6CC9A] ">Total de profesionales</p>
                <p className="text-sm">10 pacientes</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/users/appointments">
          <div className="flex flex-row  ">
            <div className="flex justify-center bg-[#a2f69a] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201342/schedule_tzqpfn.svg"
                width={35}
                height={35}
                alt="usuarios"
              />
            </div>

            <div className="bg-[#9af6a224] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
              <p className="text-xs text-[#a2f69a] ">
                Total de citas pendientes
              </p>
              <p className="text-sm">10 pacientes</p>
            </div>
          </div>
          
          </Link>
          
          <Link href="/admin/users/appointments">
          <div className="flex flex-row  ">
            <div className="flex justify-center bg-[#a2f69a] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201342/schedule_tzqpfn.svg"
                width={35}
                height={35}
                alt="usuarios"
              />
            </div>

            <div className="bg-[#9af6a224] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
              <p className="text-xs text-[#a2f69a] ">
                Total de citas pendientes
              </p>
              <p className="text-sm">10 pacientes</p>
            </div>
          </div>
          
          </Link>
          
         
          

          

        </div>
        <div className=" w-1/2 flex justify-center bg-[#1D1D1D] m-6 py-6 rounded-md">
                <BarChart/>
          </div>

      </div>

      <div className="m-8">
      <Link href="/admin/services">
            <div className="flex-row bg-[#b7df158b] w-1/4 py-3 gap-4 rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300 mt-4">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201326/recetass_si2se4.svg"
                width={40}
                height={40}
                alt="Editar servicios"
              />
              <p>Editar servicios</p>
            </div>
          </Link>

        
      </div>
      
        
      </div>
      
    </div>
  );
}

export default page;
