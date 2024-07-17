"use client";
import { useEffect, useState } from "react";
import CardPatient from "../CardPatient/CardPatient";
import axiosInstance from "@/utils/axiosInstance";

type Person = {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  birthdate: string;
  dni: string;
  email: string;
  location: string;
  nationality: string;
  phone: string;
  photo: string;
};

type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  last_appointment: string;
  photo: string;
};

type Dentist = {
  id: string;
  is_active: boolean;
  rate: number;
  description: string;
};

const PatientsList = () => {
  const [dentist, setDentist] = useState<Dentist>();
  const [patients, setPatients] = useState<Patient[]>();
  const [lastDates, setLastDates] = useState();

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);

      const getDentist = async () => {
        const response = await axiosInstance.get(
          `/dentists/person/${parsedUser.userData.id}`
        );
        setDentist({
          id: response.data.id,
          is_active: response.data.is_active,
          rate: response.data.rate,
          description: response.data.description,
        });
      };

      getDentist();
    }
  }, []);

  useEffect(() => {
    if (dentist) {
      const getPatients = async () => {
        const responsePatients = await axiosInstance.get(
          `/patients/dentist/${dentist?.id}`
        );

        const patientsArray = await Promise.all(
          responsePatients.data.map(async (p: any) => {
            const responseLastDate = await axiosInstance.get(
              `/appointments/last_appointment_date/${dentist.id}/${p.id}`
            );
            const date_time: string = responseLastDate.data.date_time;
            let currentDate: string;
            if (date_time) {
              currentDate = date_time.split("T")[0];
            } else {
              currentDate = "Sin registro";
            }
            return {
              id: p.id,
              name: `${p.person.first_name} ${p.person.last_name}`,
              phone: p.person.phone,
              email: p.person.email,
              last_appointment: currentDate,
              photo: p.person.photo,
            };
          })
        );
        setPatients(patientsArray);
      };
      getPatients();
    }
  }, [dentist]);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex flex-row gap-5 bg-gray-500 rounded-[5px]">
        <div className="w-[31%] p-3 ">
          <p>Nombre y apellidos</p>
        </div>

        <div className="w-[18%] p-3">
          <p>Teléfono</p>
        </div>

        <div className="w-[23%] p-3">
          <p>Email</p>
        </div>

        <div className="w-[14%] p-3">
          <p>Última cita</p>
        </div>

        {/* <div className="w-[14%] p-3">
          <p>Acciones</p>
        </div> */}
      </div>

      <div className="flex flex-col gap-2">
        {patients?.map((p) => {
          return (
            <CardPatient
              key={p.id}
              id={p.id}
              name={p.name}
              phone={p.phone}
              email={p.email}
              last_appointment={p.last_appointment}
              photo={p.photo}
              
            />
          );
        })}
      </div>
    </div>
  );
};

export default PatientsList;
