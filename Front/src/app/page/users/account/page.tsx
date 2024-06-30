import EditProfile from "@/components/EditProfile/EditProfile";
import NavDash from "@/components/NavBar/navDash";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />

      <div className="m-8 mt-24 bg-darkD-500 flex flex-row justify-between p-4">
        <div className="flex justify-center items-center gap-4">
          <Image src="/images/user.svg" width={150} height={100} alt="" />
          <div className="">
            <h2 className="text-3xl ">Jhon Doe</h2>
            <p>Paciente</p>
            <div className="flex mt-4">
              <Image src="/images/phone.svg" width={24} height={24} alt="" />
              <p>+1 (385) 880-7000</p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="bg-greenD-500 p-2 ">Editar Perfil</p>
        </div>
      </div>
      <div>
        <h2 className="text-[34px] font-semibold leading-normal m-8 ">
          Editar Perfil
        </h2>
      </div>
      <div>
        <EditProfile />
      </div>
    </div>
  );
};

export default page;
