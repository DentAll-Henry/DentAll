"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPatientId } from '@/helpers/patients.helper';
import { AppointmentId, PatientId, userSession } from '@/types';
import { getAppointmentId } from '@/helpers/appointments.helper';

const DetailsId = ({params}:{params:{patientId:string}}) => {
  const router = useRouter();
  const [patient, setPatient] = useState<PatientId>();
  const [userData,setUserData] = useState<userSession>()
  const [appointment,setAppointment] = useState<AppointmentId[]>([]);

  useEffect(() => {

    if(typeof window !== 'undefined' && window.localStorage){
      const userData= localStorage.getItem('userSession')
      setUserData(JSON.parse(userData!));
    }

    const fetchData = async () => {
      const patient= await getPatientId(params.patientId);
      setPatient(patient);
    }
    fetchData();
  },[])

  useEffect(() => {

    if(typeof window !== 'undefined' && window.localStorage){
      const userData= localStorage.getItem('userSession')
      setUserData(JSON.parse(userData!));
    }

    const fetchAppointment= async () => {
      const appointment= await getAppointmentId(params.patientId);
      setAppointment(appointment);
    }
    fetchAppointment();
  },[])

  console.log("Appointment",appointment)



  return (
    <div>
      {patient ? (
        <div>Soy el paciente con ID: {patient.id}</div>
      ) : (
        <div>Cargando datos del paciente...</div>
      )}
    </div>
  );
}

export default DetailsId;
