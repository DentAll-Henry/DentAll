import NavDash from '@/components/NavBar/navDash'
import React from 'react'
import Image from 'next/image'
function page() {
  return (
    <div className="w-[80%] h-screen text-white ml-[20%] relative ">
      <NavDash />
      <div className='m-4 mt-24 '>
        <h3>Superadmin: Manu Ochoa</h3>
      </div>
      <div className='m-4 flex flex-col gap-4'>
        <p>Resumen Estadístico</p>
        <div className=" grid grid-cols-3 gap-3">
            <div className="flex flex-row  ">
                    <div className="flex justify-center bg-[#F69ACC] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                    <Image
                        className="group-hover:fill-current text-white"
                        src="/images/UsersThree.svg"
                        width={35}
                        height={35}
                        alt="usuarios"
                    />
                    </div>
                    
                    <div className="bg-[#f69acd24] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
                    <p className="text-xs text-[#F69ACC] ">Total de pacientes</p>
                    <p className="text-sm">10 pacientes</p>
                    </div>
                    
                </div>
                <div className="flex flex-row  ">
                    <div className="flex justify-center bg-[#F6CC9A] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                    <Image
                        className="group-hover:fill-current text-white"
                        src="/images/userNurse.svg"
                        width={35}
                        height={35}
                        alt="usuarios"
                    />
                    </div>
                    
                    <div className="bg-[#f6e79a24] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
                    <p className="text-xs text-[#F6CC9A] ">Total de profesionales</p>
                    <p className="text-sm">10 pacientes</p>
                    </div>
                    
                </div>
                <div className="flex flex-row  ">
                    <div className="flex justify-center bg-[#a2f69a] p-4 w-[20%] rounded-tl-[10px] rounded-tr-0 rounded-br-0 rounded-bl-[10px]">
                    <Image
                        className="group-hover:fill-current text-white"
                        src="/images/schedule.svg"
                        width={35}
                        height={35}
                        alt="usuarios"
                    />
                    </div>
                    
                    <div className="bg-[#9af6a224] w-[80%] p-4 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0">
                    <p className="text-xs text-[#a2f69a] ">Total de citas pendientes</p>
                    <p className="text-sm">10 pacientes</p>
                    </div>
                    
                </div>
            </div>
        
      </div>
      

        
      
    </div>
  )
}

export default page
