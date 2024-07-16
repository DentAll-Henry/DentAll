"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '../Modal/Modal';
import { Dentist } from '@/types';
import { useRouter } from 'next/navigation';
import { allDentist } from '@/helpers/dentist.helper';

function CardTotalDentist() {
  type User = {
    id: string;
    [key: string]: any;
  };

  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Profesional');
  const [selectedDentist, setSelectedDentist] = useState<Dentist  | null>(null);
  const router = useRouter();

  const openModal = (dentist: Dentist) => {
    setSelectedDentist(dentist);
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
    const fetchDentists = async () => {
      try {
        const dentistsData = await allDentist();
        console.log('Fetched dentists:', dentistsData);
        setDentists(dentistsData);
      } catch (error) {
        console.error('Error fetching dentists:', error);
      }
    };

    fetchDentists();
  }, []);

  console.log('dentistas:', dentists);

  return (
    <div>
      {dentists.map((dentist) => (
        <div className='w-full flex flex-row gap-5' key={dentist.person.id}>
          <div className='w-[31%] p-3 flex flex-row gap-4'>
            <Image
              src={dentist.person.photo}
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <Link href={`/admin/users/dentists/${dentist.id}`}>
              <p>Dr.{dentist.person.first_name} {dentist.person.last_name}</p>
            </Link>
          </div>
          <div className='w-[18%] p-3'>
            <p>{dentist.person.phone}</p>
          </div>
          <div className='w-[23%] p-3'>
            <p>{dentist.person.email}</p>
          </div>
          <div className='w-[28%] p-3  '>
            <p className=' text-blue-500 rounded-sm px-1'>{dentist.specialty.name}</p>
          </div>
          <div className='w-[10%] p-3 flex flex-row gap-8'>
            <p className={dentist.is_active ? 'text-green-500 rounded-sm px-1' : 'text-gray-500 rounded-sm px-1'}>{dentist.is_active ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
      ))}
      {selectedDentist && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto'> 
            <div className='flex justify-between items-center mb-4'>
              <h2 className="text-xl font-bold text-black">Editar usuario</h2>
              <span className='cursor-pointer text-black font-bold' onClick={closeModal}>X</span>
            </div>
            <h3 className="text-lg mb-4 text-black">Cambiar Rol a <span className='text-red-700'>{selectedDentist.person.first_name} {selectedDentist.person.last_name}</span></h3>
            <form>
              <label className="block mb-2 text-black font-bold">Rol:</label>
              <select 
                className=" text-black font-medium block w-full p-2 border rounded mb-4"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option className="text-black" value="Paciente">Paciente</option>
                <option className="text-black" value="Profesional">Profesional</option>
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

export default CardTotalDentist;
