import Image from 'next/image'
import React from 'react'
import SearchBar from '@/components/SearchBar/SearchBar';
import Link from 'next/link';
import NavDash from '@/components/NavBar/navDash';


const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />
      <div className="m-4 mt-24">
        <h2 className="text-[58px] text-center text-white font-bold leading-normal">
          <span className="text-[#00CE90]">Bienvenido/a </span> Manuel Ochoa
        </h2>
      </div>
      <div className="ml-8 text-xl">
        <h2 className="font-bold">SELECCIONA UN SERVICIO</h2>
      </div>

      <div className="flex  absolute">
        <div className="grid grid-cols-3 gap-14 w-[80%] m-8 p-4">
          <Link href="/page/dashboard_1/appointments">
            <div className="flex-col bg-[#3772FF40] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/citas1.svg"
                width={70}
                height={70}
                alt="Citas"
              />
              <p>Mis citas</p>
            </div>
          </Link>
          <Link href="/page/dashboard_1/payments">
            <div className="flex-col bg-[#00000040] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/Money.svg"
                width={70}
                height={70}
                alt="Pagos"
              />
              <p>Pagos</p>
            </div>
          </Link>
          <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-[#DF291540] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/historial.svg"
                width={70}
                height={70}
                alt="Historial Clinico"
              />
              <p>Historial Clinico</p>
            </div>
          </Link>
          {/* <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-amber-800 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/pagos.svg"
                width={35}
                height={35}
                alt="Pagos"
              />
              <p>Recetas Medicas</p>
            </div>
          </Link>
          <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-indigo-800 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/pagos.svg"
                width={35}
                height={35}
                alt="Pagos"
              />
              <p>Preguntas Frecuentes</p>
            </div>
          </Link>
          <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-orange-900 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/pagos.svg"
                width={35}
                height={35}
                alt="Pagos"
              />
              <p>Aun No Se Sabe</p>
            </div>
          </Link> */}
        </div>
      </div>
      <div className="flex justify-end items-end w-full absolute bottom-0 z-[-1] ">
        <Image
          className=""
          src="/images/sombra.svg"
          width={600}
          height={200}
          alt="Pagos"
        />
      </div>
    </div>
  );
}

export default page


//  <div className="w-full border-t border-gray-400 shadow-sm"></div>

// #3772FF40
// #00000040
// #DF291540
// #FDC84040
// #7737FF3D
// #FF5B373D