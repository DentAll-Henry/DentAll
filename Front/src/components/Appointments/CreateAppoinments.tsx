"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { enviroment } from "@/utils/config";
import NavDash from "../NavBar/navDash"; // Asegúrate de que la ruta sea correcta
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import './DatePickerStyles.css'; // Importa los estilos personalizados

type User = {
  id: string;
  [key: string]: any;
};

type PendingAppointment = {
  id: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [calendarDate, setCalendarDate] = useState<Date>();
  const [observaciones, setObservaciones] = useState("");

  const [consultationType, setConsultationType] = useState("");
  const [dentist, setDentist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [pending, setPending] = useState<PendingAppointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);

  const [appointment, setAppointment] = useState({
    dentist_id: "",
    patient: "",
    service: "",
    date_time: "",
    description: "",
  });

  const getData = async () => {
    if (user) {
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

  const handleDentistChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDentistId = e.target.value;
    setDentist(e.target.value);
    setAppointment({ ...appointment, dentist_id: selectedDentistId });
  };

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: hacer validaciones para el objeto appointment
    try {
      const pending_id = pending.find(p => p.service.id === appointment.service)?.id || "";

      const data = pending_id !== ""
        ? { ...appointment, pending_appointment_id: pending_id }
        : appointment;

      const response = await axios.post(`${enviroment.apiUrl}/appointments`, data);

      if (response.status === 201) {
        alert("Cita creada con éxito");
        router.push("/patients/appointments");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setErrorMessage("Error interno del servidor");
    }
  };


  const fetchDates = async (start_date: string, end_date: string, time_slots: boolean = false) => {
    return await axios.post(
      `${enviroment.apiUrl}/appointments/get_available_slots`,
      {
        dentist_id: dentist,
        start_date,
        end_date,
        time_slots,
      }
    );
  }

  const fetchTimes = async (date: string) => {
    const res = await fetchDates(date, date, true)

    if (res.status === 200) {
      const times: Date[] = res.data.availabity[0].map((time: Date) => toZonedTime(time, 'UTC'))
      setAvailableTimes(times)
      return res.data
    }
  }

  const checkRequiredFields = () => {
    if (!consultationType) {
      alert('Debes seleccionar un tipo de consulta primero')
      return false
    }
    if (!dentist) {
      alert('Debes seleccionar un dentista primero')
      return false
    }

    return true
  };

  useEffect(() => {
    if (dentist && consultationType) {
      handleCalendarMonthChange(new Date());
    }
  }, [dentist, consultationType]);

  const handleCalendarMonthChange = async (date: Date) => {

    const start_date = format(startOfMonth(date), 'yyyy-MM-dd')
    const end_date = format(endOfMonth(date), 'yyyy-MM-dd')

    if (!checkRequiredFields()) return
    setIsLoading(true)

    const res = await fetchDates(start_date, end_date)
    if (res.status === 200) {
      unlockAvailableDates(res.data)
    }

  }

  const unlockAvailableDates = async (dates: Date[]) => {

    setAvailableDates(dates.map(date => toZonedTime(date, 'UTC')));
    setIsLoading(false)
  }

  const handleCalendarSelectDate = async (date: Date | null) => {

    setAvailableTimes([])
    if (!checkRequiredFields()) return

    fetchTimes(format(date!, 'yyyy-MM-dd HH:mm'))
  }

  const handleCalendarSelectedDate = async (date: Date | null) => {

    if (date) {
      setCalendarDate(date)
      setAppointment({ ...appointment, date_time: format(date, 'yyyy-MM-dd HH:mm') });
    }
  }

  const handleObservacionesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservaciones(e.target.value);
    setAppointment({ ...appointment, description: e.target.value });
  };

  return (
    <div className="flex ">
      <NavDash />
      <div className="flex-1 mt-[5%]">
        <div className="w-full h-screen flex justify-center items-center bg-darkD-600 text-white">
          <form
            onSubmit={handleSubmit}
            className="border bg-darkD-500 p-8 rounded-md flex flex-wrap w-full max-w-4xl"
          >
            <h3 className="text-white font-bold mb-4 w-full text-center">
              Crear Nueva Cita
            </h3>
            {errorMessage && (
              <p className="text-red-500 mb-4 w-full text-center">
                {errorMessage}
              </p>
            )}
            <div className="flex w-full">
              <div className="w-2/3 pr-4 text-center">
                {isLoading ? (
                  <span className="text-gray-600">
                    Cargando fechas disponibles
                  </span>
                ) : (
                  ""
                )}
                <div className="mt-2 bg-darkD-400 shadow-md rounded-lg">
                  <DatePicker
                    minDate={new Date()}
                    onChange={(date) => handleCalendarSelectedDate(date)}
                    onMonthChange={handleCalendarMonthChange}
                    selected={calendarDate}
                    onSelect={(date) => handleCalendarSelectDate(date)}
                    includeDates={availableDates}
                    showTimeSelect
                    timeFormat="HH:mm"
                    includeTimes={availableTimes}
                    showMonthDropdown
                    placeholderText="Selecciona una fecha"
                    inline
                    className="react-datepicker" // Agrega esta clase para aplicar los estilos
                  />
                </div>
              </div>
              <div className="w-1/3 pl-4">
                <div className="mb-4">
                  <label className="text-white">Tipo de Consulta</label>
                  <select
                    name="service"
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
                    name="dentist_id"
                    value={dentist}
                    onChange={handleDentistChange}
                    className="w-full p-2 rounded-md text-black"
                  >
                    <option value="" disabled>
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
                  <label className="text-white">Observaciones</label>
                  <textarea
                    value={observaciones}
                    onChange={handleObservacionesChange}
                    className="w-full p-2 rounded-md text-black"
                    placeholder="Detalles que quiera compartir con el dentista..."
                  ></textarea>
                </div>
                <div className="w-full">

                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md w-full"
                  >
                    Reservar ahora
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;

{/* <div className="mb-4">
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
</div> */}