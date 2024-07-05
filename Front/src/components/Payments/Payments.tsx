"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { enviroment } from "@/utils/config";
import { handlePayment } from "@/helpers/handlePayment";


export default function Payments() {
  const [patientID, setPatientID] = useState(
    "3bf2e0c7-3225-4541-84b3-fc4c8b628976"
  ); // Reemplaza con un ID válido
  const [dentalServID, setDentalServID] = useState("925a0c03-f4e9-424d-a964-f75fda984c6b"); // Reemplaza con un ID válido
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "es-AR",
    });
  }, []);

  const handleClick = async () => {
    try {
      const preference = await handlePayment(patientID, dentalServID);
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error("Error handling click:", error.message);
    }
  };

  return (
    <div>
      <h1>Generar Pago</h1>
      <button onClick={handleClick}>Crear Preferencia</button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
