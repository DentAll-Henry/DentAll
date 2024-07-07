"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RegisterProps } from "@/types";
import Image from "next/image";

const Account = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<RegisterProps | any>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201362/testimonio4_zy4fgd.svg"
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tu_upload_preset"); // Reemplaza con tu upload_preset de Cloudinary

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload`, // Reemplaza con tu cloud_name de Cloudinary
          formData
        );

        const newProfileImageUrl = response.data.secure_url;
        setProfileImage(newProfileImageUrl);

        // También puedes actualizar el estado global o en localStorage si lo deseas
        const updatedUserData = {
          ...userData,
          userData: { ...userData.userData, profileImage: newProfileImageUrl },
        };
        setUserData(updatedUserData);
        localStorage.setItem("userSession", JSON.stringify(updatedUserData));
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
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
        <div
          className="flex justify-center items-center gap-4 relative ml-8 cursor-pointer"
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
              className="absolute bottom-0 right-0 bg-darkD-500 p-2  rounded-full cursor-pointer"
            >
              <Image
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201305/PencilSimple_ugfifd.svg"
                width={30}
                height={30}
                alt="Imagen de perfil"
              />
            </label>
          )}
        </div>
        <div className="m-4">
          <h2 className="text-3xl ">
            {userData?.userData?.first_name} {userData?.userData?.last_name}
          </h2>
          <p>{userData?.userData?.role}</p>
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
