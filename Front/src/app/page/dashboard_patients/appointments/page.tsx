import React from 'react'
import NavDash from '@/components/NavBar/navDash';
import Link from 'next/link';
import Citas from '@/components/Citas/Citas';
import Citasr from '@/components/CitasRealizadas/CitasRealizadas';

const page = () => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%]">
      <NavDash />
      <div className="flex justify-between items-center m-8 mt-24">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          Mis <span className="text-[#00CE90]">citas</span>
        </h2>
      </div>
      <div className="flex justify-between">
      <div>
        <h2 className="font-bold ml-8">PROXIMAS CITAS</h2>
      </div>
        <Link href="#">
          <p className="bg-gray-500 p-1 mr-8 rounded-md">+ Agregar cita</p>
        </Link>
      </div>
      <div>
        <Citas />
      </div>
      <div>
        <h2 className="font-bold ml-8 mt-20 ">CITAS REALIZADAS</h2>
      </div>
    <div>
<Citasr/>
    </div>
    </div>
  );
}

export default page
