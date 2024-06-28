"use client";

import React, { useEffect, useState } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
}

const Appointments: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "/api/calendar?code=YOUR_AUTHORIZATION_CODE"
        );
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong> -{" "}
            {new Date(event.start.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
