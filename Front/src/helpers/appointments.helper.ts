import axios from "axios";
import { enviroment } from "@/utils/config";

export async function getAppointmentId(id: string){
    try {
      console.log("Soy el ID ", id);
      const response = await axios.get(`${enviroment.apiUrl}/appointments/patient/${id}`);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      
    }
  }
  