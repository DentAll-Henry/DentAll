import axios from "axios";
import { enviroment } from "@/utils/config";

export async function allPatients() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/patients/`);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}