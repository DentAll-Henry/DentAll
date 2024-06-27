import SearchBar from '@/components/SearchBar/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
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

      <div className="m-4 bg-darkD-500 p-4">
        <h2 className="text-2xl font-bold">Datos de pago</h2>
        <p>
          Administra tus pagos, Encuentra tu utimo pago Todo eso lo puedeshacer
          aqui
        </p>
        <div>
          <p className="font-bold">Nombres:</p>
          <p className="font-bold">Metodo de pago:</p>
        </div>
      </div>

      <div className="  m-4 text-xl">
        <h2 className="font-bold">Historial de pagos</h2>
      </div>
      <div className="flex flex-wrap gap-8 w-[90%] m-auto">
        <Link href="/page/dashboard_1/citas">
          <div className="flex-col bg-green-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="/images/citas1.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
            <p>Mis citas</p>
          </div>
        </Link>
        <Link href="/page/dashboard_1/citas">
          <div className="flex-col bg-green-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="/images/pagos.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
            <p>Pagos</p>
          </div>
        </Link>
        <Link href="/page/dashboard_1/citas">
          <div className="flex-col bg-green-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="/images/pagos.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
            <p>Recomendaciones</p>
          </div>
        </Link>
        <Link href="/page/dashboard_1/citas">
          <div className="flex-col bg-green-500 bg-opacity-5 w-[200px] h-[150px] rounded-md  flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="/images/pagos.svg"
              width={35}
              height={35}
              alt="Pagos"
            />
            <p>Recomendaciones</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-end mr-4">bots</div>
    </div>
  );
}

export default page
