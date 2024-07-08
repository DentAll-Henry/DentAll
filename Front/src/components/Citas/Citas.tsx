"use client";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import Image from "next/image";
import { es } from 'date-fns/locale';
import axios from "axios";
import { enviroment } from "@/utils/config";



type Appointment = {
  id: string;
  date_time: string;
  description: string;
  patient: string;
  service: {
    description: string;
    id: string;
    img: string;
    isActive: boolean;
    name: string;
    price: string;
  };
};

type CitasProps = {
  futureAppointments: Appointment[];
  pastAppointments: Appointment[];
  fetchAppointments: () => void;
  loadMoreAppointments: () => void;
  loadMoreButton: boolean
};

const Citas: React.FC<CitasProps> = ({
  futureAppointments,
  pastAppointments,
  fetchAppointments,
  loadMoreAppointments,
  loadMoreButton
}) => {
  const handleCancelAppointment = async (id: string) => {
    try {
      const response = await axios.delete(
        `${enviroment.apiUrl}/appointments/${id}`
      );
      if (response.status === 200) {
        alert("Cita cancelada")
        fetchAppointments();
      }
    } catch (error) {
      alert("Error al cancelar la cita")
      console.error(error);
    }
  };
  return (
    <div className="mx-8 mt-4">
      <h3 className="font-bold ml-8">PROXIMAS CITAS</h3>
      <div className="bg-darkD-500 grid grid-cols-6 gap-4 p-4 rounded-md items-center">
        <p className="text-white text-center">Fecha</p>
        <p className="text-white text-center">Hora</p>
        <p className="text-white text-center">Tipo de consulta</p>
        <p className="text-white text-center">Estado</p>
        <p className="text-white text-center ml-[75%]">Editar</p>
        <p className="text-white text-center">Acción</p>
      </div>
      {futureAppointments.map((appointment) => (

        <div
          key={appointment.id}
          className="grid grid-cols-6 gap-4  rounded-md mt-4 items-center"
        >
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {/* {appointment.date_time.split('T')[0]} */}
            {format(toZonedTime(appointment.date_time, 'UTC'), 'dd-MMMM-yyyy', { locale: es })}
          </p>
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {/* {appointment.date_time.split('T')[1].split('.')[0]} */}
            {format(toZonedTime(appointment.date_time, 'UTC'), 'HH:mm')}
          </p>
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {appointment.service.name}
          </p>
          <p className="bg-green-500 text-white p-2 rounded-md text-center">
            Activo
          </p>
          <div className="justify-self-center bg-blue-500 p-2 rounded-md ml-[67%]">
            <Image
              className="h-6"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201297/NotePencil_k3pao8.svg"
              width={35}
              height={35}
              alt="Editar"
            />
          </div>
          <p onClick={() => handleCancelAppointment(appointment.id)} className="bg-red-500 text-white p-2 rounded-md text-center cursor-pointer">
            cancelar
          </p>
        </div>
      ))}

      {loadMoreButton && (
        <button
          onClick={loadMoreAppointments}
          className="bg-blue-500 text-white p-2 rounded-md mt-4"
        >
          Cargar más
        </button>
      )}

      <h3 className="font-bold ml-8 mt-20">CITAS REALIZADAS</h3>
      <div className="bg-darkD-500 grid grid-cols-6 gap-4 p-4 rounded-md items-center">
        <p className="text-white text-center">Fecha</p>
        <p className="text-white text-center">Hora</p>
        <p className="text-white text-center">Tipo de consulta</p>
        <p className="text-white text-center">Estado</p>
        <p className="text-white text-center ml-[75%]">Editar</p>
        <p className="text-white text-center">Acción</p>
      </div>
      {pastAppointments.map((appointment) => (
        <div
          key={appointment.id}
          className="grid grid-cols-6 gap-4 rounded-md mt-4 items-center"
        >
          {/* agregar nombre del dr. */}
          {/* crear y cancelar citas */}
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {new Date(appointment.date_time).toLocaleDateString()}
          </p>
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {new Date(appointment.date_time).toLocaleTimeString()}
          </p>
          <p className="bg-gray-500 text-white p-2 rounded-md text-center">
            {appointment.service.name}
          </p>
          <p className="bg-green-500 text-white p-2 rounded-md text-center">
            Atendido
          </p>
          <div className="justify-self-center bg-blue-500 p-2 rounded-md ml-[67%]">
            <Image
              className="h-6"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201297/NotePencil_k3pao8.svg"
              width={35}
              height={35}
              alt="Editar"
            />
          </div>
          <p className="bg-red-500 text-white p-2 rounded-md text-center cursor-pointer">
            cancelar
          </p>
        </div>
      ))}
    </div>
  );
};

export default Citas;

// const Citas = () => {
//   return (
//     <div className="mx-8 mt-4">
//       <div className="bg-darkD-500 grid grid-cols-6 gap-4 p-4 rounded-md items-center">
//         <p className="text-white text-center">Fecha</p>
//         <p className="text-white text-center">Hora</p>
//         <p className="text-white text-center">Tipo de consulta</p>
//         <p className="text-white text-center">Estado</p>
//         <Image
//           className="justify-self-center ml-[80%] "
//           src="/images/NotePencil.svg"
//           width={35}
//           height={35}
//           alt="Editar"
//         />
//         <Image
//           className="justify-self-center"
//           src="/images/ToggleLeft.svg"
//           width={35}
//           height={35}
//           alt="Ver"
//         />
//       </div>
//       <div className="grid grid-cols-6 gap-4  rounded-md mt-4 items-center">
//         <p className="bg-gray-500 text-white p-2 rounded-md text-center">
//           27/06/2024
//         </p>
//         <p className="bg-gray-500 text-white p-2 rounded-md text-center">
//           14:00
//         </p>
//         <p className="bg-gray-500 text-white p-2 rounded-md text-center">
//           Dolor de muelita
//         </p>
//         <p className="bg-green-500 text-white p-2 rounded-md text-center">
//           Activo
//         </p>
//         <div className="justify-self-center bg-blue-500 p-2 rounded-md ml-[67%]">
//           <Image
//             className="h-6"
//             src="/images/NotePencil.svg"
//             width={35}
//             height={35}
//             alt="Editar"
//           />
//         </div>
//         <p className="bg-red-500 text-white p-2 rounded-md text-center cursor-pointer">
//           cancelar
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Citas
