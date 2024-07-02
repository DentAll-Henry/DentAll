"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateAppointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [status, setStatus] = useState("Activo");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!date || !time || !consultationType) {
      setErrorMessage("Por favor, complete todos los campos");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/appointments", {
        date,
        time,
        consultationType,
        status,
      });

      if (response.status === 201) {
        setDate("");
        setTime("");
        setConsultationType("");
        setStatus("Activo");
        setErrorMessage("");
        alert("Turno creado exitosamente");
        router.push("/page/patients/appointments"); // Redirigir a la página de citas
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error al crear la cita:", error);
      setErrorMessage("Error interno del servidor");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-darkD-600 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-md">
        <h3 className="text-white font-bold mb-4">Crear Nueva Cita</h3>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="text-white">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-white">Hora</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-white">Tipo de Consulta</label>
          <input
            type="text"
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md w-full"
        >
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
