import axios from "axios"
import { enviroment } from "@/utils/config"

export const getAppointmentId = async (
  health_Insurance: string,
  observations: string,
  deseases: string[],
  medication: string,
  patient_id: string,
  tooothInfo: [],
  treatments: []
) => {
  try {
    const response = await axios.get(
      `${enviroment.apiUrl}/dental-record/${{
        health_Insurance,
        observations,
        deseases,
        medication,
        patient_id,
        tooothInfo,
        treatments,
      }}`
    )
    console.log(response)
    return response.data
  } catch (error: any) {
    console.log(error)
  }
}

