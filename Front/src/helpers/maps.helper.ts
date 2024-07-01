import axios from "axios";
import { enviroment } from "@/utils/config";

export async function fetchMapData() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/headquarter/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
