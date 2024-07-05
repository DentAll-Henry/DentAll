
import MapComponent from "@/components/Maps/maps";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col text-white m-8">
      <div>
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          SOBRE <span className="text-[#00CE90]">NOSOTROS</span>
        </h2>
        <div className="gap-12 w-[80%] m-auto">
          <p>
            DentAll es una clínica dental moderna y vanguardista, dedicada a
            proporcionar atención odontológica de alta calidad mediante el uso
            de tecnologías avanzadas y prácticas innovadoras. Con un enfoque
            centrado en la comodidad y seguridad de sus pacientes, DentAll se
            destaca por su plataforma eficaz e integrada que optimiza la
            experiencia tanto para los usuarios como para los profesionales.
          </p>
          <h2>Características de DentAll</h2>
          <ul>
            <li className="text-2xl">Tecnologia de punta</li>
            <p>
              DentAll utiliza equipos de última generación, incluyendo
              radiografías digitales de baja radiación, impresoras 3D para la
              creación de prótesis y ortodoncia personalizada, y sistemas
              CAD/CAM para una fabricación precisa y rápida de coronas y puentes
              dentales.
            </p>
            <li className="text-2xl">Plataforma Digital Integrada</li>
            <p>
              La clínica cuenta con una plataforma digital que permite a los
              pacientes gestionar sus citas, acceder a sus historiales médicos y
              resultados de tratamientos, y comunicarse de manera segura con sus
              dentistas. Esta plataforma también facilita a los profesionales la
              organización y el seguimiento de casos clínicos, mejorando la
              eficiencia en la atención.
            </p>
            <li className="text-2xl">Protocolos de Seguridad</li>
            <p>
              La seguridad es una prioridad en DentAll. Implementan rigurosos
              protocolos de esterilización y desinfección, y utilizan equipos
              desechables siempre que es posible para garantizar un entorno
              libre de contaminaciones. Además, la clínica está equipada con
              sistemas avanzados de purificación de aire.
            </p>
            <li className="text-2xl">Atención Personalizada</li>
            <p>
              Cada paciente recibe un plan de tratamiento personalizado,
              diseñado después de una evaluación exhaustiva y una consulta
              detallada. Los dentistas de DentAll trabajan estrechamente con
              cada paciente para entender sus necesidades y expectativas,
              asegurando una atención a medida.
            </p>

            <li className="text-2xl">Formación y Capacitación Continua</li>
            <p>
              El equipo de DentAll está compuesto por profesionales altamente
              cualificados que participan regularmente en programas de formación
              continua para estar al día con los últimos avances en odontología.
              Esto garantiza que los pacientes reciban tratamientos basados en
              las mejores prácticas y conocimientos actuales.
            </p>

            <li className="text-2xl">Comodidad y Bienestar del Paciente</li>
            <p>
              Las instalaciones de DentAll están diseñadas para ofrecer un
              ambiente acogedor y relajante, minimizando la ansiedad que puede
              acompañar a las visitas al dentista. Además, ofrecen opciones de
              sedación consciente para procedimientos más invasivos, asegurando
              que los pacientes se sientan cómodos y tranquilos en todo momento.
            </p>
          </ul>
          <p>
            En resumen, DentAll es una clínica dental que combina tecnología
            avanzada, seguridad rigurosa y atención personalizada para
            proporcionar una experiencia dental superior. Su plataforma
            integrada facilita la gestión eficiente de tratamientos, mejorando
            tanto la experiencia del paciente como la del profesional, y
            posicionándola como líder en el sector odontológico.
          </p>
        </div>
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
            <h4 className="text-[15px] text-center font-semibold">
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
            <h4 className="text-[15px] text-center font-semibold">
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
              height={100}
            />
            <h4 className="text-[15px] text-center font-semibold">
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
              height={100}
            />
            <h4 className="text-[15px] text-center font-semibold">
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
              height={100}
            />
            <h4 className="text-[15px] text-center font-semibold">
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
              height={100}
            />
            <h4 className="text-[15px] text-center font-semibold">
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
