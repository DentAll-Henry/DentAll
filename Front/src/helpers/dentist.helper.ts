import axios from "axios";
import { enviroment } from "@/utils/config";

export async function allDentist() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/dentists/`);
    console.log("este es el response",response)
    
    return response.data;
  } catch (error) {
    console.error("aca hay error",error);
    throw error;
  }
}