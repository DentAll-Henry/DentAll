import React from 'react'
import CardTotalPatient from '../CardTotalPatient/CardTotalPatient'
import Image from 'next/image'
import CardTotalDentist from '../CardTotalDentist/CardTotalDentist'
const TotalDentist = () => {
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

            <div className='w-[28%] p-3'>
                <p >Especialidad</p>
            </div>

            {/* <div className='w-[14%] p-3'>
                <p>Acciones</p>
            </div> */}

        </div>

        <div className='flex flex-col gap-2'>
            <CardTotalDentist/>
          
        </div>

        <div className='flex flex-row gap-4 justify-center items-center border border-darkD-400 rounded-[5px] p-3'>
            <p>Agregar nuevo profesional</p>
            <Image
                        src="/images/IconPlus.svg"
                        width={24}
                        height={24}
                        alt="pluss"
                    />
        </div>

      
    </div>
  )
}

export default TotalDentist
