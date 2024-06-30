import React from 'react'
const Citasr = () => {
  return (
    <div className="mx-8 mt-4 h-screen">
      <div className="bg-darkD-500 grid grid-cols-4 gap-4 p-4 rounded-md items-center">
        <p className="text-white text-center">Fecha</p>
        <p className="text-white text-center">Hora</p>
        <p className="text-white text-center">Tipo de consulta</p>
        <p className="text-white text-center">Estado</p>
      </div>

      <div className="grid grid-cols-4 gap-4  rounded-md mt-4 items-center">
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          27/06/2024
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          14:00
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          Dolor de muelita
        </p>

        <p className="bg-red-500 text-white p-2 rounded-md text-center ">
          Cancelado
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4  rounded-md mt-4 items-center">
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          27/06/2024
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          14:00
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          Dolor de muelita
        </p>
        <p className="bg-red-500 text-white p-2 rounded-md text-center ">
          Cancelado
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4  rounded-md mt-4 items-center">
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          27/06/2024
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          14:00
        </p>
        <p className="bg-gray-500 text-white p-2 rounded-md text-center ">
          Dolor de muelita
        </p>
        <p className="bg-red-500 text-white p-2 rounded-md text-center ">
          Cancelado
        </p>
      </div>
    </div>
  );
}

export default Citasr
