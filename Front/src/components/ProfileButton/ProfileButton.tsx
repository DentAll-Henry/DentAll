// components/ProfileButton.js
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RegisterProps } from "@/types";

export default function ProfileButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
   const [userData, setUserData] = useState<RegisterProps | any>(null);
  const router = useRouter();
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
    }, [usePathname]);

  const togglePopup = (e:any) => {
    e.preventDefault();
    setShowPopup(!showPopup);
    setShowRolesDropdown(false); // Asegurarse de que el dropdown de roles se oculte si el popup se cierra
  };

  const toggleRolesDropdown = () => {
    setShowRolesDropdown(!showRolesDropdown);
  };

  const handleRoleSelect = (role:any) => {
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "professional":
        router.push("/professional");
        break;
      case "administrative":
        router.push("/administrative");
        break;
      case "patient":
        router.push("/patient");
        break;
      default:
        break;
    }
    setShowPopup(false); // Ocultar el popup después de seleccionar un rol
  };

  return (
    <div className="relative inline-block text-left">
      {userData?.token && (
        <Link
          href="/users/account"
          className="flex items-center transition-all hover:scale-105"
          onClick={togglePopup}
        >
          <Image
            src={
              userData.userData.photo ||
              "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg"
            }
            width={40}
            height={30}
            style={{ borderRadius: 50 }}
            alt="Usuario"
          />
        </Link>
      )}
      {showPopup && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={toggleRolesDropdown}
              className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
            >
              Cambiar de rol
            </button>
            <Link
              href="/users/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Editar perfil
            </Link>
          </div>
          {showRolesDropdown && (
            <div className="py-1">
              <button
                onClick={() => handleRoleSelect("admin")}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Superadmin
              </button>
              <button
                onClick={() => handleRoleSelect("professional")}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Profesional
              </button>
              <button
                onClick={() => handleRoleSelect("administrative")}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Administrativo
              </button>
              <button
                onClick={() => handleRoleSelect("patient")}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Paciente
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
