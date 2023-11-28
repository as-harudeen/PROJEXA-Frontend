// import { axiosInstance } from "../lib/api";

// /**
//  * Perform a GET request using Axios.
//  *
//  * @param {string} url - The URL to fetch data from.
//  * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
//  */
// export const getRequest = async (url: string) => {
//   return await axiosInstance.get<T>(url);
//   // return await fetch(import.meta.env.VITE_BASE_URL + url, {
//   //   method: "GET",
//   //   credentials: "include",
//   // });
// };

// /**
//  * Perform a POST request using Axios.
//  *
//  * @param {string} url - The URL to send the POST request to.
//  * @param {T} payload - The data to send as the request body.
//  * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
//  */
// export const postRequest = async <T extends object>(
//   url: string,
//   payload: T
// ) => {
//   return await axiosInstance.post(url, payload);
// };

// /**
//  * Perform a PATCH request using Axios.
//  *
//  * @param {string} url - The URL to send the PATCH request to.
//  * @param {T} payload - The data to send as the request body.
//  * @returns {Promise<AxiosResponse>} A promise that resolve to the Axios response.
//  */
// export const patchRequest = async <T extends object>(
//   url: string,
//   payload: T
// ) => {
//   return await axiosInstance.patch(url, payload);
// };

// /**
//  * Perform a PUT request using Axios.
//  *
//  * @param {string} url - The URL to send the PUT request to.
//  * @param {T} payload - The data to send as the request body.
//  * @returns {Promise<AxiosResponse>} A promise that resolve to the Axios response.
//  */
// export const putRequest = async <T extends object>(url: string, payload: T) => {
//   return await axiosInstance.put(url, payload);
// };

// /**
//  * Perform a DELETE request using Axios.
//  *
//  * @param {string} url - The URL to send the DELETE request to.
//  * @param {T} payload - The data to send as the request body.
//  * @returns {Promise<AxiosResponse>} A promise that resolve to the Axios response.
//  */
// export const deleteRequest = async <T extends object>(
//   url: string,
//   payload?: T
// ) => {
//   return await axiosInstance.delete(url, payload);
// };
