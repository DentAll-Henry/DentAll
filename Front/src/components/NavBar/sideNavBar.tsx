"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SideNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    // window.location.reload();
    Swal.fire({
      title: "¡Excelente!",
      text: "Sesión cerrada correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton:
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
      },
    });
  };

  return (
    <div className="h-screen w-[20%] bg-darkD-500 text-white fixed">
      <div className="p-4">
        <Image
          src="/images/Logo.svg"
          alt="Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      <nav className="mt-5">
        <ul>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link className="flex gap-4" href="/page/dashboard_patients">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/home.svg"
                width={24}
                height={24}
                alt="Home"
              />
              <p className="group-hover:text-greenD-500">Inicio</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link
              className="flex gap-4"
              href="/page/dashboard_patients/appointments"
            >
              <Image
                className="group-hover:fill-current text-white"
                src="/images/citas.svg"
                width={24}
                height={24}
                alt="Citas"
              />
              <p className="group-hover:text-greenD-500">Mis citas</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link className="flex gap-4" href="#">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/recetas.svg"
                width={24}
                height={24}
                alt="Recetas"
              />
              <p className="group-hover:text-greenD-500">Recetas médicas</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link className="flex gap-4" href="/">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/user.svg"
                width={24}
                height={24}
                alt="Cerrar sesión"
              />
              <button
                onClick={handleLogout}
                className="group-hover:text-greenD-500"
              >
                Cerrar sesión
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-end justify-end mt-[90%] mr-4">
        <Image
          className="group-hover:fill-current text-white"
          src="/images/robot.svg"
          width={50}
          height={50}
          alt="Cerrar sesión"
        />
      </div>
    </div>
  );
};

export default SideNav;

// <div className=" bg-black ">
//     <Link
//       className="mb-2 flex h-20 items-end justify-start rounded-md bg-greenD-800 p-4 md:h-40"
//       href="/"
//     >
//       <div className="w-32  md:w-40">
//         <Image
//           src="/images/Logo.svg"
//           width={350}
//           height={200}
//           alt="Logo.svg"
//         />
//       </div>
//     </Link>

//     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Inicio</div>
//       </button>
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Sign Out</div>
//       </button>
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Sign Out</div>
//       </button>
//       <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//       <form>
//         <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//           <PowerIcon className="w-6" />
//           <div className="hidden md:block">Cerrar Sesión</div>
//         </button>
//       </form>
//     </div>
