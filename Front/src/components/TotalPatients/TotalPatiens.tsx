import React from 'react'
import CardTotalPatient from '../CardTotalPatient/CardTotalPatient'

const TotalPatiens = () => {
  return (
    <div className='flex flex-col gap-3'>
        <div className='w-full flex flex-row gap-5 bg-gray-500 rounded-[5px]'>
            <div className='w-[31%] p-3 '>
                <p>Nombre y apellidos</p>
            </div>

            <div className='w-[18%] p-3'>
                <p>Teléfono</p>
            </div>
            
            <div className='w-[23%] p-3'>
                <p>Email</p>
            </div>

            <div className='w-[14%] p-3'>
                <p>Última cita</p>
            </div>

            <div className='w-[14%] p-3'>
                <p>Acciones</p>
            </div>

        </div>

        <div className='flex flex-col gap-2'>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
            <CardTotalPatient/>
        </div>

        

      
    </div>
  )
}

export default TotalPatiens
