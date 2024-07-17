import axios from "axios";
import { enviroment } from "@/utils/config";
import { PatientId } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

export async function allPatients() {
  try {
    const response = await axiosInstance.get(`/patients/`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPatientId(id: string) {
  try {
    console.log("Soy el ID ", id);
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/patients/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getPatientDentistId(id: string) {
  try {
    console.log("Soy el ID ", id);
    const response = await axiosInstance.get(
      `/patients/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}




export async function getTotalPatient() {
  try {
    
    const response = await axiosInstance.get(
      `/patients/quantity`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getTotalDentist() {
  try {
    
    const response = await axiosInstance.get(
      `/dentists/quantity`
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getTotalAdministrative() {
  try {
    const response = await axiosInstance.get(`/people/administratives/quantity`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getTotalSuperAdmin() {
  try {
    const response = await axiosInstance.get(`/people/superadmins/quantity`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}