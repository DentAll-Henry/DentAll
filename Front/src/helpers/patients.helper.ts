import axios from "axios";
import { enviroment } from "@/utils/config";
import { PatientId } from "@/types";

export async function allPatients() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/patients/`);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPatientId(id: string){
  try {
    console.log("Soy el ID ", id);
    const response = await axios.get(`${enviroment.apiUrl}/patients/${id}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    
  }
}


