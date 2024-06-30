import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Image from 'next/image';
import Link from 'next/link';

const NavDash = () => {
  return (
    <div className="fixed z-50 w-[80%] bg-darkD-500 items-center ">
      <div className="border-b border-solid border-gray-300 shadow-top-white flex justify-between items-center w-full p-4 px-8 ">
        <div>
          <SearchBar />
        </div>

        <div className="flex gap-3 items-center">
          <div className="mr-10">
            <Link href="/page/dashboard_patients/notifications">
              <Image
                src="/images/notificacion.svg"
                width={24}
                height={24}
                alt="Notificaciones"
              />
            </Link>
          </div>
          <Link
            href="/page/dashboard_patients/account"
            className="flex items-center gap-4"
          >
            <Image src="/images/user.svg" width={40} height={30} alt="" />
            <p className="">Jhon Doe</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavDash
