'use client'
import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';
import axios from 'axios'
import { enviroment } from '@/utils/config'
import { addMinutes, format } from 'date-fns'

type Event = {
    id: string
    title: string
    start: string
    color: string
    description: string
}

type Dentist = {
    id: string
    person: {
        first_name: string
        last_name: string
    }
}

type RequestEventsFilter = {
    start: string
    end: string,
    dentists: string[]
}

type CalendarProps = {
    dentist_id?: string
}

const CalendarAppointments: React.FC<CalendarProps> = ({ dentist_id }) => {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([])
    const [dentists, setDentists] = useState<Dentist[]>([])
    const [selectedDentistsIds, setSelectedDentistsIds] = useState<string[]>([])
    const [firstVisibleDate, setFirstVisibleDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [lastVisibleDate, setLastVisibleDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        goNext()
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
        goNext()
    }, [selectedDentistsIds, firstVisibleDate, lastVisibleDate]);

    const goNext = async () => {
        const calendarApi = calendarRef.current.getApi()
        const currentRange = calendarApi.currentData.dateProfile.currentRange
        const start = format(currentRange.start, 'yyyy-MM-dd')
        const end = format(currentRange.end, 'yyyy-MM-dd')
        setFirstVisibleDate(start)
        setLastVisibleDate(end)

        await fetchEvents({ start, end, dentists: selectedDentistsIds })
    }

    const fetchDentists = async () => {
        try {
            const response = await axios.get(`${enviroment.apiUrl}/dentists`);
            setDentists(response.data);
            setSelectedDentistsIds(response.data.map((dentist: Dentist) => dentist.id));
        } catch (error) {
            console.error('Error al cargar dentistas:', error);
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dentistId = event.target.value;
        if (event.target.checked) {
            setSelectedDentistsIds(prevSelected => [...prevSelected, dentistId]);
        } else {
            setSelectedDentistsIds(prevSelected => prevSelected.filter(id => id !== dentistId));
        }
    };

    const handleEventClick = (info: any) => {
        alert(`${info.event.title}\n${info.event.extendedProps.description}`);
    };

    const fetchEvents = async (filters: RequestEventsFilter) => {
        const { start, end } = filters
        try {
            const response = await axios.get(`${enviroment.apiUrl}/appointments?start=${start}&end=${end}&dentists=${filters.dentists.join(',')}`);
            if (response.data.length > 0) {
                setEvents(response.data);
            }
            } catch (error) {
                console.error('Error al cargar eventos:', error);
            }
        };

        const addAppointment = async (e: DateClickArg) => {
            try {

                const paciente = prompt("paciente");
                const fecha = e.dateStr
                const hora = prompt("hora");
                const dentista = prompt("dentista");
                const event = {
                    id: Math.random().toString(16),
                    title: paciente,
                    start: fecha + ' ' + hora,
                    color: 'green'
                };
                setEvents((prevEvents) => [...prevEvents, event]);

                //const response = await axios.post(`${enviroment.apiUrl}/appointments`, event);
                //console.log(response.data);
            } catch (error) {
                console.error('Error al crear el evento:', error);
            }
        };


        return (
            <>
                {!dentist_id && (<div>
                    <div>
                        <h2>Dentistas</h2>
                    </div>
                    <div>
                        {dentists.map((dentist: Dentist) => (

                            <div key={dentist.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={dentist.id}
                                        checked={selectedDentistsIds.includes(dentist.id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span style={{ backgroundColor: `#${dentist.id.replace(/-/g, '').slice(0, 6)}` }}>&nbsp;&nbsp;&nbsp;&nbsp;</span> {dentist.person.first_name} {dentist.person.last_name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>)}
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    events={events}
                    dayMaxEvents={5}
                    datesSet={goNext}
                    eventClick={handleEventClick}
                    timeZone='UTC'
                    locale={esLocale}
                    dateClick={e => addAppointment(e)}
                />
            </>
        )

    }

    export default CalendarAppointments