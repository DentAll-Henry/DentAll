import { enviroment } from "@/utils/config";
import axios from "axios";

export async function fetchService() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/dental-serv/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
