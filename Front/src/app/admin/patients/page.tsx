import NavDash from '@/components/NavBar/navDash'
import React, { useState } from 'react'
import TotalPatiens from '@/components/TotalPatients/TotalPatiens'

function page() {
 
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
        <NavDash />
        
        <div className="m-8 p-4 mt-24">
          <h1 className="text-2xl my-4">Lista de pacientes</h1>
            <TotalPatiens/>
        </div>

      
    </div>
  )
}

export default page
