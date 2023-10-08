import { axiosInstance } from "../lib/api";

/**
 * Perform a GET request using Axios.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
 */
export const getRequest = async (url: string) => {
  return await axiosInstance.get(url);
};

/**
 * Perform a POST request using Axios.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {T} payload - The data to send as the request body.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
 */
export const postRequest = async <T extends object>(
  url: string,
  payload: T
) => {
  return await axiosInstance.post(url, payload);
};

/**
 * Perform a PATCH request using Axios.
 *
 * @param {string} url - The URL to send the PATCH request to.
 * @param {T} payload - The data to send as the request body.
 * @returns {Promise<AxiosResponse>} A promise that resolve to the Axios response.
 */
export const patchRequest = async <T extends object>(
  url: string,
  payload: T
) => {
  return await axiosInstance.patch(url, payload);
};
