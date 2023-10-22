import axios from "axios";

/**
 * Create an Axios instance with custom configuration
 * This instance is configured to communicate with a specific base URL-
 * and uses JSON for requests and responses.
 * It also Inclueds credentials with requests.
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});