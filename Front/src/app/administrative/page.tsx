import NavDash from "@/components/NavBar/navDash"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-[80%] text-white ml-[20%] relative">
      <NavDash />

      <div className="ml-12 text-xl mt-[10%]">
        <h2 className="font-bold">Selecciona un servicio</h2>
      </div>

      <div className="flex absolute">
        <div className="grid grid-cols-3 gap-14 w-[80%] m-8 p-4">
          <Link href="/administrative/appointments">
            <div className="flex-col bg-[#3772FF40] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201245/citas1_fhc7so.svg"
                width={70}
                height={70}
                alt="Agendar citas"
              />
              <p>Agendar citas</p>
            </div>
          </Link>
          <Link href="/administrative/patients">
            <div className="flex-col bg-black w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201242/citas_bpks2p.svg"
                width={70}
                height={70}
                alt="Pacientes"
              />
              <p>Pacientes</p>
            </div>
          </Link>
          {/* <Link href="/patients/payments">
            <div className="flex-col bg-[#00000040] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201292/Money_waysha.svg"
                width={70}
                height={70}
                alt="Pagos"
              />
              <p>Pagos</p>
            </div>
          </Link> */}
          {/* <Link href="/patients/recommendations">
            <div className="flex-col bg-[#DF291540] w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201231/Video_sbjwer.svg"
                width={70}
                height={70}
                alt="Agregar recomendaciones"
              />
              <p>Agregar recomendaciones</p>
            </div>
          </Link> */}
          {/* <Link href="/dashboard_1/citas">
            <div className="flex-col bg-[#FDC84040] w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201326/recetass_si2se4.svg"
                width={70}
                height={70}
                alt="Recetas Medicas"
              />
              <p>Recetas Medicas</p>
            </div>
          </Link> */}
          <Link href="administrative/services">
            <div className="flex-col bg-[#FDC84040] w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201326/recetass_si2se4.svg"
                width={70}
                height={70}
                alt="Editar servicios"
              />
              <p>Editar servicios</p>
            </div>
          </Link>

          {/* <Link href="#">
            <div className="flex-col bg-[#FF5B373D] gap-1 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201268/historial_d1b9j7.svg"
                width={70}
                height={70}
                alt="Historial Clinico"
              />
              <p>Historial Clinico</p>
            </div>
          </Link>
          <Link href="/dashboard_1/citas">
            <div className="flex-col bg-[#3772FF40]  w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
              <Image
                className="group-hover:fill-current text-white"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201314/preguntas_oqccbj.svg"
                width={70}
                height={70}
                alt="Preguntas Frecuentes"
              />
              <p>Preguntas Frecuentes</p>
            </div>
          </Link> */}
        </div>
      </div>
      <div className="flex justify-end items-end w-full absolute  z-[-1] ">
        <Image
          className=""
          src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201344/sombra_mqwiqc.svg"
          width={600}
          height={200}
          alt="Clinica"
        />
      </div>
    </div>
  )
}

export default page
