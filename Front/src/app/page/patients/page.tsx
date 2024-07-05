import Image from "next/image";

import Link from "next/link";
import NavDash from "@/components/NavBar/navDash";

const page = () => {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative">
      <NavDash />
      <div className="m-4 mt-24">
        <h2 className="text-[58px] text-center text-white font-bold leading-normal">
          <span className="text-[#00CE90]">Bienvenido/a </span>
        </h2>
      </div>
      <div className="ml-12 text-xl ">
        <h2 className="font-bold">SELECCIONA UN SERVICIO</h2>
      </div>

      <div className="flex  absolute">
        <div className="grid grid-cols-3 gap-14 w-[80%] m-8 p-4">
          <Link href="/page/patients/appointments">
            <div className="flex-col bg-[#3772FF40] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/citas1.svg"
                width={70}
                height={70}
                alt="Mis Citas"
              />
              <p>Mis citas</p>
            </div>
          </Link>
          <Link href="/page/patients/payments">
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
          <Link href="/page/patients/recommendations">
            <div className="flex-col bg-[#DF291540] w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/Video.svg"
                width={70}
                height={70}
                alt="Recomendaciones"
              />
              <p>Recomendaciones</p>
            </div>
          </Link>
          <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-[#FDC84040] w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/recetass.svg"
                width={70}
                height={70}
                alt="Recetas Medicas"
              />
              <p>Recetas Medicas</p>
            </div>
          </Link>
          <Link href="#">
            <div className="flex-col bg-[#FF5B373D] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
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
          <Link href="/page/dashboard_1/citas">
            <div className="flex-col bg-[#3772FF40]  w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="/images/preguntas.svg"
                width={70}
                height={70}
                alt="Preguntas Frecuentes"
              />
              <p>Preguntas Frecuentes</p>
            </div>
          </Link>
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
};

export default page;

//  <div className="w-full border-t border-gray-400 shadow-sm"></div>

// #3772FF40
// #00000040
// #DF291540
// #FDC84040
// #7737FF3D
// #FF5B373D
