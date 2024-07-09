import { Service } from "@/types"
import { enviroment } from "@/utils/config"
import axios from "axios"

export async function fetchService(): Promise<Service[]> {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/dental-serv/`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export async function createService(newServiceData: any) {
  try {
    newServiceData.price = parseFloat(newServiceData.price)
    const response = await axios.post(
      `${enviroment.apiUrl}/dental-serv/`,
      newServiceData
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateIsActiveService(id: string) {
  try {
    const response = await axios.patch(
      `${enviroment.apiUrl}/dental-serv/switch/${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error en la solicitud:", error)
    throw error
  }
}

export async function fetchServiceById(id: string) {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/dental-serv/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

