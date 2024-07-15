// components/ProfileButton.js
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RegisterProps } from "@/types";
import { decodeJWT } from "@/helpers/decodeJwt";
import axiosInstance from "@/utils/axiosInstance";

type Role = {
  eng: string,
  esp: string,
}

export default function ProfileButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [userData, setUserData] = useState<RegisterProps | any>(null);
  const [roles, setRoles] = useState<Role[]>([])
  const [roleAuth, setRoleAuth] = useState("")
  const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedUserData = localStorage.getItem("userSession");
        console.log("Stored User Data:", storedUserData);
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Parsed User Data:", parsedUserData);
          setUserData(parsedUserData); // Asegúrate de actualizar el estado correctamente
          const token = decodeJWT(parsedUserData.token)
          setRoleAuth(token.roles)
          const roles: Role[] = parsedUserData.userData.roles.map((r: any) => {
            if (r.name === 'patient') return {
              eng: 'patient',
              esp: 'Paciente',
            };
            if (r.name === 'dentist') return {
              eng: 'dentist',
              esp: 'Dentista',
            };
            if (r.name === 'administrative') return {
              eng: 'administrative',
              esp: 'Administrativo',
            };
            if (r.name === 'admin') return {
              eng: 'admin',
              esp: 'Super admin'
            };
          });
          setRoles(roles)
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

  const handleRoleSelect = async (role:any) => {
    const response = await axiosInstance.post('/auth/changerole', {
      id_person: userData.userData.id,
      new_role: role,
    })
    setUserData({ token: response.data.token, userData: response.data.userData });
    localStorage.setItem(
      "userSession",
      JSON.stringify({ token: response.data.token, userData: response.data.userData })
    );
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "dentist":
        router.push("/professional");
        break;
      case "administrative":
        router.push("/administrative");
        break;
      case "patient":
        router.push("/patients");
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
        <div className="absolute space-y-1 right-0 z-10 mt-2 w-56 origin-top-right bg-darkD-600 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1 ">
          <div className="py-1 space-y-1">
            <button
              onClick={toggleRolesDropdown}
              className="rounded block px-4 py-2 text-sm text-black w-full text-left bg-white hover:bg-gray-200"
            >
              Cambiar de rol
            </button>
            <Link
              href="/users/account"
              className="rounded block px-4 py-2 text-sm text-black bg-white hover:bg-gray-200"
            >
              Editar perfil
            </Link>
          </div>
          {showRolesDropdown && (
            <div className="py-1 space-y-1">
              {
                roles.map((r: Role, index) => 
                  <button
                    onClick={() => handleRoleSelect(r.eng)}
                    className={r.eng === roleAuth ? "rounded block px-4 py-2 text-sm text-gray-300 w-full text-left bg-greenD-500" : "rounded block px-4 py-2 text-sm text-black w-full text-left bg-greenD-500 hover:bg-greenD-400"}
                    key={index}
                    disabled={r.eng === roleAuth}
                  >
                    {r.esp}
                  </button>
                )
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
