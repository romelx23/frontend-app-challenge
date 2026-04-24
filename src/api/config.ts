import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const api_url = "https://skzsckvq-3000.brs.devtunnels.ms";

export const serverApi = axios.create({
  baseURL: `${api_url}`,
});

serverApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("x-token"); // Obtener el token desde AsyncStorage
    console.log(token);
    // No establecer Content-Type, Axios lo hará automáticamente cuando uses FormData
    return config;
  },
  (error) => {
    console.log({ error });
    // Handle request errors if needed
    return Promise.reject(error);
  }
);
