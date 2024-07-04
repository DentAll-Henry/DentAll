"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { enviroment } from "@/utils/config";
import { Appointment } from "@/types";

type User = {
  id: string;
  [key: string]: any;
};

type PendingAppointment = {
  service: {
    id: string;
    name: string;
  };
};

type Dentist = {
  id: string;
  person: {
    first_name: string;
    last_name: string;
  };
};

const CreateAppointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [dentist, setDentist] = useState("");
  const [status, setStatus] = useState("Activo");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [pending, setPending] = useState<PendingAppointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [appointment, setAppointment] = useState({
    date_time: "",
    description: "",
    patient: "",
    service: "",
    dentist: "",
  });

  const getData = async () => {
    if (user?.id) {
      const patient = await axios.get(
        `${enviroment.apiUrl}/patients/person/${user.id}`
      );
      const response = await axios.get(
        `${enviroment.apiUrl}/appointments/pending_appointments_by_patient/${patient.data.id}`
      );
      setPending(response.data);
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        patient: patient.data.id,
      }));
    }
  };

  const handleServiceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedServiceName = e.target.options[e.target.selectedIndex].text;
    setConsultationType(e.target.value);

    const encodedServiceName = encodeURIComponent(selectedServiceName);

    try {
      const dentistResponse = await axios.get(
        `${enviroment.apiUrl}/dentists/bydentalserv?name=${encodedServiceName}`
      );
      setDentists(dentistResponse.data);
    } catch (error) {
      console.error("Error fetching dentist data:", error);
    }
  };

  const handleDentistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDentist(e.target.value);
  };

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
    } else {
      router.push("/register");
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !time || !consultationType || !dentist) {
      setErrorMessage("Por favor, complete todos los campos");
      return;
    }

    try {
      const response = await axios.post(`${enviroment.apiUrl}/appointments`, {
        date,
        time,
        consultationType,
        status,
        dentist,
        userId: user?.id,
      });

      if (response.status === 201) {
        alert("Cita creada con éxito");
        router.push("/somewhere"); // Cambia "/somewhere" a la ruta adecuada
      } else {
        setErrorMessage("Error al crear la cita");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setErrorMessage("Error interno del servidor");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-darkD-600 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-md">
        <h3 className="text-white font-bold mb-4">Crear Nueva Cita</h3>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="text-white">Tipo de Consulta</label>
          <select
            value={consultationType}
            onChange={handleServiceChange}
            className="w-full p-2 rounded-md text-black"
          >
            <option value="" disabled hidden>
              Selecciona una opción
            </option>
            <option value="Odontología general">Odontología general</option>
            {pending.map((p) => (
              <option key={p.service.id} value={p.service.name}>
                {p.service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-white">Dentista</label>
          <select
            value={dentist}
            onChange={handleDentistChange}
            className="w-full p-2 rounded-md text-black"
          >
            <option value="" disabled hidden>
              Selecciona un profesional
            </option>
            {dentists.map((p) => (
              <option key={p.id} value={p.id}>
                {p.person.first_name} {p.person.last_name}
              </option>
            ))}
          </select>
        </div>
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
