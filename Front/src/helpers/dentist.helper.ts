import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function allDentist() {
  try {
    const response = await axiosInstance.get(`/dentists/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDentistId(id: string) {
  try {
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/dentists/${id}`
    );
    return response.data;
  } catch (error: any) {
    
  }
}
