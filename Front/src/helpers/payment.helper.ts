import axios from "axios";
import { enviroment } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export async function getPaymentId(id: string) {
  try {
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/payments/payments_by_patient/${id}`
    );
    return response.data;
  } catch (error: any) {
    
  }
}
