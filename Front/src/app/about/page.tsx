import MapComponent from "@/components/Maps/maps";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col text-white m-8">
      <div className="flex justify-between m-4">
        <div className="rounded-2xl ">
          <Image
            className="rounded-2xl"
            src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720382843/clinica_dd187m.jpg"
            alt="Clinica"
            width={500}
            height={100}
          />
        </div>
        <div className="w-[55%] flex flex-col text-start">
          <h2 className=" text-[58px] text-white font-bold leading-normal">
            SOBRE <span className="text-[#00CE90]">NOSOTROS</span>
          </h2>
          <p>
            DentAll es una clínica dental innovadora que pone a sus pacientes en
            el centro de la experiencia de atención. Con un enfoque en la
            comodidad y la eficiencia, DentAll ha desarrollado una plataforma en
            línea avanzada que transforma la manera en que los pacientes
            interactúan con su cuidado dental.
          </p>
        </div>
      </div>

      <div className=" flex flex-col gap-8 w-[50%] m-auto ">
        <div>
          <li className="text-2xl">Plataforma Centrada en el Usuario</li>
          <p>
            DentAll se distingue por su plataforma digital fácil de usar,
            diseñada para mejorar la experiencia del paciente en cada paso del
            proceso de atención dental.
          </p>
        </div>

        <div>
          <li className="text-2xl">Inicio de Sesión y Agenda de Citas</li>
          <p>
            Los pacientes pueden iniciar sesión en su cuenta personal desde
            cualquier dispositivo con acceso a internet. Una vez dentro, tienen
            la posibilidad de agendar sus citas de manera rápida y sencilla a
            través de un calendario interactivo. Esta función permite
            seleccionar fechas y horas disponibles según su conveniencia,
            eliminando la necesidad de llamadas telefónicas y largas esperas.
          </p>
        </div>

        <div>
          <li className="text-2xl">Historial Clínico</li>
          <p>
            La plataforma también ofrece acceso completo al historial clínico
            del paciente. Aquí, los usuarios pueden revisar su historial de
            tratamientos, diagnósticos anteriores y planes de cuidado
            recomendados por su dentista. Esto no solo ayuda a los pacientes a
            mantenerse informados sobre su salud dental, sino que también
            facilita una comunicación más efectiva con el equipo médico.
          </p>
        </div>

        <div>
          <li className="text-2xl">Recetas Médicas</li>
          <p>
            DentAll proporciona una sección específica donde los pacientes
            pueden ver sus recetas médicas electrónicas. Esta función asegura
            que los pacientes tengan acceso rápido a sus prescripciones y pueden
            solicitar renovaciones cuando sea necesario, todo desde la comodidad
            de su hogar.
          </p>
        </div>

        <div>
          <li className="text-2xl">Chat Personalizado</li>
          <p>
            Para una atención más personalizada, la plataforma incluye un
            sistema de chat en vivo. Los pacientes pueden comunicarse
            directamente con su dentista o con el personal de la clínica para
            resolver dudas, recibir asesoramiento inmediato o solicitar
            información adicional sobre sus tratamientos y citas.
          </p>
        </div>

<div>

        <li className="text-2xl">Compromiso con la Innovación y el Cuidado</li>
        <p>
          En DentAll, estamos comprometidos con la innovación y el uso de
          tecnología avanzada para mejorar la salud dental de nuestros
          pacientes. Nuestra plataforma digital no solo hace que la gestión del
          cuidado dental sea más eficiente, sino que también crea una
          experiencia más fluida y personalizada para cada paciente.
        </p>
</div>

        <p>
          DentAll es la elección ideal para quienes buscan un servicio dental de
          calidad que combine tecnología de vanguardia con una atención al
          paciente excepcional. ¡Únase a nosotros y descubra una nueva manera de
          cuidar su salud dental!
        </p>
      </div>

      <div className="flex flex-row text-white">
        <div className="w-[150%] p-12">
          <MapComponent />
        </div>
      </div>

      <div className="m-12">
        <h2 className="text-[58px] text-center  text-[#00CE90] font-bold leading-normal">
          DESARROLLADORES
        </h2>
        <div className="flex gap-12 justify-center mt-4">
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Manuel Ochoa
            </h4>
            <p className="text-sm text-center">Front-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Rafael Garcia
            </h4>
            <p className="text-sm text-center">Front-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Carlos Tunjano
            </h4>
            <p className="text-sm text-center">Back-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Mauricio Arce
            </h4>
            <p className="text-sm text-center">Back-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Jorge Bello
            </h4>
            <p className="text-sm text-center">Back-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Sebastian Villagra
            </h4>
            <p className="text-sm text-center">Back-end</p>
          </div>
          <div>
            <Image
              className="text-center"
              src="/images/testimonio4.svg"
              alt=""
              width={120}
              height={120}
            />
            <h4 className="text-[16px] text-center font-semibold">
              Matias Videla
            </h4>
            <p className="text-sm text-center">Front-end</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
