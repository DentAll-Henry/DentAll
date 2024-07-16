"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPatientId } from '@/helpers/patients.helper';
import { AppointmentId, PatientId, PaymentId, userSession } from '@/types';
import { getAppointmentId } from '@/helpers/appointments.helper';
import NavDash from '@/components/NavBar/navDash';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getPaymentId } from '@/helpers/payment.helper';
import Image from 'next/image';

const DetailsId = ({ params }: { params: { patientId: string } }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<userSession>();
  const [patient, setPatient] = useState<PatientId>();
  const [appointment, setAppointment] = useState<AppointmentId[]>([]);
  const [payment, setPayment] = useState<PaymentId[]>([])


  //INFORMACION DEL PACIENTE
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userSession');
      setUserData(JSON.parse(userData!));
    }

    const fetchData = async () => {
      const patient = await getPatientId(params.patientId);
      setPatient(patient);
    };
    fetchData();
  }, [params.patientId]);


 //  INFORMACION DE LAS CITAS 
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userSession');
      setUserData(JSON.parse(userData!));
    }

    const fetchAppointment = async () => {
      const appointment = await getAppointmentId(params.patientId);
      setAppointment(appointment);
    };
    fetchAppointment();
  }, [params.patientId]);

  console.log("Appointment", appointment)

  //  INFORMACION DE LOS PAGOS
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('userSession');
      setUserData(JSON.parse(userData!));
    }

    const fetchPayment = async () => {
      const payment = await getPaymentId(params.patientId);
      setPayment(payment);
    };
    fetchPayment();
  }, [params.patientId]);

  console.log("PAYMENT", payment)



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
            <img src="/images/PencilSimple.svg" alt="" />
          </div>
          <div className="grid grid-cols-3 gap-24">
            <div className="flex flex-col gap-2">
              <p className="text-greenD-500">INFORMACIÓN PERSONAL</p>
              <p><span className="text-darkD-300">DNI:</span> {patient?.person.dni}</p>
              <p><span className="text-darkD-300">Fecha de nacimiento:</span> 25-01-2024</p>
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

            <div className='flex flex-row gap-1 pl-14 pr-4 py-1 bg-[#D5D84A21] justify-between items-center  rounded-xl'>
              <p className='text-base'>Receta médica</p>
              <img src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720713871/PillYellow_bp6ew7.svg" alt="icono capsula" />
            </div>
        </div>

        {/* CONTENEDOR DE CITAS*/}

        <div className='flex flex-col gap-4'>
          <h3>Citas Pendientes</h3>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row bg-darkD-500 rounded-md gap-1'>
              <div className='w-[14%] px-4 py-2'>Fecha</div>
              <div className='w-[9%] px-4 py-2'>Hora</div>
              <div className='w-[20%] px-4 py-2'>Especialista </div>
              <div className='w-[30%] px-4 py-2'>Tipo de consulta</div>
              <div className='w-[10%] px-2 py-2'>Pago</div>
              <div className='w-[16%] px-4 py-2'>Acciones</div>
            </div>
            
            <div className='flex flex-col gap-2'>
                {appointment.map((i) => {
                  return(
                    <div key={i.id} className='flex flex-row  rounded-md gap-1 '>
                      <div className='w-[14%] px-4 py-2'>{format(i.date_time,"dd-MM-yyyy")}</div>
                      <div className='w-[9%] px-4 py-2'>{format(toZonedTime(i.date_time,"UTC"),"HH:mm")}</div>
                      <div className='w-[20%] px-4 py-2'>Dr. {i.dentist_id.person.first_name} {i.dentist_id.person.last_name}</div>
                      <div className='w-[30%] px-4 py-2'>{i.service.name}</div>
                      <div className='w-[10%] px-2 py-2 bg-[#00FB5E] rounded-md text-black font-medium text-center'>Realizado</div>
                      <div className='w-[16%] px-4 py-2  rounded-md bg-[#FF2F44] text-center'>Cancelar</div>
                    </div>
                  )
                } )}
              
            </div>
            

          </div>
          
        </div>

        {/* CONTENEDOR DE PAGOS */}
        <div className='flex flex-col my-4 gap-4 '>
          <h3>Pagos Realizados</h3>
          <div>
            {payment.map((i)=>{
              return (
                
                  <div key={i.id} className="">
                    <div className="flex-col bg-greenD-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300 gap-2">
                      <p className="text-[#60D66A]">{i.dentalServ.name}</p>
                      <p className="text-[#60D66A]">${i.dentalServ.price}</p>
                      
                      <Image
                        className="group-hover:fill-current text-white"
                        src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201228/Vector_b9qqdm.svg"
                        width={35}
                        height={35}
                        alt="Pagos"
                      />
                      <p className="text-[#60D66A] text-sm">{ format(i.appointment.date_time,"dd/MM/yyyy")}</p>
                    </div>
          </div>
                
              )
            })}

              
          </div>

        </div>
        
        

      </div>
    </div>
  );
};

export default DetailsId;