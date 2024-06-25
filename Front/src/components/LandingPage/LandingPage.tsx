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
      
    </div>
  )
}

export default LandingPage