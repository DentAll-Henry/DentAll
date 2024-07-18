"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { PatientId, RegisterProps } from "@/types";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { decodeJWT } from "@/helpers/decodeJwt";
import Swal from "sweetalert2";
import { getPatientId } from "@/helpers/patients.helper";
import { format } from "date-fns";
import EditProfile from "../EditProfile/EditProfile";

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
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
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

  useEffect(() => {}, [profileImage]);

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
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-greenD-500",
            popup: "text-white",
          },
        });
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error?.response.data.message,
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#1D1D1D",
          customClass: {
            confirmButton:
              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
            title: "text-red-500",
            popup: "text-white",
          },
        });
      }
    }
  };
  return (
    <div>
      <div
        className="flex gap-2 justify-start m-4 mr-8 items-center cursor-pointer w-[6%] "
        onClick={navigateBack}
      >
        <Image
          className="" // Ajusta el tamaño según tus necesidades
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720967334/ArrowCircleRight_aln0la.png"
          alt="Arrow"
          width={30}
          height={30}
        />
        <span className="mr-2">Volver</span>
      </div>
      <div className="flex  p-10 rounded-xl w-[80%] justify-center gap-12 m-auto">
        <div className="  bg-darkD-600 w-[35%]  p-4 px-6 rounded-[5px] ">
          <div className="flex flex-row gap-4 p-4">
            <div className="flex justify-center items-center gap-4 relative ">
              <div
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
              >
                <Image
                  src={profileImage}
                  width={100}
                  height={100}
                  style={{ borderRadius: 100 }}
                  alt="Imagen de perfil"
                />
                {showEditIcon && (
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0  p-2 rounded-full cursor-pointer"
                  >
                    <Image
                      src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720887373/NotePencil_axapbz.svg"
                      width={30}
                      height={30}
                      alt="Editar imagen"
                    />
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-[24px] font-semibold">
                {userData?.userData?.first_name} {userData?.userData?.last_name}
              </h2>
              <p>{role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className=" ">
              <p className="text-greenD-500">INFORMACIÓN PERSONAL</p>
              <p>
                <span className="text-darkD-300">DNI:</span>{" "}
                {userData?.userData?.dni}
              </p>
              <p>
                <span className="text-darkD-300">Fecha de nacimiento:</span>{" "}
                {userData?.userData
                  ? format(userData.userData.birthdate, "dd-MM-yyyy")
                  : ""}
              </p>
            </div>
            <div className="">
              <p className="text-greenD-500">INFORMACIÓN DE CONTACTO</p>
              <p>
                <span className="text-darkD-300">Teléfono:</span>{" "}
                {userData?.userData?.phone}
              </p>
              <p>
                <span className="text-darkD-300">Email:</span>{" "}
                {userData?.userData?.email}
              </p>
            </div>
            <div className="">
              <p className="text-greenD-500">DOMICILIO</p>
              <p>
                <span className="text-darkD-300">Dirección:</span>{" "}
                {userData?.userData?.address}
              </p>
              <p>
                <span className="text-darkD-300">Localidad:</span>{" "}
                {userData?.userData?.location}
              </p>
            </div>
          </div>
        </div>

        <div>
          <EditProfile />
        </div>
      </div>
      <div className="mb-4 ml-4">
        <Image
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194389/Logo-DentAll_qh1uqi.webp"
          alt="Logo.svg"
          width={200}
          height={50}
          priority
        />
      </div>
    </div>
  );
};

export default Account;
