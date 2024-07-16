"use client";
import Image from "next/image";

import DoctorCard from "../DoctorCards/DoctorCard";
import MapComponent from "@/components/Maps/maps";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Gradiente from "../Gradiente/Gradiente";
import GradienteAzul from "../GradienteAzul/GradienteAzul";
import Circular from "../Circular/Circular";
import Link from "next/link";

type Dentist = {
  name: string;
  specialty: string;
  description: string;
  rate: string;
  imageSrc: string;
  id: string;
};

const LandingPage = () => {
  const [best4Dentist, setBest4Dentist] = useState<Dentist[]>()

  useEffect(() => {
    const getBest4Dentists = async () => {
      const response = await axiosInstance.get('/dentists/best4');
      const dentists = response.data;
      const dentistsArray = dentists.map((d: any) => {
        return ({
          name: `Dr. ${d.person.first_name} ${d.person.last_name}`,
          specialty: `${d.specialty.name}`,
          description: `${d.description}`,
          rate: `${d.rate}`,
          imageSrc: `${d.person.photo}`,
          id: `${d.id}`
        });
      });
      setBest4Dentist(dentistsArray);
    }

    getBest4Dentists();
  }, [])

  return (
    <div>
      <section className="relative flex flex-row bg-[#1D1D1D] mt-8">
        <div className=" absolute top-[106px] left-[-212px]">
          <Gradiente />
        </div>
        
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex flex-col gap-[50px]">
            <div className=" text-white flex flex-col gap-0 text-[58px] font-bold leading-normal ">
              <h2>ILUMINA </h2>
              <h2 className="text-[#00CE90]">TU SONRISA</h2>
              <h2>CON NOSOTROS </h2>
            </div>
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720979746/dentall4_tcldwh.svg"
              alt="dental custum"
              width={600}
              height={400}
            />
          </div>
        </div>

        <div className=" w-1/2  ">
          <div className=" w-[85%] flex flex-col justify-between  gap-[72px] pt-6">
            <div className="flex flex-col gap-[31px]">
              <p className="text-white">
                Confía en nosotros para cuidar tu sonrisa. Asegura la salud y
                protección de tu sonrisa con nuestro equipo de expertos en
                odontología. Nuestros servicios ofrecen respuestas rápidas y
                atención personalizada.
              </p>
              <div className="flex flex-row gap-5">
                <div className="w-[31%] text-[16px]  text-center text-yellow-300 font-semibold brounded-[5px] p-3 shadow-[3px_7px_7.8px_0px_rgba(212,206,54,0.25)]">
                Sonrisa 
              </div>
              <div className="w-[5%] text-[16px] text-red-600 font-bold rounded-[5px] p-3">
                + {" "}
              </div>
              <div className="w-[31%] text-[16px]  text-center text-white font-semibold brounded-[5px] p-3 shadow-[3px_7px_7.8px_0px_rgba(255,255,255,0.25)]">
                Perfecta {" "}
              </div>
              <div className="w-[5%] text-[16px] text-red-600 font-bold rounded-[5px] p-3">
                = {" "}
              </div>
              <div className="w-[31%] text-[16px] text-[#00CE90] text-center font-bold rounded-[5px] p-3 shadow-[3px_7px_7.8px_0px_rgba(0,206,144,0.25)]">
                  DentAll
              </div>
              </div>
              
            </div>
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720978937/dentall3_lfqjgq.svg"
              alt="dental custum"
              width={700}
              height={700}
            />
          </div>
        </div>
        <div className="absolute top-[22px] right-[127px]">
          <Circular />
        </div>
        
      </section>

      <section className=" flex flex-row bg-[#1D1D1D]">
        
        <div className="w-full flex justify-center items-center h-[200px]">
          <h2 className="text-white font-bold text-[48px] leading-tight whitespace-nowrap">
            NUESTRO EQUIPO DE{" "}
            <span className="text-[#00CE90]">PROFESIONALES</span>
          </h2>
        </div>
      </section>

      <section className=" relative bg-[#1D1D1D] py-8">
      <div className=" absolute top-[40px] left-[152px]">
          <Circular />
        </div>
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {
            best4Dentist?.map((d) => {
              return <DoctorCard key={d.id}
              name={d.name}
              specialty={d.specialty}
              description={d.description}
              imageSrc={d.imageSrc}
            />
            })
          }
        
        </div>
        <div className="absolute top-[22px] right-[277px]">
          <Circular/>
        </div>
      </section>

      <section className="flex flex-col bg-[#1D1D1D] p-10 gap-5">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
        </h2>
        <div className="flex flex-row gap-12 ">
          <Link href="/services">
          <div className="bg-[#00CE90] flex flex-col gap-3 p-9 rounded-lg">
            <h3 className="text-[34px] font-semibold">Carillas dentales</h3>
            <p className="text-[16px] font-semibold">
              {" "}
              Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental
              profesional elimina manchas y decoloraciones para un aspecto más
              luminoso y juvenil
            </p>
            <div className="flex justify-center pr-16">
              <Image
                className="text-center"
                src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720202033/dentalVeneer_o1frhb.webp"
                alt=""
                width={150}
                height={150}
              />
            </div>
          </div>
          </Link>

         <Link href="/services">
          <div className="bg-white flex flex-col gap-3 p-9 rounded-lg">
              <h3 className="text-[34px] font-semibold">Blanqueamiento dental</h3>
              <p className="text-[16px] font-semibold">
                {" "}
                Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental
                profesional elimina manchas y decoloraciones para un aspecto más
                luminoso y juvenil
              </p>
              <div className="flex justify-center pr-16">
                <Image
                  className="text-center"
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720194372/toothWhite_sbnslv.webp"
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
            </div>
         </Link>
        </div>

        <Link href="/services">
        <div className="flex flex-row gap-8 text-center">
          <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
           Implantes dentales
          </div>
          <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
            Reconstrucción Dental
          </div>
          <div className="bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg">
            Puentes dentales
          </div>
        </div>
        </Link>
      </section>

      <section className="relative">

        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          <span className="text-[#00CE90]">UBICANOS </span> EN EL MAPA
        </h2>
        <div className="flex flex-row text-white">
          <div className="w-[150%] p-12">
            <MapComponent />
          </div>
        </div>
        <div className="absolute top-[194px] right-[277px]">
          <Circular/>
        </div>
      </section>

      <section className=" flex flex-col gap-5 p-20 text-center bg-[#1D1D1D]">
          
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">CLIENTES</span> NOS
          RECOMIENDAN
        </h2>
        <div className="flex flex-row gap-10 ">
          <div className=" w-1/4 flex flex-col  gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6">
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201351/testimonio1_mwe92r.svg"
              alt="Paciente"
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Maria José Vargas</h4>
            <p className="text-[16px] font-medium">
              La atención en el servicio de blanqueamiento dental fue muy bueno,
              me ayudó a tener un aspecto más luminoso y bonito en mi sonrisa.Lo
              recomiendo y ¡Gracias por cuidar de mi sonrisa!
            </p>
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201348/starts_patmun.svg"
              alt="Puntuación"
              width={150}
              height={150}
            />
          </div>
          <div className=" w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6">
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201358/testimonio2_ldacag.svg"
              alt="Paciente"
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Carlos Nuñez </h4>
            <p className="text-[16px] font-medium">
              DentAll ha cambiado completamente mi percepción de las visitas
              dentales. La atención personalizada y la tecnología de vanguardia
              hacen que cada cita sea rápida y sin dolor
            </p>
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201348/starts_patmun.svg"
              alt="Puntuación"
              width={150}
              height={150}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6 ">
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201367/testimonio3_fpesyu.svg"
              alt="Paciente"
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Bianca Santillana</h4>
            <p className="text-[16px] font-medium">
              Desde que empecé a ir a DentAll, mis visitas al dentista han sido
              una experiencia agradable. El personal es amable y atento, y las
              instalaciones son de primera. ¡Recomiendo Dental a todos!
            </p>
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201348/starts_patmun.svg"
              alt="Puntuación"
              width={150}
              height={150}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6 ">
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201362/testimonio4_zy4fgd.svg"
              alt="Paciente"
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Gustavo Garcia</h4>
            <p className="text-[16px] font-medium">
              Mi experiencia en DentAll ha sido excepcional. Desde la bienvenida
              hasta el final del tratamiento, todo el equipo se ha mostrado
              profesional y dedicado. ¡Mi sonrisa nunca se ha visto mejor
              gracias a Dental!
            </p>
            <Image
              className="text-center"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201348/starts_patmun.svg"
              alt="Puntuación"
              width={150}
              height={150}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
