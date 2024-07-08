import { enviroment } from "@/utils/config"
import axios from "axios"

export const handlePayment = async (
  patient_id: string,
  dentalServ_id: string
) => {
  try {
    const response = await axios.post(
      `${enviroment.apiUrl}/payments/new-preference`,
      {
        patient_id,
        dentalServ_id,
      }
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

