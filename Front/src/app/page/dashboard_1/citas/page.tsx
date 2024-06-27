import SearchBar from '@/components/SearchBar/SearchBar';
import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%]">
      <div className="border-b border-solid border-gray-300 shadow-top-white flex justify-between items-center w-full p-4">
        <div>
          <SearchBar />
        </div>
        <div className="flex gap-3">
          <div className="mr-10">
            <Image
              src="/images/notificacion.svg"
              width={24}
              height={24}
              alt="Notificaciones"
            />
          </div>
          <Image src="/images/user.svg" width={30} height={30} alt="" />
          <p>Manuel Ochoa</p>
        </div>
      </div>
      <div className="w-full border-t border-gray-400 shadow-sm"></div>
      <div className="flex justify-between items-center m-4">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          Mis <span className="text-[#00CE90]">citas</span>
        </h2>
        <button className=" bg-[#00CE90] h-[40px] p-4 text-[#0D0508] font-maven-pro text-[16px] font-semibold ">
          AGENDAR NUEVA CITA
        </button>
      </div>
      <div>
        <h2 className="font-bold">PROXIMAS CITAS</h2>
      </div>
    </div>
  );
}

export default page
