"use client";
import EditProfile from "@/components/EditProfile/EditProfile";

import { RegisterProps} from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
 const pathname = usePathname();
 const [userData, setUserData] = useState<RegisterProps | any>(null);

 useEffect(() => {
   if (typeof window !== "undefined" && window.localStorage) {
     const storedUserData = localStorage.getItem("userSession");
     console.log("Stored User Data:", storedUserData);
     if (storedUserData) {
       const parsedUserData = JSON.parse(storedUserData);
       console.log("Parsed User Data:", parsedUserData);
       setUserData(parsedUserData); // Asegúrate de actualizar el estado correctamente
     }
   }
 }, [pathname]);

  return (
    <div >
      

      <div className="m-8 mt-24 bg-darkD-500 flex flex-row justify-between p-4">
        <div className="flex justify-center items-center gap-4">
          <Image src="/images/user.svg" width={150} height={100} alt="" />
          <div className="">
            <h2 className="text-3xl ">{userData?.userData?.name}</h2>
            <p>Paciente</p>
            <div className="flex mt-4">
              <Image src="/images/phone.svg" width={24} height={24} alt="" />
              <p>+1 (385) 880-7000 {userData?.userData?.phone} </p>
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

export default Account;
