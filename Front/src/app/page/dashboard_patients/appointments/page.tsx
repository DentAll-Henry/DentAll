import SearchBar from '@/components/SearchBar/SearchBar';
import Image from 'next/image';
import React from 'react'
import NavDash from '@/components/NavBar/navDash';
import Link from 'next/link';

const page = () => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%]">
      <NavDash />
      <div className="flex justify-between items-center m-8 mt-24">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          Mis <span className="text-[#00CE90]">citas</span>
        </h2>
      </div>
      <div>
        <h2 className="font-bold ml-8">PROXIMAS CITAS</h2>
      </div>
      <div className="flex justify-end">
        <Link href="#">
          <p>+ Agregar cita</p>
        </Link>
      </div>
      <div className="bg-darkD-500 flex justify-around p-4 rounded-md m-8">
        <p>Fecha</p>
        <p>Hora</p>
        <p>Tipo de consulta</p>
        <p>Estado</p>
        <Image
          className="group-hover:fill-current text-white"
          src="/images/NotePencil.svg"
          width={35}
          height={35}
          alt="Pagos"
        />
        <Image
          className="group-hover:fill-current text-white"
          src="/images/ToggleLeft.svg"
          width={35}
          height={35}
          alt="Pagos"
        />
      </div>
      <div className="bg-darkD-700 flex justify-around p-4 rounded-md m-8">
        <p className="bg-darkD-500 p-4 w-[15%]">27/06/2024</p>
        <p className="bg-darkD-500 p-4 w-[15%]">14:00</p>
        <p className="bg-darkD-500 p-4 w-[30%]">Dolor de muelita</p>
        <p className="bg-[#0B5B12] p-4 w-[15%] ">Activo</p>
        <Image
          className="group-hover:fill-current text-white"
          src="/images/NotePencil.svg"
          width={35}
          height={35}
          alt="Pagos"
        />
        <p className="bg-darkD-500 p-4 w-[15%] ">cancelar</p>
      </div>
    </div>
  );
}

export default page
