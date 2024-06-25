import Image from 'next/image'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <section className='flex flex-row bg-[#1D1D1D] '>

        <div className='w-1/2 flex flex-col items-center'>
          <div className='flex flex-col p-7 gap-[50px]'>
            <div className=' text-white flex flex-col gap-0 text-[58px] font-bold leading-normal '>
              <h2>ILUMINA </h2>
              <h2 className='text-[#00CE90]'>TU SONRISA</h2>
              <h2>CON NOSOTROS </h2>
            </div>
            <Image src="/images/dental1.png" alt="dental custum" width={500} height={500}/>
          </div>
          

        </div>

        <div className='w-1/2 pt-10'>

          <div className=' w-[80%] flex flex-col p-4 gap-[40px]'>
            <div className='flex flex-col gap-[31px]' >
              <p className='text-white'>Confía en nosotros para cuidar tu sonrisa. Asegura la salud y protección de tu sonrisa con nuestro equipo de expertos en odontología. Nuestros servicios ofrecen respuestas rápidas y atención personalizada.</p>
              <button className='w-[35%] text-[16px] text-[#00CE90] font-semibold border border-[#00CE90] rounded-[1px] p-3'>Agendar cita </button>
            </div>
            <Image src="/images/dental2.png" alt="dental custum" width={700} height={700}/>
          </div>
  
        </div>

      </section>

      <section className='flex flex-col bg-[#1D1D1D] m-10 gap-5'>
        <h2 className='text-[58px] text-center  text-white font-bold leading-normal'>NUESTROS <span className='text-[#00CE90]' >SERVICIOS</span></h2>
        <div className='flex flex-row gap-12 '>
            <div className='bg-[#00CE90] flex flex-col gap-3 p-9 rounded-lg'>
                <h3 className='text-[34px] font-semibold'>Blanqueamiento dental</h3>
                <p className='text-[16px] font-semibold'> Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental profesional elimina manchas y decoloraciones para un aspecto más luminoso y juvenil</p>
                <div className='flex justify-center pr-16'>
                <Image  className='text-center' src="/images/dentalVeneer.png" alt="" width={150} height={150}/>
                </div>
               
            </div>

            <div className='bg-white flex flex-col gap-3 p-9 rounded-lg'>
                <h3 className='text-[34px] font-semibold'>Blanqueamiento dental</h3>
                <p className='text-[16px] font-semibold'> Devuelve el brillo a tu sonrisa. Nuestro blanqueamiento dental profesional elimina manchas y decoloraciones para un aspecto más luminoso y juvenil</p>
                <div className='flex justify-center pr-16'>
                <Image  className='text-center' src="/images/toothWhite.png" alt="" width={150} height={150}/>
                </div>
               
            </div>
        </div>

        <div className='flex flex-row gap-8 text-center'>

            <div className='bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg'>Implantes dentales</div>
            <div className='bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg'>Reconstrucción Dental</div>
            <div className='bg-white w-1/3 py-[40px] px-[65px] text-[24px] font-semibold rounded-lg'>Puentes dentales</div>

        </div>
        

      </section>
      
    </div>
  )
}

export default LandingPage