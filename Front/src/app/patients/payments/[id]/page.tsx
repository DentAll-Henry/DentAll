import NavDash from "@/components/NavBar/navDash";
import PaymentDetail from "@/components/Payments/PaymentDetail";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-[80%] h-screen bg-darkD-600 text-white ml-[20%] relative">
      <NavDash />
      <div>
        <PaymentDetail payment_id={params.id} />
      </div>
    </div>
  );
};

export default page;
