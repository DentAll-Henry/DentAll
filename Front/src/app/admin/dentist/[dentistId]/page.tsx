"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDentistId } from '@/helpers/dentist.helper';
import { DentistId, userSession } from '@/types';
import NavDash from '@/components/NavBar/navDash';

const DentistDetails = ({ params }: { params: { dentistId: string } }) => {
  const router = useRouter();
  const [dentist, setDentist] = useState<DentistId>();
  const [userData, setUserData] = useState<userSession>();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userSession');
      setUserData(JSON.parse(userData!));
    }

    const fetchData = async () => {
      const dentist = await getDentistId(params.dentistId);
      setDentist(dentist);
    };
    fetchData();
  }, [params.dentistId]);

  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative">
      <NavDash />
      <div className="m-8 p-4 mt-24">
        <div className="flex flex-col bg-darkD-500 gap-5 p-10 rounded-xl">
          <div className="flex flex-row justify-between pr-30">
            <div className="flex flex-row items-center gap-8">
              <img src={dentist?.person.photo} alt="perfil del dentista" width={80} height={80} />
              <h1 className="text-[24px] font-semibold">
                {dentist?.person.first_name} {dentist?.person.last_name}
              </h1>
            </div>
            <img src="/images/PencilSimple.svg" alt="" />
          </div>
          <div className="grid grid-cols-3 gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">INFORMACIÓN PERSONAL</p>
              <p><span className="text-darkD-300">DNI:</span> {dentist?.person.dni}</p>
              <p><span className="text-darkD-300">Fecha de nacimiento:</span> 25-01-2024</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">INFORMACIÓN DE CONTACTO</p>
              <p><span className="text-darkD-300">Teléfono:</span> {dentist?.person.phone}</p>
              <p><span className="text-darkD-300">Email:</span> {dentist?.person.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">DOMICILIO</p>
              <p><span className="text-darkD-300">Dirección:</span> {dentist?.person.address}</p>
              <p><span className="text-darkD-300">Localidad:</span> {dentist?.person.location}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-4 p-1 gap-4 my-5'>
          <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D5D84A21] justify-between items-center rounded-xl'>
            <p className='text-base'>Receta médica</p>
            <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713871/PillYellow_bp6ew7.svg" alt="icono capsula" />
          </div>

          <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#BC4AD821] justify-between items-center rounded-xl'>
            <p className='text-base'>Odontograma</p>
            <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713870/Tooth_wqy42e.svg" alt="icono capsula" />
          </div>

          <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D84A7521] justify-between items-center rounded-xl'>
            <p className='text-base'>Historial Clínico</p>
            <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713870/Books_hcufp5.svg" alt="icono capsula" />
          </div>

          <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D5D84A21] justify-between items-center rounded-xl'>
            <p className='text-base'>Receta médica</p>
            <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713871/PillYellow_bp6ew7.svg" alt="icono capsula" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistDetails;
