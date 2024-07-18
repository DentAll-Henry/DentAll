"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import axiosInstance from "@/utils/axiosInstance";
import { DentistId, Patients } from "@/types";
import { toZonedTime } from "date-fns-tz";

type Event = {
  patient: string;
  dentist_id: string;
  date_time: string;
  service: string;
  description: string;
  expiration_date: Date | null;
};

type Dentist = {
  id: string;
  person: {
    first_name: string;
    last_name: string;
  };
};

type RequestEventsFilter = {
  start: string;
  end: string;
  dentists: string[];
};

type Options = {
  value: string;
  name: string;
};

type ModalCitaProps = {
  date_time: string;
  modalOpen: (open: boolean) => void;
  goNext: () => void;
};

const ModalNuevaCita: React.FC<ModalCitaProps> = ({
  date_time,
  modalOpen,
  goNext,
}) => {
  const [appointmentData, setAppointmentData] = useState<Event>({
    patient: "",
    dentist_id: "",
    date_time: "",
    service: "",
    description: "",
    expiration_date: null,
  });
  const [patients, setPatients] = useState<Options[]>([
    {
      value: "",
      name: "Seleccione un paciente",
    },
  ]);
  const [dentists, setDentists] = useState<Options[]>([
    {
      value: "",
      name: "Seleccione un dentista",
    },
  ]);
  const [services, setServices] = useState<Options[]>([
    {
      value: "",
      name: "Seleccione un servicio",
    },
  ]);
  const [availableSlots, setAvailableSlots] = useState<Options[] | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await axiosInstance.get("/patients?limit=10000");
      if (response.status === 200) {
        const options = response.data.map((patient: Patients) => {
          return {
            value: patient.id,
            label: `${patient.person.first_name} ${patient.person.last_name}`,
          };
        });
        setPatients(options);
      }
    };
    const fetchDentists = async () => {
      const response = await axiosInstance.get("/dentists/onlyactive?limit=10000");
      if (response.status === 200) {
        const options = response.data.map((dentist: DentistId) => {
          return {
            value: dentist.id,
            label: `${dentist.person.first_name} ${dentist.person.last_name}`,
          };
        });
        setDentists(options);
      }
    };

    const fetchServices = async () => {
      const response = await axiosInstance.get("/dental-serv?limit=10000");
      if (response.status === 200) {
        const options = response.data.services.map((service: any) => {
          return {
            value: service.id,
            label: service.name,
          };
        });
        setServices(options);
      }
    };
    fetchServices();
    fetchPatients();
    fetchDentists();
  }, []);

  const getSlots = async (dentist_id: string) => {
    const response = await axiosInstance.post(
      `/appointments/get_available_slots`,
      {
        dentist_id,
        start_date: date_time,
        end_date: date_time,
        time_slots: true,
      }
    );
    if (response.status === 200) {
      const times = response.data.availabity[0].map((time: Date) => {
        return {
          label: format(toZonedTime(time, "UTC"), "HH:mm"),
          value: format(toZonedTime(time, "UTC"), "HH:mm"),
        };
      });
      setAvailableSlots(times);
    }
  };

  useEffect(() => {
    if (appointmentData.dentist_id !== "") {
      getSlots(appointmentData.dentist_id);
    }
  }, [appointmentData.dentist_id]);

  const customStyles = {
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      border: "2px solid #00CE90",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 1px #00CE90" : null,
      "&:hover": {
        borderColor: "#00CE90",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#00CE90",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      border: "1px solid #00CE90",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#777" : "white",
      color: state.isSelected ? "black" : "#00CE90",
      "&:hover": {
        backgroundColor: "#00CE90",
        color: "white",
      },
    }),
  };

    return (
        <div className=" flex flex-col items-center bg-[#1A2228] text-white p-8">
            <h1 className="text-2xl font-semibold my-4">Nueva cita</h1>
            <h4>Fecha: {format(toZonedTime(date_time, "UTC"), "dd-MM-yyyy")}</h4>
            <Formik
                initialValues={{
                    patient: "",
                    dentist_id: "",
                    date_time: "",
                    service: "",
                    description: "",
                }}
                validate={values => {
                    const errors = {
                        patient: "",
                        dentist_id: "",
                        date_time: "",
                        service: "",
                    };
                    if (!appointmentData.patient || appointmentData.patient === "") {
                        errors.patient = 'Seleccione un paciente';
                    }
                    if (!appointmentData.dentist_id || appointmentData.dentist_id === "") {
                        errors.dentist_id = 'Seleccione un dentista';
                    }
                    if (!appointmentData.date_time || appointmentData.date_time === "") {
                        errors.date_time = 'Seleccione una hora';
                    }
                    if (!appointmentData.service || appointmentData.service === "") {
                        errors.service = 'Seleccione un servicio';
                    }
                    if (errors.patient !== "" || errors.dentist_id !== "" || errors.date_time !== "" || errors.service !== "") {
                        return errors;
                    }
                    return {}
                }}
                onSubmit={(values) => {

                    axiosInstance.post("/appointments", {
                        ...appointmentData
                    }).then(response => {
                        if (response.status === 201) {
                            Swal.fire({

                                title: "Cita agendada con exito!",
                                text: `La cita ha sido agendada satisfactoriamente.`,
                                icon: "success",
                               confirmButtonText: "Aceptar",
                              background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
                              customClass: {
                                confirmButton:
                                  "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
                                title: "text-greenD-500", // Cambia el color del texto del título
                                popup: "text-white", // Cambia el color del texto del contenido
                              },

                            }).then(() => {
                              modalOpen(false);
                              goNext();
                            });
                        }
                    }).catch(error => {
                        Swal.fire({
                          title: "Error!",
                          html: `Ha ocurrido un error al agendar la cita.\n<ul>${error.response}</ul>`,
                          icon: "error",
                          confirmButtonText: "Aceptar",
                          background: "#1D1D1D", // Cambia este valor al color de fondo que prefieras
                          customClass: {
                            confirmButton:
                              "hover:scale-110 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
                            title: "text-red-500", // Cambia el color del texto del título
                            popup: "text-white", // Cambia el color del texto del contenido
                          },
                        });

                    });

                }}
            >
                 {({ isSubmitting }) => (
                <Form>
                    <div className="mb-4">
                        <label htmlFor="patient">Paciente</label>
                        <Select
                            classNamePrefix="my-custom-select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "#00CE90",
                                  primary: "#00CE90",
                                },
                              })}
                            name="patient"
                            placeholder="Seleccione el paciente"
                            onChange={option => { option && setAppointmentData({ ...appointmentData, patient: option.value }) }}
                            options={patients}

                        />
                        <ErrorMessage name="patient" component="div" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dentist_id">Dentista</label>
                        <Select
                            classNamePrefix="my-custom-select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "#00CE90",
                                  primary: "#00CE90",
                                },
                              })}
                            name="dentist_id"
                            placeholder="Seleccione el dentista"
                            onChange={option => { option && setAppointmentData({ ...appointmentData, dentist_id: option.value }) }}
                            options={dentists}

                        />
                        <ErrorMessage name="dentist_id" component="div" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time">Hora</label>
                        <Select
                            classNamePrefix="my-custom-select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "#00CE90",
                                  primary: "#00CE90",
                                },
                              })}
                            name="time"
                            isDisabled={availableSlots !== null ? false : true}
                            placeholder="Seleccione la hora"
                            onChange={option => { option && setAppointmentData({ ...appointmentData, date_time: `${date_time} ${option.value}` }) }}
                            options={availableSlots ? availableSlots : []}

                        />
                        <ErrorMessage name="date_time" component="div" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="service">Servicio</label>
                        <Select
                            classNamePrefix="my-custom-select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: {
                                  ...theme.colors,
                                  primary25: "#00CE90",
                                  primary: "#00CE90",
                                },
                              })}
                            name="service"
                            placeholder="Seleccione el servicio"
                            onChange={option => { option && setAppointmentData({ ...appointmentData, service: option.value }) }}
                            options={services}

                        />
                        <ErrorMessage name="service" component="div" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description">Descripción</label>
                        <Field as="textarea" value={appointmentData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAppointmentData({ ...appointmentData, description: e.target.value })} name="description" className="w-full p-2 rounded-md text-black" />
                        <ErrorMessage name="description" component="div" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="bg-greenD-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                        Agendar
                    </button>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default ModalNuevaCita;
