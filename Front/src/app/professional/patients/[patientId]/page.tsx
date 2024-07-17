
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NavDash from '@/components/NavBar/navDash'
import Link from 'next/link'
import { userSession } from '@/types';
import { getPatientDentistId } from '@/helpers/patients.helper'
import { format } from 'date-fns'

 interface PatientId{
  id: string;
  person:{
    id:string;
    first_name:string;
    last_name:string;
    birthdate:Date;
    dni:string;
    phone:string;
    email:string;
    address:string;
    location:string;
    nationality:string;
    is_auth0: boolean;
    photo:string;
    deleteDate:null
  };

}


function DetailsId({ params }: { params: { patientId: string } }) {
  const [userData, setUserData] = useState<userSession>();
  const [patient, setPatient] = useState<PatientId>();

    //INFORMACION DEL PACIENTE
    useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const userData = localStorage.getItem('userSession');
        setUserData(JSON.parse(userData!));
      }
  
      const fetchData = async () => {
        const patient = await getPatientDentistId(params.patientId);
        setPatient(patient);
      };
      fetchData();
    }, [params.patientId]);

    console.log("soy el paciente",patient)
  

  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative">
      <NavDash />
      <div className="m-8 p-4 mt-24">
        {/* CONTENEDOR DEL INFORMACION DEL PACIENTE */}
        <div className="flex flex-col bg-darkD-500 gap-5 p-10 rounded-xl">
          <div className="flex flex-row justify-between pr-30">
            <div className="flex flex-row items-center gap-8">
              <img src={patient?.person.photo} alt="perfil del paciente" width={80} height={80} />
              <h1 className="text-[24px] font-semibold">
                {patient?.person.first_name} {patient?.person.last_name}
              </h1>
            </div>
            {/* <img src="/images/PencilSimple.svg" alt="" /> */}
          </div>
          <div className="grid grid-cols-3 gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">INFORMACIÓN PERSONAL</p>
              <p><span className="text-darkD-300">DNI:</span> {patient?.person.dni}</p>
              <p><span className="text-darkD-300">Fecha de nacimiento:</span> {patient?.person.birthdate ? format(new Date(patient.person.birthdate), "dd-MM-yyyy") : "No disponible"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">INFORMACIÓN DE CONTACTO</p>
              <p><span className="text-darkD-300">Teléfono:</span> {patient?.person.phone}</p>
              <p><span className="text-darkD-300">Email:</span> {patient?.person.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">DOMICILIO</p>
              <p><span className="text-darkD-300">Dirección:</span> {patient?.person.address}</p>
              <p><span className="text-darkD-300">Localidad:</span> {patient?.person.location}</p>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DE SERVICIOS */}
        <div className='grid grid-cols-4 p-1 gap-4 my-5'>
            <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D5D84A21] justify-between items-center  rounded-xl'>
              <p className='text-base'>Receta médica</p>
              <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713871/PillYellow_bp6ew7.svg" alt="icono capsula" />
            </div>

            <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#BC4AD821] justify-between items-center  rounded-xl'>
              <p className='text-base'>Odontograma</p>
              <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713870/Tooth_wqy42e.svg" alt="icono capsula" />
            </div>

            <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D84A7521] justify-between items-center  rounded-xl'>
              <p className='text-base'>Historial Clínico</p>
              <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713870/Books_hcufp5.svg" alt="icono capsula" />
            </div>

            <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#7ed84a21] justify-between items-center  rounded-xl'>
              <p className='text-base'>Crear nueva orden </p>
              <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720887373/NotePencil_axapbz.svg "/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsId
