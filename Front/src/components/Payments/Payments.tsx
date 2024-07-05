"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { enviroment } from "@/utils/config";
import { handlePayment } from "@/helpers/handlePayment";


export default function Payments() {
  const [patientID, setPatientID] = useState(
    "6ee89d13-c596-483e-bef5-18be0dc11800"
  ); // Reemplaza con un ID válido
  const [dentalServID, setDentalServID] = useState("7e718a1a-d611-4145-a76a-066986d32a8c"); // Reemplaza con un ID válido
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
