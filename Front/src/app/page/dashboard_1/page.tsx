import Image from 'next/image'
import React from 'react'


const page = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className=" flex w-full bg-greenD-800 p-4">
        <div>
          <Image
            src="/images/notificacion.svg"
            width={24}
            height={24}
            alt="Notificaciones"
          />
        </div>
        <div>
          <p>Manuel Ochoca</p>
        </div>
      </div>

      <div>
        <h2 className="text-[58px] text-center  text-white font-bold leading-normal">
          <span className="text-[#00CE90]">Bienvenido/a </span> Manuel Ochoa
        </h2>
      </div>
      PACIENTE
    </div>
  );
}

export default page
