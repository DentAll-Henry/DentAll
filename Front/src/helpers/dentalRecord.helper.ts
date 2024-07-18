import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

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
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/dental-record/${{
        health_Insurance,
        observations,
        deseases,
        medication,
        patient_id,
        tooothInfo,
        treatments,
      }}`
    );
    return response.data;
  } catch (error: any) {
    
  }
};
