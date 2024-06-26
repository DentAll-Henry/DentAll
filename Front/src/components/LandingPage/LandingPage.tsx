import Image from "next/image";
import React from "react";
import DoctorCard from "../DoctorCards/DoctorCard";

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
              src="/images/dental1.png"
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
              src="/images/dental2.png"
              alt="dental custom"
              width={700}
              height={700}
            />
          </div>
        </div>
      </section>

      <section>
        <div>Nuestros servicios</div>
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
            name="Dr. Manu Ochoa"
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
    </div>
  );
};

export default LandingPage;
