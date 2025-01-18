import { tokens } from "@/common/locals";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("BASE_URLBASE_URLBASE_URL", BASE_URL);


const api = (base_URL?: string, contentType?: any) => {
  const service = axios.create({
    baseURL: base_URL ?? BASE_URL,
    headers: {
      "Content-Type": contentType ?? "application/json",
    },
  });

  service.interceptors.request.use(
    async function (config) {
      const token = await tokens.get();

      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return service;
};

export default api;
