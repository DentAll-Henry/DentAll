"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { Patients, PersonInterface } from "@/types";
import { useRouter } from "next/navigation";
import {
  allPatients,
  getPeopleByMail,
  getPeopleByRole,
} from "@/helpers/patients.helper";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

type AllRoles = {
  eng: string;
  esp: string;
  status: boolean;
  personId: string;
};

function CardTotalAdmins() {
  type User = {
    id: string;
    [key: string]: any;
  };

  const [patients, setPatients] = useState<PersonInterface[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<PersonInterface | null>(null);
  const [allRoles, setAllRoles] = useState<AllRoles[]>([
    {
      eng: "patient",
      esp: "Paciente",
      status: true,
      personId: "",
    },
    {
      eng: "dentist",
      esp: "Dentista",
      status: true,
      personId: "",
    },
    {
      eng: "administrative",
      esp: "Adminsitrativo",
      status: true,
      personId: "",
    },
    {
      eng: "admin",
      esp: "Super Admin",
      status: true,
      personId: "",
    },
  ]);
  const router = useRouter();

  const openModal = (person: PersonInterface) => {
    setSelectedPatient(person);
    setIsModalOpen(true);
    // Cargar los roles del paciente seleccionado al abrir el modal
    const rolesPatient: string[] = person.roles.map((r) => r.name);
    const allRolesPatient: AllRoles[] = allRoles.map((r) => {
      if (rolesPatient?.includes(r.eng)) {
        return { ...r, status: false, personId: person.id };
      } else {
        return { ...r, status: true, personId: person.id };
      }
    });
    setAllRoles(allRolesPatient);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const addRole = async (role: string, personId: string) => {
    if (role !== "dentist") {
      try {
        console.log("personId: ", personId);

        const response = await axiosInstance.patch(
          `/people/addrole/${personId}`,
          {
            roleName: role,
          }
        );
        console.log(response);

        await Swal.fire({
          title: "¡Excelente!",
          text: "Rol añadido.",
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
      } catch (error: any) {
        console.log(error);

        await Swal.fire({
          title: "¡Error!",
          text: error.message,
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
      }
    } else {
      try {
        let response: any;
        try {
          const dentistResponse = await axiosInstance.get(
            `/dentists/person/${personId}`
          );
          response = await axiosInstance.patch(
            `/dentists/changestatus/${dentistResponse.data.id}`
          );
        } catch {
          response = await axiosInstance.post(`/dentists/create`, {
            specialtyName: "Odontología general",
            dentalServName: "Consulta de valoración",
            personId,
            description: "Odontólogo general",
          });
        } finally {
          await Swal.fire({
            title: "¡Excelente!",
            text: "Rol añadido.",
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
        }
      } catch (error: any) {
        await Swal.fire({
          title: "¡Error!",
          text: error.message,
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
      }
    }
    closeModal();
    fetchAdminstratives();
  };

  const delRole = async (role: string, personId: string) => {
    if (role !== "dentist") {
      await axiosInstance.patch(`/people/delrole/${personId}`, {
        roleName: role,
      });
      await Swal.fire({
        title: "¡Excelente!",
        text: "Rol retirado.",
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
    } else {
      const dentist = await axiosInstance.get(`/dentists/person/${personId}`);
      await axiosInstance.patch(`/dentists/changestatus/${dentist.data.id}`);
      await Swal.fire({
        title: "¡Excelente!",
        text: "Rol retirado.",
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
    }
    closeModal();
    fetchAdminstratives();
  };

  const handleChangeStatus = async (personId: string) => {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Esta seguro de activar/inactivar el usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      background: "#1D1D1D",
      customClass: {
        confirmButton:
          "hover:scale-105 bg-greenD-500 text-black font-bold py-2 px-4 rounded",
        cancelButton:
          "hover:scale-105 bg-red-500 text-black font-bold py-2 px-4 rounded",
        title: "text-greenD-500", // Cambia el color del texto del título
        popup: "text-white", // Cambia el color del texto del contenido
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosInstance.patch(
          `/auth/changestatus/${personId}`
        );
        fetchAdminstratives();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
      setLoggin(true);
    } else {
      router.push("/register");
    }
  }, [router]);

  const fetchAdminstratives = async () => {
    try {
      const patientsData = await getPeopleByRole("administrative");
      fetchByMail(patientsData);
      console.log(patients);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByMail = async (person: PersonInterface[]) => {
    try {
      for (let i = 0; i < person.length; i++) {
        person[i] = await getPeopleByMail(person[i]);
      }
      setPatients(person);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminstratives();
  }, []);

  return (
    <div>
      {patients.map((patient) => (
        <div className="w-full flex flex-row gap-5" key={patient.id}>
          <div className="w-[31%] p-3 flex flex-row gap-4 rounded-full">
            <Image
              className="rounded-full"
              src={patient.photo}
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <Link href={`/admin/users/patients/${patient.id}`}>
              <p>
                {patient.first_name} {patient.last_name}
              </p>
            </Link>
          </div>
          <div className="w-[18%] p-3">
            <p>{patient.phone}</p>
          </div>
          <div className="w-[23%] p-3">
            <p>{patient.email}</p>
          </div>
          <div className="w-[14%] p-3">
            <p>{patient.dni}</p>
          </div>
          <div className="w-[14%] p-3 flex flex-row gap-8">
            <Image
              onClick={() => openModal(patient)}
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201305/PencilSimple_ugfifd.svg"
              width={24}
              height={24}
              alt="editar"
              className="cursor-pointer"
            />
            <Image
              onClick={() => handleChangeStatus(patient.id)}
              src={
                patient.is_active
                  ? "https://res.cloudinary.com/ddpohfyur/image/upload/v1720201219/Trash_e3pep7.svg"
                  : "https://res.cloudinary.com/ddpohfyur/image/upload/v1721225479/trash-gray_rxt57v.png"
              }
              width={24}
              height={24}
              alt="eliminar"
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
      {selectedPatient && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex justify-between items-center mb-4"></div>
          <h3 className="text-lg mb-4">
            Editar roles de:{" "}
            <span className="text-greenD-500">
              {selectedPatient.first_name} {selectedPatient.last_name}
            </span>
          </h3>
          <div className="flex gap-2 mb-4">
            {allRoles.map((r, index) => {
              if (r.status) {
                return (
                  <div
                    className="text-[#00FB5E]  hover:text-white rounded px-4 py-2 border border-[#00FB5E] cursor-pointer"
                    onClick={() => addRole(r.eng, r.personId)}
                    key={index}
                  >
                    {"Agregar " + r.esp}
                  </div>
                );
              } else {
                return (
                  <div
                    className=" text-[#FF2F44] rounded px-4 py-2 border hover:text-white border-[#FF2F44] cursor-pointer"
                    onClick={() => delRole(r.eng, r.personId)}
                    key={index}
                  >
                    {"Retirar " + r.esp}
                  </div>
                );
              }
            })}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CardTotalAdmins;
