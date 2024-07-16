import axios from "axios";
import { enviroment } from "@/utils/config";
import { PatientId } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

export async function allPatients() {
  try {
    const response = await axiosInstance.get(`/patients/`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPatientId(id: string) {
  try {
    console.log("Soy el ID ", id);
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/patients/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
