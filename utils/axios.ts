import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `
        Bearer ${token}
      `;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
