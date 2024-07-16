import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function allDentist() {
  try {
    const response = await axiosInstance.get(`/dentists/`);
    console.log("este es el response", response);

    return response.data;
  } catch (error) {
    console.error("aca hay error", error);
    throw error;
  }
}

export async function getDentistId(id: string) {
  try {
    console.log("Soy el ID ", id);
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/dentists/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
