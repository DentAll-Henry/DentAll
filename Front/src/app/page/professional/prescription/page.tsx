import NavDash from '@/components/NavBar/navDash'
import React from 'react'
import Image from 'next/image'
function page() {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
        <NavDash />
        <div className=" flex flex-row w-full m-8 p-4 mt-24">
            <div className='w-1/2 flex justify-center items-center '>
                <Image
                className="group-hover:fill-current text-white"
                src="/images/prescription.svg"
                width={400}
                height={400}
                alt="Pacientes"
                />
            </div>
            <div className='w-1/2 flex justify-start items-center'>
                <div className='bg-darkD-500 p-8 flex flex-col gap-5 rounded-lg'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-3xl font-semibold'>Elabora tu receta médica</h3>
                        <p>Por favor llena los campos para elaborar su receta médica</p>
                    </div>
                    
                    <form className="flex flex-col gap-4" action="">
                        <label className='font-semibold'>Nombre del medicamento</label>
                        <input className='bg-zinc-500 rounded-lg p-1' type="text" />
                        <label className='font-semibold'>Dosis/cantidad</label>
                        <input className='bg-zinc-500 rounded-lg p-1' type="text" />
                        <label className='font-semibold' >Prolongación de tiempos</label>
                        <input className='bg-zinc-500 rounded-lg p-1' type="text" />
                        <label className='font-semibold'>Informacion adicional</label>
                        <input className='bg-zinc-500 rounded-lg p-1' type="text" />
                        <button className='bg-greenD-500 p-2 rounded-lg font-semibold'>Generar receta</button>
                    </form>
                </div>
            </div>
            
        </div>

      
    </div>

  )
}

export default page
