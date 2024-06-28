import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Image from 'next/image';

const NavDash = () => {
  return (
    <div className="fixed z-50 w-[80%] bg-darkD-500">
      <div className="border-b border-solid border-gray-300 shadow-top-white flex justify-between items-center w-full p-4 ">
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
    </div>
  );
}

export default NavDash
