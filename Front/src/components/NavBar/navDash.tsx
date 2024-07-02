"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegisterProps } from "@/types";

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
      <div className="border-b border-solid border-gray-300 shadow-top-white flex justify-between items-center w-full p-4 px-8">
        <div>
          <SearchBar />
        </div>

        {userData?.token ? (
          <div className="flex gap-3 items-center">
            <div className="mr-10">
              <Link href="/page/dashboard_patients/notifications">
                <Image
                  src="/images/notificacion.svg"
                  width={24}
                  height={24}
                  alt="Notificaciones"
                />
              </Link>
            </div>
            <Link
              href="/page/users/account"
              className="flex items-center gap-4"
            >
              <Image
                src="/images/user.svg"
                width={40}
                height={30}
                alt="Usuario"
              />
              <p className="m-4">
                {userData.userData.first_name} {userData.userData.last_name}
              </p>
            </Link>
          </div>
        ) : (
          <div className="text-white bg-gray-700 rounded-lg flex flex-row p-4 justify-around ">
            <Link href="/login">
              <p className="flex justify-center rounded-lg p-1 hover:bg-red-600">
                Iniciar sesión
              </p>
            </Link>
            <p className="flex justify-center">O</p>
            <Link href="/register">
              <p className="flex justify-center rounded-lg p-1 hover:bg-red-600">
                Registrarse
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavDash;
