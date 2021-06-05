import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// TODO: save using native APIs
let currentKey: string;

export const saveKey = (key: string) => {
  currentKey = key;
};

export const getKey = (): string | null => {
  return currentKey;
};

axiosInstance.interceptors.response.use((response) => {
  if ("set-api-token" in response.headers) {
    saveKey(response.headers["set-api-token"]);
  }
  return response;
});

axiosInstance.interceptors.request.use((config) => {
  const k = getKey();
  if (k) {
    if (config.headers) {
      config.headers["api-token"] = k;
    } else {
      config.headers = { "api-token": k };
    }
  }
  return config;
});

export default axiosInstance;
