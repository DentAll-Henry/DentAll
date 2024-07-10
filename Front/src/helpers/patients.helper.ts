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

export async function getPatientId(id:string) {
  try {
      const patients = await allPatients()
      const patient = patients.find((patient:any) => patient.id.toString() === id)
      if(!patient) throw new Error("Paciente no encontrado")
      return patient
  } catch (error:any) {
      console.log(error)
  }

}