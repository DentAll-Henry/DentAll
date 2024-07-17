"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { enviroment } from "@/utils/config";
import NavDash from "../NavBar/navDash"; // Asegúrate de que la ruta sea correcta
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, endOfMonth, format, startOfMonth } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale"; // Importa la localización en español
import "./DatePickerStyles.css"; // Importa los estilos personalizados
import { handlePayment } from "@/helpers/handlePayment";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Timer from "../Timer/Timer";
import BlockUi from "@availity/block-ui";
import "@availity/block-ui/src/BlockUi.css";
import "@availity/block-ui/src/Loader.css";
import axiosInstance from "@/utils/axiosInstance";

// Modificar la localización en español para cambiar los nombres de los días
const customEsLocale = {
  ...es,
  localize: {
    ...es.localize,
    day: (n: number) => ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"][n],
  },
};

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
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [observaciones, setObservaciones] = useState("");

  const [consultationType, setConsultationType] = useState("");
  const [dentist, setDentist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [pending, setPending] = useState<PendingAppointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [confirmPay, setConfirmPay] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");

  const [appointment, setAppointment] = useState({
    dentist_id: "",
    patient: "",
    service: "",
    date_time: "",
    description: "",
    id: "",
  });

  const getData = async () => {
    if (user) {
      try {
        const patient = await axiosInstance.get(
          `${enviroment.apiUrl}/patients/person/${user.id}`
        );
        setAppointment({ ...appointment, patient: patient.data.id });
        const response = await axiosInstance.get(
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
      const dentistResponse = await axiosInstance.get(
        `${enviroment.apiUrl}/dentists/bydentalserv?name=${encodedServiceName}`
      );
      const serviceResponse = await axiosInstance.get(
        `${enviroment.apiUrl}/dental-serv/by-name?name=${encodedServiceName}`
      );
      setAppointment({ ...appointment, service: serviceResponse.data[0].id });
      setDentists(dentistResponse.data);
    } catch (error) {
      console.error("Error fetching dentist data:", error);
    }
    isLoading;
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
      router.push("/Patients");
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  useEffect(() => {
    if (appointment.id !== "") {
      handleClick();
    }
  }, [appointment.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: hacer validaciones para el objeto appointment
    try {
      const pending_id =
        pending.find((p) => p.service.id === appointment.service)?.id || "";

      const data =
        pending_id !== ""
          ? { ...appointment, pending_appointment_id: pending_id }
          : appointment;

      const response = await axiosInstance.post(`/appointments`, data);
      if (response.status === 201) {
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          id: response.data.id,
        }));
        setConfirmPay(true);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setErrorMessage("Error interno del servidor");
    }
  };

  const fetchDates = async (
    start_date: string,
    end_date: string,
    time_slots: boolean = false
  ) => {
    return await axiosInstance.post(`/appointments/get_available_slots`, {
      dentist_id: dentist,
      start_date,
      end_date,
      time_slots,
    });
  };

  const fetchTimes = async (date: string) => {
    const res = await fetchDates(date, date, true);

    if (res.status === 200) {
      const times: Date[] = res.data.availabity[0].map((time: Date) =>
        toZonedTime(time, "UTC")
      );
      setAvailableTimes(times);
      return res.data;
    }
  };

  const checkRequiredFields = () => {
    if (!consultationType) {
      alert("Debes seleccionar un tipo de consulta primero");
      return false;
    }
    if (!dentist) {
      alert("Debes seleccionar un dentista primero");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (dentist && consultationType) {
      handleCalendarMonthChange(new Date());
    }
  }, [dentist, consultationType]);

  const handleCalendarMonthChange = async (date: Date) => {
    const start_date = format(startOfMonth(date), "yyyy-MM-dd");
    const end_date = format(endOfMonth(date), "yyyy-MM-dd");

    if (!checkRequiredFields()) return;
    setIsLoading(true);

    const res = await fetchDates(start_date, end_date);
    if (res.status === 200) {
      unlockAvailableDates(res.data);
    }
  };

  const unlockAvailableDates = async (dates: Date[]) => {
    setAvailableDates(dates.map((date) => toZonedTime(date, "UTC")));
    setIsLoading(false);
  };

  const handleCalendarSelectDate = async (date: Date | null) => {
    setAvailableTimes([]);
    if (!checkRequiredFields()) return;

    fetchTimes(format(date!, "yyyy-MM-dd HH:mm"));
  };

  const handleCalendarSelectedDate = async (date: Date | null) => {
    if (date) {
      setCalendarDate(date);
      setAppointment({
        ...appointment,
        date_time: format(date, "yyyy-MM-dd HH:mm"),
      });
    }
  };

  const handleObservacionesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setObservaciones(e.target.value);
    setAppointment({ ...appointment, description: e.target.value });
  };

  useEffect(() => {
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "en-US",
    });
  }, []);

  const handleClick = async () => {
    try {
      const preference = await handlePayment(
        appointment.patient,
        appointment.id
      );
      setPreferenceId(preference.preferenceId);
    } catch (error: any) {
      console.error("Error handling click:", error.message);
    }
  };

  return (
    <div className="flex">
      <NavDash />
      <div className="flex-1 mt-[5%]">
        <BlockUi blocking={isLoading} message="Cargando fechas disponibles...">
          <form
            onSubmit={handleSubmit}
            className="border bg-darkD-500 p-8 rounded-md flex flex-wrap w-full h-full"
          >
            <h2 className="text-white font-bold mb-4 w-full text-center">
              Crear Nueva Cita
            </h2>
            {errorMessage && (
              <p className="text-red-500 mb-4 w-full text-center">
                {errorMessage}
              </p>
            )}

            <div className="flex w-full">
              <div className="w-full md:w-2/2 flex flex-col items-center mb-4 md:mt-0">
                <div className=" rounded-lg w-full">
                  <DatePicker
                    minDate={addDays(new Date(), 1)}
                    onChange={(date) => handleCalendarSelectedDate(date)}
                    onMonthChange={handleCalendarMonthChange}
                    selected={calendarDate}
                    onSelect={(date) => handleCalendarSelectDate(date)}
                    includeDates={availableDates}
                    // showTimeSelect
                    timeFormat="HH:mm"
                    includeTimes={availableTimes}
                    showMonthDropdown
                    placeholderText="Selecciona una fecha"
                    inline
                    className="react-datepicker w-full h-96"
                    locale={customEsLocale} // Usa la localización personalizada
                  />
                </div>
              </div>
              <div className="w-full h-full md:w-1/2 flex flex-col pl-4">
                <div className="mb-2">
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

                {/* Aquí se añaden las horas disponibles */}
                {availableTimes.length > 0 && (
                  <div className="w-full mb-4">
                    <label className="text-white">Horas Disponibles</label>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {availableTimes.map((time, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded-lg cursor-pointer border-2 ${
                            appointment.date_time ===
                            format(time, "yyyy-MM-dd HH:mm")
                              ? "border-[#00CE90] text-[#00CE90]" // Borde verde y texto verde para la hora seleccionada
                              : "border-gray-200 text-gray-200" // Borde gris y texto gris para las horas no seleccionadas
                          }`}
                          onClick={() =>
                            setAppointment({
                              ...appointment,
                              date_time: format(time, "yyyy-MM-dd HH:mm"),
                            })
                          }
                        >
                          {format(time, "HH:mm")}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                  {!confirmPay && (
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded-md w-full border-2 border-green-700"
                    >
                      Crear Cita
                    </button>
                  )}
                </div>

                {confirmPay && (
                  <div className="w-full mt-4">
                    <p className="text-white mb-2">
                      Por favor, realiza el pago para confirmar la cita
                    </p>
                    <Timer />
                    {preferenceId && (
                      <div className="mt-4">
                        <Wallet
                          initialization={{ preferenceId: preferenceId }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </BlockUi>
      </div>
    </div>
  );
};

export default CreateAppointment;
