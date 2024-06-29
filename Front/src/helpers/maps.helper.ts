import axios from "axios";
import { enviroment } from "@/utils/config";

export async function fetchMapData() {
  try {
    const response = await axios.get(`${enviroment.apiUrl}/head-cuarter/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
