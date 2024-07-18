import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function getAppointmentId(id: string) {
  try {
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/appointments/patient/${id}`
    );
    return response.data;
  } catch (error: any) {
    
  }
}
