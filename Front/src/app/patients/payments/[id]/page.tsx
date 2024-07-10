
import PaymentDetail from '@/components/Payments/PaymentDetail'
import React, { useEffect, useState } from 'react'

const page = ({params}:{params:{id:string}})=> {
    
    
  return (
    <div className = "w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative" >
            <PaymentDetail payment_id={params.id} />
    </div>
  )
}

export default page
