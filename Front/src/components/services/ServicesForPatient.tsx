"use client";

import { fetchService } from "@/helpers/service.helper";
import { Service } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { handlePayment } from "@/helpers/handlePayment";
import { enviroment } from "@/utils/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

type User = {
  id: string;
  [key: string]: any;
};

export const ServicesForPatient = () => {
  const router = useRouter();

  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [preferenceIds, setPreferenceIds] = useState<{
    [key: string]: string | null;
  }>({});
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
      setLoggin(true);
    } else {
      router.push("/register");
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchService();
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (dentalServID: string) => {
    try {
      if (user) {
        const patient = await axiosInstance.get(
          `${enviroment.apiUrl}/patients/person/${user.id}`
        );
        const preference = await handlePayment(patient.data.id, dentalServID);
        setPreferenceIds((prev) => ({
          ...prev,
          [dentalServID]: preference.preferenceId,
        }));
      }
    } catch (error: any) {
      console.error("Error handling click:", error.message);
    }
  };

  useEffect(() => {
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "en-US",
    });
  }, []);

  return (
    <div className="flex">
      {serviceData.map((service, index) => (
        <div key={index} onClick={() => handleClick(service.id)}>
          <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <p className="text-[#60D66A]">{service.name}</p>
            {service.img && (
              <Image
                className="group-hover:fill-current text-white"
                src={service.img}
                width={35}
                height={35}
                alt={service.name}
              />
            )}
            <p className="text-[#60D66A]">${service.price}</p>
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
            {preferenceIds[service.id] && (
              <Wallet
                initialization={{ preferenceId: preferenceIds[service.id]! }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
