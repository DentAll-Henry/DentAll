"use client";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegisterProps } from "@/types";
import ProfileButton from "../ProfileButton/ProfileButton";

const NavDash = () => {
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
    <div className="fixed z-50 w-[80%] bg-darkD-600 items-center">
      <div className="border-b border-solid border-gray-300 shadow-top-white flex justify-end items-center w-full p-4 px-8 ">
        {/* <div>
          <SearchBar />
        </div> */}

        {userData?.token && (
          <div className="flex flex-row items-center ml-[45%] ">
            <div className="flex justify-center items-center ">
              <ProfileButton />
            </div>
            <p className="m-4 text-xl font-bold ">
              {userData.userData.first_name} {userData.userData.last_name}
            </p>
          </div>
        )}
        {/* <div className="transition-all  hover:scale-110">
          <Link href="/patients/notifications">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201299/notificacion_zwl4hp.svg"
              width={24}
              height={24}
              alt="Notificaciones"
            />
          </Link>
        </div> */}
      </div>
    </div>
  );
};


export default NavDash;
