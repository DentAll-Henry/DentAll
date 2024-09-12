import axios from "axios";
import { enviroment } from "@/utils/config";
import { PatientId, PersonInterface } from "@/types";
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
    const response = await axiosInstance.get(
      `${enviroment.apiUrl}/patients/${id}`
    );
    return response.data;
  } catch (error: any) {}
}

export async function getPatientDentistId(id: string) {
  try {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  } catch (error: any) {}
}

export async function getTotalPatient() {
  try {
    const response = await axiosInstance.get(`/patients/quantity`);
    return response.data;
  } catch (error: any) {}
}

export async function getTotalDentist() {
  try {
    const response = await axiosInstance.get(`/dentists/quantity`);
    return response.data;
  } catch (error: any) {}
}

export async function getTotalAdministrative() {
  try {
    const response = await axiosInstance.get(
      `/people/administratives/quantity`
    );
    return response.data;
  } catch (error: any) {}
}

export async function getTotalSuperAdmin() {
  try {
    const response = await axiosInstance.get(`/people/superadmins/quantity`);
    return response.data;
  } catch (error: any) {}
}

export async function getPeopleByRole(role: string) {
  try {
    const userSession = localStorage.getItem("userSession");
    const tokenInfo = userSession ? JSON.parse(userSession) : null;

    const response = await axiosInstance.get(`/people/byrole/${role}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function getPeopleByMail(people: PersonInterface) {
  try {
    const response = await axiosInstance.get(`/people/byemail`, {
      params: {
        email: people.email,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
