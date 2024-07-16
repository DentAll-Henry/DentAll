import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function getAppointmentId(id: string) {
  try {
    console.log("Soy el ID ", id);
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/appointments/patient/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
