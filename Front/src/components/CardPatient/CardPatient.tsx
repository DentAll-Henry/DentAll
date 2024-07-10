import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function CardPatient() {
  return (
    <div>
      <Link href="#">
        <div className="w-full flex flex-row gap-5 ">
          <div className="w-[31%] p-3 flex flex-row gap-4">
            <Image
              src="/images/profile.png"
              width={24}
              height={24}
              alt="foto de perfil"
            />
            <p>Manu Ochoa</p>
          </div>

          <div className="w-[18%] p-3">
            <p>9120002131</p>
          </div>

          <div className="w-[23%] p-3">
            <p>manumuelita@gmail.com</p>
          </div>

          <div className="w-[14%] p-3">
            <p>27/03/2024</p>
          </div>

          <div className="w-[14%] p-3 flex flex-row gap-8">
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201305/PencilSimple_ugfifd.svg"
              width={24}
              height={24}
              alt="editar"
            />
            <Image
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201219/Trash_e3pep7.svg"
              width={24}
              height={24}
              alt="eliminar"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardPatient
