import axios, { AxiosInstance, AxiosResponse } from "axios";

// Configuration utility for Admin API
interface AdminApiConfig {
  baseURL: string;
  isProduction: boolean;
}

// Get API Configuration for Admin    এই অংশে ইএনভি ফাইল এর কাজ করা হয়েছে। ব্যাকইন্ড এর এপিআই কে আনা হয়েছে
export const getAdminApiConfig = (): AdminApiConfig => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error("VITE_API_URL environment variable is not defined");
  }

  const isProduction =
    import.meta.env.VITE_APP_ENV === "production" || import.meta.env.PROD === true;

  return {
    baseURL: `${apiUrl}/api`,
    isProduction,
  };
};

// Create configured axios instance   ২য় কাজ AxiosInstance তৈরি করা হয়েছে এবং বেজ ইউআরএল কানেক্ট করা হয়েছে
const createApiInstance = (): AxiosInstance => {
  const { baseURL } = getAdminApiConfig();

  const instance = axios.create({
    baseURL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
    timeout: 30000, // ✅ 30 seconds
  });

  //add Request interceptor – to include auth token
  instance.interceptors.request.use((config) => {    // interceptors একটা মেথড config ও method 
    // Get token from localStorage (zustand persist stores it there)
     
    const authData = localStorage.getItem("auth-storage");
      if (authData) {
        try {
          const parsedData = JSON.parse(authData);
          const token = parsedData.state?.token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor – error handling   রেসপন্স interceptor তৈরি করা হয়েছে
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.code === "ERR_NETWORK") {
        console.error(
          "Network Error: Unable to connect to the server. Please check if the server is running."
        );
      }

      if (error.response?.status === 401) {
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create and export the configured axios instance
export const adminApi = createApiInstance();

// API Endpoints তৈরি করা হয়েছে
export const ADMIN_API_ENDPOINTS = {

  // Auth
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",

  // Users

  // Production

  //Categories
} as const;

// Helper function to build query parameters
export const buildAdminQueryParams = (
  params: Record<string, string | number | boolean | undefined | null>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export default adminApi;
