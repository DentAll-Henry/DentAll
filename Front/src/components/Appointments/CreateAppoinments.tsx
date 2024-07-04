"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { enviroment } from "@/utils/config";
import NavDash from "../NavBar/navDash"; // Asegúrate de que la ruta sea correcta
import SideNavBar from "../NavBar/sideNavBar"; // Asegúrate de que la ruta sea correcta

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
  const [slots, setSlots] = useState<any[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState("");

  const getData = async () => {
    if (user?.id) {
      try {
        const patient = await axios.get(
          `${enviroment.apiUrl}/patients/person/${user.id}`
        );
        const response = await axios.get(
          `${enviroment.apiUrl}/appointments/pending_appointments_by_patient/${patient.data.id}`
        );
        setPending(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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

  const handleDentistChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDentistId = e.target.value;
    setDentist(e.target.value);
    try {
      const slotsResponse = await axios.post(
        `${enviroment.apiUrl}/appointments/get_available_slots`,
        {
          dentist_id: selectedDentistId,
          start_date: "2024-07-01",
          end_date: "2024-07-31",
        }
      );
      setSlots(slotsResponse.data.availabity);
    } catch (error) {
      console.error("Error fetching dentist data:", error);
    }
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = e.target.value; // Mantener como string
    setSelectedDay(selectedDay);
    const slotsHours = slots[parseInt(selectedDay, 10)].map((slot: string) =>
      new Date(slot).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setHours(slotsHours);
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
    if (user) {
      getData();
    }
  }, [user]);

  useEffect(() => {
    console.log(slots); // Imprime el valor de slots para verificar su contenido cuando cambia
  }, [slots]);

  useEffect(() => {
    console.log(hours); // Imprime el valor de hours para verificar su contenido cuando cambia
  }, [hours]);

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
        router.push("/appointments"); // Cambia "/appointments" a la ruta adecuada
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setErrorMessage("Error interno del servidor");
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <NavDash />
        <div className="w-full h-screen flex justify-center items-center bg-darkD-600 text-white">
          <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-md">
            <h3 className="text-white font-bold mb-4">Crear Nueva Cita</h3>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
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
                <option value="Consulta de valoración">
                  Consulta de valoración
                </option>
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
              <label className="text-white">Día</label>
              <select
                value={selectedDay}
                onChange={handleDaysChange}
                className="w-full p-2 rounded-md text-black"
              >
                <option value="" disabled hidden>
                  Selecciona el día
                </option>
                {slots.map((d, index) => (
                  <option key={index} value={index.toString()}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-white">Hora</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 rounded-md text-black"
              >
                <option value="" disabled hidden>
                  Selecciona la hora
                </option>
                {hours.map((h, index) => (
                  <option key={index} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md w-full"
            >
              Crear Cita
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
