import axios from 'axios';
import { enviroment } from "@/utils/config";

const axiosInstance = axios.create({
  baseURL: `${enviroment.apiUrl}`,
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
