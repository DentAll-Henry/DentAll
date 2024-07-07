"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '../Modal/Modal';
import { Patients } from '@/types';
import { useRouter } from 'next/navigation';
import { allPatients } from '@/helpers/patients.helper';

function CardTotalPatient() {
  type User = {
    id: string;
    [key: string]: any;
  };

  const [patients, setPatients] = useState<Patients[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Profesional');
  const [selectedPatient, setSelectedPatient] = useState<Patients | null>(null);
  const router = useRouter();

  const openModal = (patient: Patients) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
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
        console.log('Fetched patients:', patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  console.log('pacientes:', patients);

  return (
    <div>
      {patients.map((patient) => (
        <div className="w-full flex flex-row gap-5" key={patient.person.id}>
          <div className="w-[31%] p-3 flex flex-row gap-4">
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <Link href="/admin">
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Editar usuario</h2>
              <span
                className="cursor-pointer text-black font-bold"
                onClick={closeModal}
              >
                X
              </span>
            </div>
            <h3 className="text-lg mb-4 text-black">
              Cambiar Rol a{" "}
              <span className="text-red-700">
                {selectedPatient.person.first_name}{" "}
                {selectedPatient.person.last_name}
              </span>
            </h3>
            <form>
              <label className="block mb-2 text-black font-bold">Rol:</label>
              <select
                className=" text-black font-medium block w-full p-2 border rounded mb-4"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option className="text-black" value="Paciente">
                  Paciente
                </option>
                <option className="text-black" value="Profesional">
                  Profesional
                </option>
              </select>
              <button
                type="button"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CardTotalPatient;
