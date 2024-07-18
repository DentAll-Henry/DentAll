"use client";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import axios from "axios";
import { enviroment } from "@/utils/config";
import { addMinutes, format } from "date-fns";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import Modal from "../Modal/Modal";
import ModalNuevaCita from "./ModalNuevaCita";
import { toZonedTime } from "date-fns-tz";

type Event = {
  id: string;
  title: string;
  start: string;
  color: string;
  description: string;
};

type Dentist = {
  id: string;
  person: {
    first_name: string;
    last_name: string;
  };
};

type RequestEventsFilter = {
  start: string;
  end: string;
  dentists: string[];
};

type CalendarProps = {
  dentist_id?: string;
};

const CalendarAppointments: React.FC<CalendarProps> = ({ dentist_id }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedDentistsIds, setSelectedDentistsIds] = useState<string[]>([]);
  const [firstVisibleDate, setFirstVisibleDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [lastVisibleDate, setLastVisibleDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTimeAppointment, setDateTimeAppointment] = useState<string>("");

  useEffect(() => {
    const initializeDentistIds = async () => {
      if (dentist_id) {
        setSelectedDentistsIds([dentist_id]);
      } else {
        await fetchDentists();
      }
    };

    initializeDentistIds();
  }, []);

  useEffect(() => {
    goNext();
  }, [selectedDentistsIds]);

  const goNext = async () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentStart = calendarApi.view.currentStart;
      const currentEnd = calendarApi.view.currentEnd;
      const start = format(currentStart, "yyyy-MM-dd");
      const end = format(currentEnd, "yyyy-MM-dd");
      setFirstVisibleDate(start);
      setLastVisibleDate(end);

      await fetchEvents({ start, end, dentists: selectedDentistsIds });
    }
  };

  const fetchDentists = async () => {
    try {
      const response = await axiosInstance.get(`/dentists/onlyactive`);
      setDentists(response.data);
      setSelectedDentistsIds(
        response.data.map((dentist: Dentist) => dentist.id)
      );
    } catch (error) {
      console.error("Error al cargar dentistas:", error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dentistId = event.target.value;
    if (event.target.checked) {
      setSelectedDentistsIds((prevSelected) => [...prevSelected, dentistId]);
    } else {
      setSelectedDentistsIds((prevSelected) =>
        prevSelected.filter((id) => id !== dentistId)
      );
    }
  };

  const handleEventClick = (info: any) => {
    Swal.fire({
      title: "Detalles de la cita",
      html: `<p style="text-align: left;">
      <b>Paciente:</b> ${info.event.title}<br><b>Doctor:</b> ${info.event.extendedProps.dentist}<br><b>Fecha y hora:</b> ${format(toZonedTime(info.event.startStr, "UTC"), "dd-MM-yyyy HH:mm")}<br><b>Doctor:</b> ${info.event.extendedProps.dentist}<br><b>Servicio:</b> ${info.event.extendedProps.service}</p><p style="text-align: left;">${info.event.extendedProps.description}</p>`,
      icon: "info",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
      },
    })
  };

  const fetchEvents = async (filters: RequestEventsFilter) => {
    const { start, end } = filters;
    try {
      const response = await axiosInstance.get(
        `${enviroment.apiUrl
        }/appointments?start=${start}&end=${end}&dentists=${filters.dentists.join(
          ","
        )}`
      );
      if (response.data.length >= 0) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const addAppointment = async (dateCliclArg: DateClickArg) => {
    if (dentist_id) return;
    const date_time = toZonedTime(dateCliclArg.dateStr, "UTC")
    if (date_time < new Date()) {
      Swal.fire({
        title: "Error al procesar su acción!",
        text: `No es posible agendar citas en fechas pasadas.`,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
        },
      })
      return;
    }
    try {
      Swal.fire({
        title: "Confirme su acción!",
        text: `Desea crear una cita el dia ${format(date_time, "dd/MM/yyyy")}?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Si",
        customClass: {
          confirmButton:
            "hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDateTimeAppointment(format(date_time, "yyyy-MM-dd"));
          setIsModalOpen(true);
        }
      });

      // const response = await axios.post(`/appointments`, event);
      // console.log(response.data);
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  return (
    <>
      {!dentist_id && (
        <div>
          <div>
            <h2>Dentistas</h2>
          </div>
          <div className="mb-4 px-4  flex flex-row">
            {dentists.map((dentist: Dentist) => (
              <div className="w-1/3" key={dentist.id}>
                <label>
                  <input
                    type="checkbox"
                    value={dentist.id}
                    checked={selectedDentistsIds.includes(dentist.id)}
                    onChange={handleCheckboxChange}
                  />
                  <span
                    style={{
                      backgroundColor: `#${dentist.id
                        .replace(/-/g, "")
                        .slice(0, 6)}`,
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>{" "}
                  {dentist.person.first_name} {dentist.person.last_name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={events}
        dayMaxEvents={5}
        datesSet={goNext}
        eventClick={handleEventClick}
        timeZone="UTC"
        locale={esLocale}
        dateClick={(e) => addAppointment(e)}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <ModalNuevaCita modalOpen={setIsModalOpen} goNext={goNext} date_time={dateTimeAppointment} />
      </Modal>
    </>
  );
};


export default CalendarAppointments;
