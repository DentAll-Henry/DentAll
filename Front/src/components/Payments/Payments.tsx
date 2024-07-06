"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { enviroment } from "@/utils/config";
import { handlePayment } from "@/helpers/handlePayment";


export default function Payments() {
  const [patientID, setPatientID] = useState(
    "18812647-2bd7-4a20-b8d1-4fd75c5e3b45"
  ); // Reemplaza con un ID válido
  const [dentalServID, setDentalServID] = useState("0acff16e-9fc3-4167-8c19-80d13a1c5549"); // Reemplaza con un ID válido
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago("TEST-6df38fed-0d6c-471b-8f0e-038113243657", {
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
