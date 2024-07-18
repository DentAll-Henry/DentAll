"use client";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import axios from "axios";
import { enviroment } from "@/utils/config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Appointment } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { handlePayment } from "@/helpers/handlePayment";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Link from "next/link";

type CitasProps = {
  futureAppointments: Appointment[];
  pastAppointments: Appointment[];
  fetchAppointments: () => void;
  loadMoreAppointments: () => void;
  loadMoreButton: boolean;
};

const Citas: React.FC<CitasProps> = ({
  futureAppointments,
  pastAppointments,
  fetchAppointments,
  loadMoreAppointments,
  loadMoreButton,
}) => {
  const [canceledAppointments, setCanceledAppointments] = useState<
    Appointment[]
  >([]);
  const [preferenceId, setPreferenceId] = useState<{ preferenceId: string, appointmentId: string } | null>(null);

  const handleCancelAppointment = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Está seguro?",
        text: "¿Desea cancelar la cita?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, mantener",
        background: "#1D1D1D",
        customClass: {
          confirmButton:
            "hover:scale-105 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
          cancelButton:
            "hover:scale-105 bg-red-500 text-black font-bold py-2 px-4 rounded",
          title: "text-greenD-500", // Cambia el color del texto del título
          popup: "text-white", // Cambia el color del texto del contenido
        },
      });

      if (result.isConfirmed) {
        const response = await axiosInstance.delete(`/appointments/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "¡Excelente!",
            text: "La cita ha sido cancelada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
            customClass: {
              confirmButton:
                "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
              title: "text-greenD-500", // Cambia el color del texto del título
              popup: "text-white", // Cambia el color del texto del contenido
            },
          });
          const canceledAppointment = futureAppointments.find(
            (app) => app.id === id
          );
          if (canceledAppointment) {
            setCanceledAppointments([
              ...canceledAppointments,
              canceledAppointment,
            ]);
            fetchAppointments();
          }
        }
      }
    } catch (error) {
      alert("Error al cancelar la cita");
      console.error(error);
    }
  };

  useEffect(() => {
    initMercadoPago(enviroment.mercadopagoPublicKey, {
      locale: "en-US",
    });
  }, []);

  const getPreferenceId = async (patient: string, appointment_id: string): Promise<string> => {
    const preference = await handlePayment(
      patient,
      appointment_id
    );
    return preference.preferenceId
  }

  return (
    <div className="mx-8 mt-4 h-screen">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold ">PROXIMAS CITAS</h3>
        <div className="flex flex-row bg-darkD-500 rounded-md gap-1">
          <div className="w-[14%] px-4 py-2">Fecha</div>
          <div className="w-[9%] px-4 py-2">Hora</div>
          <div className="w-[20%] px-4 py-2">Especialista </div>
          <div className="w-[30%] px-4 py-2">Tipo de consulta</div>
          <div className="w-[10%] px-2 py-2">Estado pago</div>
          <div className="w-[16%] px-4 py-2">Acciones</div>
        </div>

        {futureAppointments.map((appointment) => (
          <div key={appointment.id} className="flex flex-row rounded-md gap-1">
            <div className="w-[14%] px-4 py-2">
              {format(toZonedTime(appointment.date_time, "UTC"), "dd-MM-yyyy")}
            </div>
            <div className="w-[9%] px-4 py-2">
              {format(toZonedTime(appointment.date_time, "UTC"), "HH:mm")}
            </div>
            <div className="w-[20%] px-4 py-2">
              Dr. {appointment.dentist_id.person.first_name}{" "}
              {appointment.dentist_id.person.last_name}{" "}
            </div>
            <div className="w-[30%] px-4 py-2">{appointment.service.name}</div>
            <div
              className={`w-[10%] px-2 py-2 ${appointment.payment ? "bg-[#00FB5E]" : "bg-[#FFAF44]"
                } rounded-md text-black font-medium text-center`}
            >
              {appointment.payment ? "Completado" : (
                <>
                  <Link
                    href={`#`}
                    onClick={async () => {
                      setPreferenceId(null)
                      const preferenceId = await getPreferenceId(appointment.patient.id, appointment.id)
                      setPreferenceId({
                        preferenceId,
                        appointmentId: appointment.id
                      })
                    }}
                  >
                    {preferenceId?.preferenceId && preferenceId?.appointmentId === appointment.id ? (
                      <>
                        {<Wallet
                          initialization={{ preferenceId: preferenceId?.preferenceId }} />}
                      </>
                    ) : "Pendiente"}

                  </Link>

                </>
              )}
            </div>
            <div
              onClick={() => handleCancelAppointment(appointment.id)}
              className="w-[16%] px-4 py-2 rounded-md bg-[#FF2F44] text-center cursor-pointer"
            >
              cancelar
            </div>
          </div>
        ))}

        {/* {loadMoreButton && (
          // <button
          //   onClick={loadMoreAppointments}
          //   className="bg-blue-500 text-white p-2 rounded-md mt-4"
          // >
          //   Cargar más
          // </button>
        )} */}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold  mt-20">CITAS REALIZADAS</h3>
        <div className="flex flex-row bg-darkD-500 rounded-md gap-1">
          <div className="w-[14%] px-4 py-2">Fecha</div>
          <div className="w-[9%] px-4 py-2">Hora</div>
          <div className="w-[20%] px-4 py-2">Especialista </div>
          <div className="w-[30%] px-4 py-2">Tipo de consulta</div>
          <div className="w-[10%] px-2 py-2">Estado</div>
        </div>
        {canceledAppointments.map((appointment) => (
          <div key={appointment.id} className="flex flex-row rounded-md gap-1">
            <div className="w-[14%] px-4 py-2">
              {format(toZonedTime(appointment.date_time, "UTC"), "dd-MM-yyyy")}
            </div>
            <div className="w-[9%] px-4 py-2">
              {format(toZonedTime(appointment.date_time, "UTC"), "HH:mm")}
            </div>
            <div className="w-[20%] px-4 py-2">Dr.tanto tanto</div>
            <div className="w-[30%] px-4 py-2">{appointment.service.name}</div>
            <div className="w-[10%] px-2 py-2 bg-[#FF2F44] rounded-md text-black font-medium text-center">
              Cancelado
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Citas;
