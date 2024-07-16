import { enviroment } from "@/utils/config";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export const handlePayment = async (
  patient_id: string,
  appointment_id: string
) => {
  try {
    const response = await axiosInstance.post(`/payments/new-preference`, {
      patient_id,
      appointment_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
