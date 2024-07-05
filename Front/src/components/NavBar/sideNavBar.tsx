"use client";
import Link from "next/link";
import Image from "next/image";
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
      <div className="py-4 ml-6 mt-3">
        <Image
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194389/Logo-DentAll_qh1uqi.webp"
          alt="Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      <nav className="mt-5">
        <ul>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link className="flex gap-4" href="/page/patients">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201273/home_gfeqo8.svg"
                width={24}
                height={24}
                alt="Home"
              />
              <p className="group-hover:text-greenD-500">Inicio</p>
            </Link>
          </li>
          <li className="py-2 px-4 m-4 rounded-xl hover:bg-zinc-600 group">
            <Link className="flex gap-4" href="/page/patients/appointments">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201242/citas_bpks2p.svg"
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
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201324/recetas_oahfsd.svg"
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
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg"
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
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720203858/robot_dki1y5.webp"
          width={50}
          height={50}
          alt="Chat bot"
        />
      </div>
    </div>
  );
};

export default SideNav;