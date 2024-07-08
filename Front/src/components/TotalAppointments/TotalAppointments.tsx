import React from 'react'
import CardTotalAppointments from '../CardTotalAppointments/CardTotalAppointments'
function TotalAppointments() {
  return (
    <div>
        <div className='flex flex-row gap-5  bg-gray-500 rounded-[5px]'>
            <div className='w-[20%] p-3 flex flex-row gap-4'>
                <p>Nombres y apellidos </p>
            </div>
            <div className='w-[10%] p-3'>
                <p>Fecha
                </p>
            </div>
            <div className='w-[7%] p-3'>
                <p>Hora</p>
            </div>
            <div className='w-[19%] p-3'>
                <p>Especialista Asignado</p>
            </div>
            <div className='w-[27%] p-3'>
                <p>Tipo de consulta </p>
            </div>
            <div className='w-[9%] p-3'>
                <p>Pago</p>
            </div>
            <div className='w-[8%] p-3'>
                <p>Acciones</p>
            </div>
        </div>
        <div>
            <CardTotalAppointments />
            <CardTotalAppointments />
            <CardTotalAppointments />
            <CardTotalAppointments />
        </div>
    </div>
  )
}

export default TotalAppointments
