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
  const [consultationType, setConsultationType] = useState("");
  const [dentist, setDentist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [pending, setPending] = useState<PendingAppointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [appointment, setAppointment] = useState({
    dentist_id: "",
    patient: "",
    service: "",
    date_time: "",
    description: "",
  });

  const getData = async () => {
    if (user?.id) {
      try {
        const patient = await axios.get(
          `${enviroment.apiUrl}/patients/person/${user.id}`
        );
        setAppointment({ ...appointment, patient: patient.data.id });
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
      const serviceResponse = await axios.get(
        `${enviroment.apiUrl}/dental-serv/by-name?name=${encodedServiceName}`
      );
      setAppointment({ ...appointment, service: serviceResponse.data[0].id });
      setDentists(dentistResponse.data);
    } catch (error) {
      console.error("Error fetching dentist data:", error);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;  // Mantener como string
    setYear(selectedYear);
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;  // Mantener como string
    setMonth(selectedMonth)
  }

  const handleDentistChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDentistId = e.target.value;
    setDentist(e.target.value);
    setAppointment({ ...appointment, dentist_id: selectedDentistId });
    try {
      const slotsDaysResponse = await axios.post(
        `${enviroment.apiUrl}/appointments/get_available_slots`,
        {
          dentist_id: selectedDentistId,
          start_date: `${year}-${month}-${(new Date(new Date().getFullYear(), parseInt(month) + 1, 1).getDate()).toString().padStart(2, '0')}`,
          end_date: `${year}-${month}-${(new Date(new Date().getFullYear(), parseInt(month) + 2, 0).getDate()).toString().padStart(2, '0')}`,
          time_slots: false,
        }
      );
      setSlots(slotsDaysResponse.data.availabity[0]);
      const slotsByDay = slotsDaysResponse.data.availabity[0].map((d: string) =>{
        return (
        new Date(d[0]).toLocaleDateString([], {
          year: "numeric",
          month: "short",
          day: "2-digit",
          timeZone: "UTC",
        }))}
      );
      setDays(slotsByDay);
    } catch (error) {
      console.error("Error fetching dentist data:", error);
    }
  };

    const handleDaysChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDayNumber = e.target.value;  // Mantener como string
    const selectedDayText = days[parseInt(selectedDayNumber)];
    console.log(selectedDayText)
    const slotsHoursResponse = await axios.post(
      `${enviroment.apiUrl}/appointments/get_available_slots`,
      {
        dentist_id: dentist,
        start_date: slots[parseInt(selectedDayNumber)][0].split('T')[0],
        end_date: slots[parseInt(selectedDayNumber)][0].split('T')[0],
        time_slots: true,
      }
    );
    setSelectedDay(selectedDayNumber);
    const slotsHours = slotsHoursResponse.data.availabity[0].map((slot: string) => {
      return new Date(slot).toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      })}
    );
    setHours(slotsHours);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHour = e.target.value;
    setSelectedHour(selectedHour);
    setAppointment({ ...appointment, date_time: `${year}-${month}-${parseInt(selectedDay)+1} ${selectedHour}` });
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

    try {
      const response = await axios.post(`${enviroment.apiUrl}/appointments`, appointment );

      if (response.status === 201) {
        alert("Cita creada con éxito");
        router.push("/page/patients/appointments"); // Cambia "/appointments" a la ruta adecuada
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
              <label className="text-white">Año</label>
              <select
                value={year}
                onChange={handleYearChange}
                className="w-full p-2 rounded-md text-black"
              >
                <option value="" disabled hidden>
                  Selecciona el año
                </option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-white">Mes</label>
              <select
                value={month}
                onChange={handleMonthChange}
                className="w-full p-2 rounded-md text-black"
              >
                <option value="" disabled hidden>
                  Selecciona el mes
                </option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Dicembre</option>
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
                {days.map(
                  (d, index) =>
                      <option key={index} value={index.toString()}>
                        {d}
                      </option>
                )}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-white">Hora</label>
              <select
                value={selectedHour}
                onChange={handleHoursChange}
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
