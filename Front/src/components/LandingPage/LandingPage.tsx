"use client";
import Image from "next/image";
import React from "react";
import DoctorCard from "../DoctorCards/DoctorCard";
import MapComponent from "@/components/Maps/maps";
import Services from "../services/services";

const LandingPage = () => {
  return (
    <div>
      <section className="flex flex-row bg-[#1D1D1D] ">
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex flex-col p-7 gap-[50px]">
            <div className=" text-white flex flex-col gap-0 text-[58px] font-bold leading-normal ">
              <h2>ILUMINA </h2>
              <h2 className="text-[#00CE90]">TU SONRISA</h2>
              <h2>CON NOSOTROS </h2>
            </div>
            <Image
              src="/images/dental1.svg"
              alt="dental custum"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="w-1/2 pt-10">
          <div className=" w-[80%] flex flex-col p-4 gap-[40px]">
            <div className="flex flex-col gap-[31px]">
              <p className="text-white">
                Confía en nosotros para cuidar tu sonrisa. Asegura la salud y
                protección de tu sonrisa con nuestro equipo de expertos en
                odontología. Nuestros servicios ofrecen respuestas rápidas y
                atención personalizada.
              </p>
              <button className="w-[35%] text-[16px] text-[#00CE90] font-semibold border border-[#00CE90] rounded-[1px] p-3">
                Agendar cita{" "}
              </button>
            </div>
            <Image
              src="/images/dental2.svg"
              alt="dental custum"
              width={700}
              height={700}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-row bg-[#1D1D1D]">
        <div className="w-full flex justify-center items-center h-[200px]">
          <h2 className="text-white font-bold text-[48px] leading-tight whitespace-nowrap">
            NUESTRO EQUIPO DE{" "}
            <span className="text-[#00CE90]">PROFESIONALES</span>
          </h2>
        </div>
      </section>

      <section className="bg-[#1D1D1D] py-8">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          <DoctorCard
            name="Dr. Jorge Calvo"
            specialty="Cirujano dental"
            description="Cirujano dental especializado en extracciones complejas e implantes. Con más de 10 años de experiencia, asegura el bienestar de sus pacientes."
            imageSrc="/images/dr1.png"
          />
          <DoctorCard
            name="Dra. Ana Perez"
            specialty="Ortodoncista"
            description="Experta en corrección de maloclusiones. Utiliza las últimas tecnologías para proporcionar sonrisas hermosas y saludables."
            imageSrc="/images/dra1.png"
          />
          <DoctorCard
            name="Dr. Juan López"
            specialty="Periodoncista"
            description="Especializado en enfermedades de las encías. Su enfoque se centra en el diagnóstico y tratamiento efectivo de problemas periodontales."
            imageSrc="/images/dr2.png"
          />
          <DoctorCard
            name="Dra. Sofia Castillo"
            specialty="Endodoncista"
            description="Experta en tratamientos de conducto. Con su experiencia, alivia el dolor dental y preserva la salud de los dientes."
            imageSrc="/images/dra2.png"
          />
        </div>
      </section>

      <section className="flex flex-col bg-[#1D1D1D] p-10 gap-5">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">SERVICIOS</span>
        </h2>
        <div className="flex flex-row gap-12 ">
          <div className="bg-[#00CE90] flex flex-col gap-3 p-9 rounded-lg">
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
                src="/images/dentalVeneer.png"
                alt=""
                width={150}
                height={150}
              />
            </div>
          </div>

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
                src="/images/toothWhite.png"
                alt=""
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>

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
      </section>

      <section>
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          <span className="text-[#00CE90]">UBICANOS </span> EN EL MAPA
        </h2>
        <div className="flex flex-row text-white">
          <div className="w-[150%] p-12">
            <MapComponent />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 p-20 text-center bg-[#1D1D1D]">
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          NUESTROS <span className="text-[#00CE90]">CLIENTES</span> NOS
          RECOMIENDAN
        </h2>
        <div className="flex flex-row gap-10 ">
          <div className=" w-1/4 flex flex-col  gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6">
            <Image
              className="text-center"
              src="/images/testimonio1.svg"
              alt=""
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
              src="/images/starts.svg"
              alt=""
              width={150}
              height={150}
            />
          </div>
          <div className=" w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6">
            <Image
              className="text-center"
              src="/images/testimonio2.svg"
              alt=""
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Carlos Nuñez </h4>
            <p className="text-[16px] font-medium">
              Dental ha cambiado completamente mi percepción de las visitas
              dentales. La atención personalizada y la tecnología de vanguardia
              hacen que cada cita sea rápida y sin dolor
            </p>
            <Image
              className="text-center"
              src="/images/starts.svg"
              alt=""
              width={150}
              height={150}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6 ">
            <Image
              className="text-center"
              src="/images/testimonio3.svg"
              alt=""
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Bianca Santillana</h4>
            <p className="text-[16px] font-medium">
              Desde que empecé a ir a Dental, mis visitas al dentista han sido
              una experiencia agradable. El personal es amable y atento, y las
              instalaciones son de primera. ¡Recomiendo Dental a todos!
            </p>
            <Image
              className="text-center"
              src="/images/starts.svg"
              alt=""
              width={150}
              height={150}
            />
          </div>
          <div className="w-1/4 flex flex-col gap-6 justify-center items-center text-white border-[5px] border-greenD-500 rounded-[10px] p-6 ">
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={150}
              height={150}
            />
            <h4 className="text-[20px] font-semibold">Gustavo Garcia</h4>
            <p className="text-[16px] font-medium">
              Mi experiencia en Dental ha sido excepcional. Desde la bienvenida
              hasta el final del tratamiento, todo el equipo se ha mostrado
              profesional y dedicado. ¡Mi sonrisa nunca se ha visto mejor
              gracias a Dental!
            </p>
            <Image
              className="text-center"
              src="/images/starts.svg"
              alt=""
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
