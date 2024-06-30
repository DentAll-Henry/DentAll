import Image from 'next/image';
import React from 'react'

const Citas = () => {
  return (
    <div className="mx-8 mt-4">
      <div className="bg-darkD-500 grid grid-cols-6 gap-4 p-4 rounded-md items-center">
        <p className="text-white text-center">Fecha</p>
        <p className="text-white text-center">Hora</p>
        <p className="text-white text-center">Tipo de consulta</p>
        <p className="text-white text-center">Estado</p>
        <Image
          className="justify-self-center ml-[80%] "
          src="/images/NotePencil.svg"
          width={35}
          height={35}
          alt="Editar"
        />
        <Image
          className="justify-self-center"
          src="/images/ToggleLeft.svg"
          width={35}
          height={35}
          alt="Ver"
        />
      </div>
      <div className="grid grid-cols-6 gap-4  rounded-md mt-4 items-center">
        <p className="bg-gray-500 text-white p-2 rounded-md text-center">
          27/06/2024
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center">
          14:00
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center">
          Dolor de muelita
        </p>
        <p className="bg-green-500 text-white p-2 rounded-md text-center">
          Activo
        </p>
        <div className="justify-self-center bg-blue-500 p-2 rounded-md ml-[67%]">
          <Image
            className="h-6"
            src="/images/NotePencil.svg"
            width={35}
            height={35}
            alt="Editar"
          />
        </div>
        <p className="bg-red-500 text-white p-2 rounded-md text-center cursor-pointer">
          cancelar
        </p>
      </div>
      
    </div>
  );
}

export default Citas
