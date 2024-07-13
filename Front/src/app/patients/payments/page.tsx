import Image from "next/image";
import PaymentsHistory from "@/components/Payments/PaymentsHistory";
import NavDash from "@/components/NavBar/navDash";

const page = () => {
  return (
    <div className="w-[80%] h-screen  text-white ml-[20%] ">
      <NavDash />

      <div className=" mt-[10%] m-8 text-xl">
        <h2 className="font-bold">Historial de pagos</h2>
      </div>

      <div>
        <PaymentsHistory />
      </div>
    </div>
  );
};

export default page;
