'use client'
import { useRouter } from "next/navigation";
import EditProfile from "@/components/EditProfile/EditProfile";
import { RegisterProps } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<RegisterProps | any>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201221/user_bdisfr.svg"
  ); // URL de la imagen de perfil por defecto
  const [showEditIcon, setShowEditIcon] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = localStorage.getItem("userSession");
      console.log("Stored User Data:", storedUserData);
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log("Parsed User Data:", parsedUserData);
        setUserData(parsedUserData); // Asegúrate de actualizar el estado correctamente
        if (parsedUserData.userData && parsedUserData.userData.profileImage) {
          setProfileImage(parsedUserData.userData.profileImage);
        }
      }
    }
  }, [pathname]);

  const navigateBack = () => {
    router.back();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Aquí puedes realizar la lógica para subir la imagen a tu servicio de almacenamiento (por ejemplo, Cloudinary)
        // Una vez subida, puedes actualizar el estado del usuario con la nueva URL de la imagen de perfil
        const newProfileImageUrl = reader.result as string;
        setProfileImage(newProfileImageUrl);
        // También puedes guardar esta nueva URL en el estado global o en localStorage si lo deseas
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="m-8 mt-24 bg-darkD-600 flex flex-row justify-between p-4">
        <div
          className="flex justify-center items-center gap-4 relative"
          onMouseEnter={() => setShowEditIcon(true)}
          onMouseLeave={() => setShowEditIcon(false)}
        >
          <Image
            src={profileImage}
            width={150}
            height={100}
            alt="Imagen de perfil"
          />
          {showEditIcon && (
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-greenD-500 p-2 cursor-pointer rounded-full"
              style={{ transform: "translate(50%, 50%)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2h2M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m0-2v2m0 0v2m0-2h2m-2 0h2"
                />
              </svg>
            </label>
          )}
          <div className="">
            <h2 className="text-3xl ">{userData?.userData?.name}</h2>
            <p>Paciente</p>
            <div className="flex mt-4">
              <Image
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201309/phone_bds9ty.svg"
                width={24}
                height={24}
                alt=""
              />
              <p>+1 (385) 880-7000 {userData?.userData?.phone} </p>
            </div>
          </div>
        </div>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <button className="bg-greenD-500 p-2 ml-2" onClick={navigateBack}>
          Volver
        </button>
      </div>

      <div>
        <EditProfile />
      </div>
    </div>
  );
};

export default Account;
