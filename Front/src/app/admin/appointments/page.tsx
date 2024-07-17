import NavDash from '@/components/NavBar/navDash'
import React from 'react'
import CalendarAppointments from '@/components/Calendar/CalendarAppointments'
function page() {

    return (
        <div className="w-[80%] h-screen  text-white ml-[20%] ">
            <NavDash />
            <div className="m-8 p-4 mt-24">
                <CalendarAppointments />
            </div>
        </div>
    )
}

export default page