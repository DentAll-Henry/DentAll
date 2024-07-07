'use client'
import{ useEffect, useState } from "react";
import NavDash from "@/components/NavBar/navDash";
import Link from "next/link";
import Citas from "@/components/Citas/Citas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enviroment } from "@/utils/config";
import { Appointment } from "@/types";

type User = {
  id: string;
  [key: string]: any;
};

const RenderCitas = () => {
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>(
    []
  );
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loggin, setLoggin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser.userData);
      setLoggin(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchAppointments = async () => {
    if (loggin && user && user.id) {
      try {
        const patient = await axios.get(
          `${enviroment.apiUrl}/patients/person/${user.id}`
        );
        const futureResponse = await axios.get(
          `${enviroment.apiUrl}/appointments/patient/${patient.data.id}?only_future=true`
        );
        console.log(futureResponse.data);
        setFutureAppointments(futureResponse.data);

        const pastResponse = await axios.get(
          `${enviroment.apiUrl}/appointments/patient/${patient.data.id}?only_past=true`
        );
        setPastAppointments(pastResponse.data);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }
  };
  console.log("este es un componente valido");

  useEffect(() => {
    fetchAppointments();
  }, [loggin, user]);

  return (
    <div >
      
      <div className="flex justify-between items-center m-8 mt-24">
        <h2 className="text-[58px] text-center text-white font-bold leading-normal">
          Mis <span className="text-[#00CE90]">citas</span>
        </h2>
      </div>
      <div className="flex justify-end">
        <Link href="/patients/create-appointment">
          <p className="bg-gray-500 p-1 mr-8 rounded-md cursor-pointer">
            + Agregar cita
          </p>
        </Link>
      </div>
      <div>
        <Citas
          futureAppointments={futureAppointments}
          pastAppointments={pastAppointments}
        />
      </div>
    </div>
  );
};

export default RenderCitas;
