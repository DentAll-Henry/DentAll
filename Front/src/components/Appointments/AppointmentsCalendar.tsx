"use client";
import NavDash from "@/components/NavBar/navDash";
import React, { useEffect, useState } from "react";
import TotalAppointments from "@/components/TotalAppointments/TotalAppointments";
import CalendarAppointments from "@/components/Calendar/CalendarAppointments";
import axiosInstance from "@/utils/axiosInstance";
function AppointmentsCalendar() {
  const [dentist, setDentist] = useState("");

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);

      const getDentist = async () => {
        const response = await axiosInstance.get(
          `/dentists/person/${parsedUser.userData.id}`
        );
        if (response.data !== null) {
          setDentist(response.data.id);
        }
      };

      getDentist();
    }
  }, []);
  return (
    <>{dentist !== "" && <CalendarAppointments dentist_id={dentist} />}</>
  );
}

export default AppointmentsCalendar;
