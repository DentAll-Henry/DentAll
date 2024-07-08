"use client"
import { useEffect, useState } from "react"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import { enviroment } from "@/utils/config"
import { handlePayment } from "@/helpers/handlePayment"
import { useRouter } from "next/navigation"

type User = {
  id: string
  [key: string]: any
}

export default function Payments() {
  const [patientID, setPatientID] = useState(
    "bd39b676-fb15-44e8-b9bf-13accd9d1b57"
  ) // Reemplaza con un ID válido
  const [dentalServID, setDentalServID] = useState(
    "cc07a1e6-f09d-4c57-919f-df4781cd0b22"
  ) // Reemplaza con un ID válido
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  const [user, setUser] = useState<User | null>(null)
  const [loggin, setLoggin] = useState(false)

  const router = useRouter()

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
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "es-AR",
    })
  }, [])

  const handleClick = async () => {
    try {
      const preference = await handlePayment(patientID, dentalServID)
      setPreferenceId(preference.preferenceId)
    } catch (error: any) {
      console.error("Error handling click:", error.message)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Pagar</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  )
}

