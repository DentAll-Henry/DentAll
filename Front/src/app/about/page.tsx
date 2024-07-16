import MapComponent from "@/components/Maps/maps";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col text-white m-8">
      <section className="flex justify-center my-8 w-[90%] m-auto">
        <div className="w-[80%] flex flex-col text-center">
          <h2 className="text-[58px] text-white font-bold leading-normal">
            SOBRE <span className="text-[#00CE90]">NOSOTROS</span>
          </h2>
          <p>
            DentAll es una empresa innovadora en el rubro odontológico, dedicada
            a transformar y optimizar la gestión diaria de los profesionales de
            la odontología. Nos especializamos en ofrecer soluciones integrales
            que centralizan todas las necesidades administrativas y clínicas en
            una sola plataforma digital avanzada.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-8 w-[90%] m-auto">
        {/* Feature 1: Plataforma Centrada en el Usuario */}
        <div className="flex gap-8 items-stretch">
          <div className="flex-2 bg-greenD-500 p-4 rounded-2xl text-black">
            <h3 className="text-2xl">Plataforma Centrada en el Usuario</h3>
            <div>
              <p>
                Nuestra plataforma digital mejora la experiencia del paciente y
                simplifica la gestión de servicios odontológicos para los
                profesionales.
              </p>
              <br />
              <strong>Beneficios Clave:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Interfaz intuitiva y fácil de usar</li>
                <li>Acceso personalizado para cada usuario</li>
                <li>Soporte integral a través de chatbot interactivo</li>
                <li>Optimización de procesos administrativos</li>
                <li>Compatibilidad multidispositivo</li>
                <li>Seguridad y privacidad avanzadas</li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <Image
              className="rounded-2xl object-cover h-full w-full"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721084900/representation-user-experience-interface-design_23-2150169865_vuk3a9.png"
              alt="Clinica"
              width={500}
              height={1000}
            />
          </div>
        </div>

        {/* Feature 2: Inicio de Sesión y Agenda de Citas */}
        <div className="flex gap-8 items-stretch">
          <div className="flex-1 flex-shrink-0">
            <Image
              className="rounded-2xl object-cover h-full"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721084901/schedule-planner-task-agenda-checklist-concept_53876-124095_p5a4g4.png"
              alt="Clinica"
              width={500}
              height={1000}
            />
          </div>
          <div className="bg-white p-4 rounded-2xl text-black flex-2">
            <h3 className="text-2xl">Inicio de Sesión y Agenda de Citas</h3>
            <div>
              <p>
                Ofrecemos una plataforma intuitiva y eficiente para la gestión
                de citas y el inicio de sesión de los pacientes.
              </p>
              <br />
              <strong>Funcionalidades Clave:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Inicio de sesión seguro desde cualquier dispositivo</li>
                <li>Calendario dinámico y notificaciones automáticas</li>
                <li>
                  Sincronización en tiempo real con calendarios personales
                </li>
                <li>Acceso a historial de citas</li>
                <li>Plataforma multidispositivo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 3: Historial Clínico */}
        <div className="flex gap-8">
          <div className="bg-greenD-500 p-4 rounded-2xl text-black flex-1">
            <h3 className="text-2xl">Historial Clínico</h3>
            <div>
              <p>
                Acceso rápido y fácil al historial clínico de los pacientes para
                una atención personalizada y de calidad.
              </p>
              <br />
              <strong>Características Principales:</strong>
              <ul className="list-disc list-inside ml-4 ">
                <li>Acceso completo a información detallada del paciente</li>
                <li>Documentación detallada de cada visita</li>
                <li>Actualización en tiempo real</li>
                <li>Seguridad y privacidad de la información</li>
                <li>Mejora la comunicación entre paciente y odontólogo</li>
                <li>Recetas médicas personalizadas enviadas por la app</li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <Image
              className="rounded-2xl"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721084901/medical-questionnaire_1098-19363_hxvtha.png"
              alt="Clinica"
              width={2000}
              height={1000}
            />
          </div>
        </div>

        {/* Feature 4: Chat Personalizado */}
        <div className="flex gap-8 items-stretch">
          <div className="flex-1">
            <Image
              className="rounded-2xl object-cover h-full w-full"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721084899/close-up-dentist-their-clinic_23-2149206236_lpostz.png"
              alt="Clinica"
              width={500}
              height={1000}
            />
          </div>
          <div className="flex-2 bg-white p-4 rounded-2xl text-black">
            <h3 className="text-2xl">Chat Personalizado</h3>
            <div>
              <p>
                Sistema de chat en vivo para una atención más personalizada. Los
                pacientes pueden comunicarse con su dentista
                <br /> o el personal de la clínica.
              </p>
              <br />
              <strong>Características del Chat Personalizado:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Chat con Dientin, el chatbot disponible 24/7</li>
                <li>Derivación a profesionales si es necesario</li>
                <li>Soporte por correo electrónico disponible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 5: Compromiso con la Innovación y el Cuidado */}
        <div className="flex gap-8 items-stretch">
          <div className="bg-greenD-500 p-4 rounded-2xl text-black flex-2">
            <h3 className="text-2xl">
              Compromiso con la Innovación y el Cuidado
            </h3>
            <div>
              <p>
                Estamos comprometidos con la innovación y el uso de tecnología
                avanzada para mejorar la salud dental <br />
                de los pacientes.
              </p>
              <br />
              <strong>Nuestro Compromiso con la Innovación:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Desarrollo continuo y mejoras de la plataforma</li>
                <li>Herramientas avanzadas como manejo de odontogramas</li>
                <li>Integración de inteligencia artificial</li>
              </ul>
              <strong>Nuestro Compromiso con el Cuidado:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Atención personalizada basada en el historial clínico</li>
                <li>Recursos educativos para los pacientes</li>
                <li>Soporte continuo y asesoramiento</li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <Image
              className="rounded-2xl object-cover h-full w-full"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721084900/Dulces_Mar%C3%ADa_tortas_personalizadas_bakery_fkhmlu.png"
              alt="Clinica"
              width={500}
              height={1000}
            />
          </div>
        </div>

        {/* Conclusión */}
        <div className="bg-white p-4 rounded text-black">
          <div>
            <p>
              <strong>DentAll</strong> es la elección ideal para quienes buscan
              un servicio dental de calidad que combine tecnología de vanguardia
              con una atención al paciente excepcional. Nuestra plataforma no
              solo transforma la gestión diaria de su consultorio, sino que
              también eleva la experiencia de sus pacientes a nuevos niveles de
              satisfacción y confianza.
            </p>
            <br />
            <strong>Por Qué Elegir DentAll:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Maximice su eficiencia y reduzca tareas administrativas</li>
              <li>
                Mejore la satisfacción del paciente con servicios personalizados
              </li>
              <li>
                Aumente sus ingresos optimizando la gestión del consultorio
              </li>
              <li>Destaque entre la competencia con tecnología avanzada</li>
              <li>Soporte inigualable para maximizar el uso de DentAll</li>
            </ul>
            <strong>¿Está Listo para Revolucionar Su Consultorio?</strong> No
            espere más para transformar su práctica odontológica con DentAll.
            Únase a la creciente comunidad de odontólogos que ya están
            beneficiándose de nuestras soluciones innovadoras.
            <br />
            <br />
            <strong>¿Por Qué Esperar?</strong> Cada día que pasa sin DentAll es
            un día perdido en eficiencia y calidad de atención. No deje que su
            consultorio se quede atrás.{" "}
            <strong>
              ¡Actúe ahora y lleve su práctica al siguiente nivel!
            </strong>
            <br />
            <br />
            <strong>DentAll</strong>: Donde la tecnología y el cuidado dental se
            encuentran para ofrecerle la mejor experiencia tanto a usted como a
            sus pacientes. ¡Únase a nosotros y descubra una nueva manera de
            cuidar su salud dental!
          </div>
        </div>
      </section>
      {/* Section: Map
      <section className="flex flex-col items-center text-white">
        <div className="w-full lg:w-[75%] p-12">
          <MapComponent />
        </div>
      </section> */}
      {/* Section: Developers */}
      <section className="m-4">
        <h2 className="text-[58px] text-white font-bold leading-normal text-center">
          EQUIPO DE DESARROLLADORES{" "}
          <span className="text-[#00CE90]">DENTALL</span>
        </h2>
        <div className="flex flex-wrap gap-12 justify-center mt-4">
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721149471/3_oqzdu9.png"
              alt="Carlos Tunjano"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Carlos Tunjano</h4>
            <p className="text-sm">Back-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721149471/4_zqeiqy.png"
              alt="Manuel Ochoa"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Manuel Ochoa</h4>
            <p className="text-sm">Front-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721149470/1_imqjjm.png"
              alt="Mauricio Arce"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Mauricio Arce</h4>
            <p className="text-sm">Back-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721069004/Dientin_404_cnlpwk.png"
              alt="Rafael Garcia"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Rafael Garcia</h4>
            <p className="text-sm">Front-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721069004/Dientin_404_cnlpwk.png"
              alt="Jorge Bello"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Jorge Bello</h4>
            <p className="text-sm">Back-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721149470/2_ai2imp.png"
              alt="Matias Videla"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Matias Videla</h4>
            <p className="text-sm">Front-end</p>
          </div>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1721149470/00CE90_mbx6pb.png"
              alt="Sebastian Villagra"
              width={120}
              height={120}
            />
            <h4 className="text-[16px] font-semibold">Sebastian Villagra</h4>
            <p className="text-sm">Back-end</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
