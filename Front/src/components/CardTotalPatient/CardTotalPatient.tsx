"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../Modal/Modal';
function CardTotalPatient() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
   
  return (
    <div>
        
            <div className='w-full flex flex-row gap-5 '>
                <div className='w-[31%] p-3 flex flex-row gap-4'>
                    <Image
                        src="/images/profile.png"
                        width={24}
                        height={24}
                        alt="foto de perfil"
                    />
                    <Link href="/page/admin"><p>Manu Ochoa</p></Link>
                </div>

                <div className='w-[18%] p-3'>
                    <p>9120002131</p>
                </div>
                
                <div className='w-[23%] p-3'>
                    <p>manumuelita@gmail.com</p>
                </div>

                <div className='w-[14%] p-3'>
                    <p>27/03/2024</p>
                </div>

                <div className='w-[14%] p-3 flex flex-row gap-8'>
                <Image onClick={openModal}
                        src="/images/PencilSimple.svg"
                        width={24}
                        height={24}
                        alt="editar"
                    />
                <Image
                        src="/images/Trash.svg"
                        width={24}
                        height={24}
                        alt="eliminar"
                    />
                </div>

            </div>
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='flex flex-row justify-between'>
                <h2 className="text-xl font-bold mb-4 text-black">Edit User</h2>
                <span className='text-black font-bold'>X</span>
            </div>
                <h3 className="text-lg mb-2 text-black ">Cambiar Rol a Manu Ochoa</h3>
                <form>
                    <label className="block mb-2 text-black ">Rol:</label>
                    <select
                        className="block w-full p-2 border rounded"
                        value="proffesional"
                       
                    >
                        <option className="text-black bg-blue-800" value="Paciente">Paciente</option>
                        <option className="text-black bg-blue-800" value="Profesional">Profesional</option>
                    </select>
                    <button
                        type="button"
                        
                        className="mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        Save
                    </button>
                </form>
        </Modal>
    </div>
    
  )
}

export default CardTotalPatient
