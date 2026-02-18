import axios, { AxiosRequestConfig } from "axios";

// Define a custom function that Orval will use to make requests
export const getWithResponseType = <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const isFormData = config.data instanceof FormData;

  // Create a custom Axios instance
  const customAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: isFormData
      ? {} // Let Axios set Content-Type automatically for FormData
      : { "Content-Type": "application/json" },
  });

  customAxios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Make the request using the custom Axios instance and return the data
  return customAxios({ ...config, responseType: "json" }).then(
    ({ data }) => data
  );
};

export default getWithResponseType;
