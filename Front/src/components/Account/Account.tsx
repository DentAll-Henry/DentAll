"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RegisterProps } from "@/types";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { decodeJWT } from "@/helpers/decodeJwt";
import Swal from "sweetalert2";

// type errorMessage = {
//   response:{
//     data:{
//       message:string;
//     }
//   }
// }


const Account = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<RegisterProps | any>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201362/testimonio4_zy4fgd.svg"
  ); // URL de la imagen de perfil por defecto
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = localStorage.getItem("userSession");
      console.log("Stored User Data:", storedUserData);
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        console.log("Parsed User Data:", parsedUserData);
        setUserData(parsedUserData); // Asegúrate de actualizar el estado correctamente
        if (parsedUserData.userData && parsedUserData.userData.photo) {
          setProfileImage(parsedUserData.userData.photo);
        }
        if (parsedUserData.token) {
          const token: {
            id: string;
            email: string;
            exp: Date;
            iat: Date;
            roles: string;
          } = decodeJWT(parsedUserData.token);
          if (token.roles === "patient") setRole("Paciente");
          if (token.roles === "dentist") setRole("Dentista");
          if (token.roles === "administrative") setRole("Administrativo");
          if (token.roles === "admin") setRole("Administrador de plataforma");
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    console.log("Imagen de usuario actualizada.");
  }, [profileImage]);

  const navigateBack = () => {
    router.back();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.patch(
          `/people/editphoto/${userData.userData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserData({ token: userData.token, userData: response.data });
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token: userData.token, userData: response.data })
        );
        const newProfileImageUrl = response.data.photo;
        setProfileImage(newProfileImageUrl);
        Swal.fire({
          title: "¡Excelente!",
          text: "Foto de perfil actualizada.",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
      } catch (error:any) {
        Swal.fire({
          title: "Error",
          text: error?.response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton:
              "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
          },
        });
      }
    }
  };
  return (
    <div>
      <div className="flex justify-end m-4 mr-8">
        <button className="bg-greenD-500 p-2" onClick={navigateBack}>
          Volver
        </button>
      </div>
      <div className="m-8 bg-darkD-600 flex flex-row gap-4 p-4">
        <div className="flex justify-center items-center gap-4 relative ml-8 cursor-pointer">
          <div
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            <Image
              src={profileImage}
              width={150}
              height={100}
              style={{ borderRadius: 100 }}
              alt="Imagen de perfil"
            />
            {showEditIcon && (
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 border border-green-500  bg-darkD-500 p-2 rounded-full cursor-pointer"
                style={{ backgroundColor: "rgba(47, 47, 47, 0.5)" }}
              >
                <Image
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201305/PencilSimple_ugfifd.svg"
                  width={150}
                  height={100}
                  alt="Editar imagen"
                />
              </label>
            )}
          </div>
        </div>
        <div className="m-4">
          <h2 className="text-3xl ">
            {userData?.userData?.first_name} {userData?.userData?.last_name}
          </h2>
          <p>{role}</p>
          <div className="flex mt-4 gap-2">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201309/phone_bds9ty.svg"
              width={24}
              height={24}
              alt=""
            />
            <p>{userData?.userData?.phone} </p>
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
      </div>
    </div>
  );
};

export default Account;
