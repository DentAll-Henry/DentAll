import NavDash from '@/components/NavBar/navDash'
import React, { useState } from 'react'
import TotalAppointments from '@/components/TotalAppointments/TotalAppointments'
import CalendarAppointments from '@/components/Calendar/CalendarAppointments'
function page() {

  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
      <NavDash />

      <div className="m-8 p-4 mt-24">
        <CalendarAppointments />
          {/* <TotalAppointments/> */}
        </div>


    </div>
  )
}

export default page