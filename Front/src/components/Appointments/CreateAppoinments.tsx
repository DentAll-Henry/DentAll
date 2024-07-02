// "use client";

// import React, { useState } from "react";
// import axios from "axios";

// type CreateAppointmentProps = {
//   onAppointmentCreated: () => void;
// };

// const CreateAppointment: React.FC<CreateAppointmentProps> = ({
//   onAppointmentCreated,
// }) => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [consultationType, setConsultationType] = useState("");
//   const [status, setStatus] = useState("Activo");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Validar que todos los campos estén completos
//     if (!date || !time || !consultationType) {
//       setErrorMessage("Por favor, complete todos los campos");
//       return;
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:3000/appointments", {
//         date,
//         time,
//         consultationType,
//         status,
//       });

//       if (response.status === 201) {
//         setDate("");
//         setTime("");
//         setConsultationType("");
//         setStatus("Activo");
//         setErrorMessage("");
//         alert("Turno creado exitosamente");
//         onAppointmentCreated(); // Notificar al padre que una cita fue creada
//       } else {
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error al crear la cita:", error);
//       setErrorMessage("Error interno del servidor");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-md">
//       <h3 className="text-white font-bold">Crear Nueva Cita</h3>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <div className="mb-4">
//         <label className="text-white">Fecha</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full p-2 rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="text-white">Hora</label>
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           className="w-full p-2 rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="text-white">Tipo de Consulta</label>
//         <input
//           type="text"
//           value={consultationType}
//           onChange={(e) => setConsultationType(e.target.value)}
//           className="w-full p-2 rounded-md"
//           required
//         />
//       </div>
//       <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
//         Crear Cita
//       </button>
//     </form>
//   );
// };

// export default CreateAppointment;
