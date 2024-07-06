import Image from "next/image";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import NavDash from "@/components/NavBar/navDash";

const DashboardPage = () => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%]">
      <NavDash />

      <div className="ml-8 text-xl mt-[15%]">
        <h2 className="font-bold">MI ASISTENTE PERSONAL</h2>
      </div>
      <div className="flex flex-wrap gap-8 w-[70%] m-8">
        <Link href="/dashboard_3/mi_agenda">
          <div className="flex-col bg-sky-900 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201245/citas1_fhc7so.svg"
              width={70}
              height={70}
              alt="Mi Agenda"
            />
            <p>Mi agenda</p>
          </div>
        </Link>
        <Link href="/page/professional/patientsL">
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
        <Link href="/dashboard_3/recomendaciones_a_pacientes">
          <div className="flex-col bg-red-900 w-[200px] h-[150px] rounded-md border flex justify-center text-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201231/Video_sbjwer.svg"
              width={70}
              height={70}
              alt="Recomendaciones a Pacientes"
            />
            <p>Recomendaciones a pacientes</p>
          </div>
        </Link>
        <Link href="/dashboard_3/recetas_medicas">
          <div className="flex-col bg-amber-800 w-[200px] h-[150px] rounded-md border flex justify-center items-center hover:scale-105 transition-transform duration-300">
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201326/recetass_si2se4.svg"
              width={70}
              height={70}
              alt="Recetas Médicas"
            />
            <p>Recetas Médicas</p>
          </div>
        </Link>
      </div>

      <div className="flex justify-end mr-4">bots</div>
    </div>
  );
};

export default DashboardPage;
