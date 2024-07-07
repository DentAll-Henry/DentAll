import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function CardTotalAppointments() {
  return (
    <div className='w-full flex flex-row  items-center'>
      <div className='w-[20%] p-3 flex items-center gap-4'>
        <Image 
          src="/images/profile.png"
          width={24}
          height={24}
          alt="foto de perfil"
          className='rounded-full' // Esto redondea la imagen para darle un aspecto de icono de perfil
        />
        <Link href="/page/admin">
          <p>Manuela Ochoa</p>
        </Link>
      </div>
      <div className='w-[10%] p-3'>
        <p>12/03/2024</p>
      </div>
      <div className='w-[7%] p-3'>
        <p>9:00</p>
      </div>
      <div className='w-[19%] p-3'>
        <p>Cirujano dental</p>
      </div>
      <div className='w-[27%] p-3'>
        <p>dolor de muelita en niño ademas una ortoncia</p>
      </div>
      <div className='w-[9%] p-2  bg-[#00FB5E] rounded-[5px]'>
        <p className='text-black font-medium'>Realizado</p>
      </div>
      <div className='w-[8%] p-3'>
        <p>Cancelar</p>
      </div>
    </div>
  );
}

export default CardTotalAppointments;
