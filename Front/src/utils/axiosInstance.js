import axios from "axios";
import { enviroment } from "@/utils/config";

const axiosInstance = axios.create({
  baseURL: `${enviroment.apiUrl}`,
  // timeout: 10000, // Timeout de 10 segundos
  // headers: {
  //   "Content-Type": "application/json",
  // },
});


function getToken() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("userSession")?.token;
    if (token) {
      resolve(token);
    } else {
      // Aquí podrías implementar lógica para esperar a que el token esté disponible
      resolve("");
    }
  });
}


// Interceptor para añadir el token de autorización a las solicitudes
axiosInstance.interceptors.request.use(
async (config) => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
   return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
