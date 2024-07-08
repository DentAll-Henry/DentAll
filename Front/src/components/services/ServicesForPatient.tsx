"use client"

import { fetchService } from "@/helpers/service.helper"
import { Service } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Payments from "../Payments/Payments"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { handlePayment } from "@/helpers/handlePayment"
import { enviroment } from "@/utils/config"
import { useRouter } from "next/navigation"

type User = {
  id: string
  [key: string]: any
}

export const ServicesForPatient = () => {
  const router = useRouter()

  const [serviceData, setServiceData] = useState<Service[]>([])

  const [patientID, setPatientID] = useState(
    "bd39b676-fb15-44e8-b9bf-13accd9d1b57"
  ) // Reemplaza con un ID válido
  // const [dentalServID, setDentalServID] = useState(
  //   "01292a46-e409-4874-a6ad-618928e64c61"
  // ) // Reemplaza con un ID válido
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  const [user, setUser] = useState<User | null>(null)
  const [loggin, setLoggin] = useState(false)

  useEffect(() => {
    const userSession = localStorage.getItem("userSession")
    if (userSession) {
      const parsedUser = JSON.parse(userSession)
      setUser(parsedUser.userData)
      setLoggin(true)
    } else {
      router.push("/register")
    }
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchService()
        setServiceData(data)
      } catch (error) {
        console.error("Error fetching service data:", error)
      }
    }

    fetchData()
  }, [])

  const handleClick = async (dentalServID: string) => {
    try {
      const preference = await handlePayment(patientID, dentalServID)
      setPreferenceId(preference.preferenceId)
    } catch (error: any) {
      console.error("Error handling click:", error.message)
    }
  }

  useEffect(() => {
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "es-AR",
    })
  }, [])

  return (
    <div>
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
          </div>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      ))}
    </div>
  )
}

