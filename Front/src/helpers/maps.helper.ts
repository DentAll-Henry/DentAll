import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function fetchMapData() {
  try {
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/headquarter/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
