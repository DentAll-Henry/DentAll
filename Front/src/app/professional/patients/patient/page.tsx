import React from 'react'
import Image from 'next/image'
import NavDash from '@/components/NavBar/navDash'
import Link from 'next/link'
function page() {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
      <NavDash />

      <div className="m-8 p-4 mt-24">
        <div className=" w-1/2 flex flex-row bg-darkD-500 p-2 gap-6 rounded-xl">
          <div className="flex flex-col pt-4 pl-4 gap-12">
            <Image
              className="group-hover:fill-current text-white"
              src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201310/Pill_nl6wd1.svg"
              width={35}
              height={35}
              alt="pill"
            />

            <Link href="/professional/patients">
              <div className=" flex flex-row gap-2 p-2 justify-center items-center text-greenD-700 border border-greenD-700 border-[2px] rounded-md">
                <p>Elaborar recetas médicas</p>
                <Image
                  className="group-hover:fill-current text-white"
                  src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201236/ArrowCircleRight_fmrwlc.svg"
                  width={35}
                  height={35}
                  alt="flecha"
                />
              </div>
            </Link>
          </div>

          <Image
            className="group-hover:fill-current text-white"
            src="https://res.cloudinary.com/ddpohfyur/image/upload/v1720201239/capsula_as0gvt.svg"
            width={230}
            height={230}
            alt="Recomendaciones a Pacientes"
          />
        </div>
      </div>
    </div>
  );
}

export default page
