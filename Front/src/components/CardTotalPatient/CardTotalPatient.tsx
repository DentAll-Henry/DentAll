"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { Patients } from "@/types";
import { useRouter } from "next/navigation";
import { allPatients } from "@/helpers/patients.helper";

function CardTotalPatient() {
  type User = {
    id: string;
    [key: string]: any;
  };

  const [patients, setPatients] = useState<Patients[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Profesional");
  const [selectedPatient, setSelectedPatient] = useState<Patients | null>(null);
  const [roles, setRoles] = useState<string[]>([]); // Estado para los roles seleccionados
  const router = useRouter();

  const openModal = (patient: Patients) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    // Cargar los roles del paciente seleccionado al abrir el modal
    setRoles([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setRoles([]);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const addRole = (role: string) => {
    if (!roles.includes(role)) {
      setRoles([...roles, role]);
    }
  };

  const removeRole = (role: string) => {
    setRoles(roles.filter((r) => r !== role));
  };

  const guardarCambios = () => {
    // Aquí podrías enviar los roles actualizados al backend o hacer la lógica necesaria
    console.log("Roles seleccionados:", roles);
    // Cerrar el modal después de guardar los cambios
    closeModal();
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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await allPatients();
        console.log("Fetched patients:", patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  console.log("pacientes:", patients);

  return (
    <div>
      {patients.map((patient) => (
        <div className="w-full flex flex-row gap-5" key={patient.person.id}>
          <div className="w-[31%] p-3 flex flex-row gap-4">
            <Image
              src={patient.person.photo}
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <Link href={`/admin/users/patients/${patient.id}`}>
              <p>
                {patient.person.first_name} {patient.person.last_name}
              </p>
            </Link>
          </div>
          <div className="w-[18%] p-3">
            <p>{patient.person.phone}</p>
          </div>
          <div className="w-[23%] p-3">
            <p>{patient.person.email}</p>
          </div>
          <div className="w-[14%] p-3">
            <p>{patient.person.dni}</p>
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
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201219/Trash_e3pep7.svg"
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Editar roles</h2>
            <span
              className="cursor-pointer text-black font-bold"
              onClick={closeModal}
            >
              X
            </span>
          </div>
          <h3 className="text-lg mb-4 text-black">
            Roles de{" "}
            <span className="text-red-700">
              {selectedPatient.person.first_name}{" "}
              {selectedPatient.person.last_name}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {roles.map((role) => (
              <div key={role} className="flex items-center gap-2 bg-slate-400 p-1 rounded">
                <span className="text-black font-medium">{role}</span>
                <div
                 
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => removeRole(role)}
                >
                  -
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <div
              className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 cursor-pointer"
              onClick={() => addRole("Paciente")}
            >
              Agregar Paciente
            </div>
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              onClick={() => addRole("Superadmin")}
            >
              Agregar Superadmin
            </div>
            <div
             
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
              onClick={() => addRole("Profesional")}
            >
              Agregar Profesional
            </div>
            <div
             
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer"
              onClick={() => addRole("Administrativo")}
            >
              Agregar Administrativo
            </div>
          </div>
          <div
           
            className="w-full bg-blue-500 text-white p-2 rounded text-center cursor-pointer"
            onClick={guardarCambios}
          >
            Guardar
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CardTotalPatient;
