import axios from "axios";
import { getCookie } from "./cookiesHelpers";
import { privateRoutes } from "./privateServices";

const axiosRequest = axios.create();

axiosRequest.interceptors.request.use(
  async (config) => {
    try {
      if (
        privateRoutes?.some((route) =>
          (config?.url as string)?.startsWith(route),
        )
      ) {
        const access_token = await getCookie("access_token");

        config.headers.Authorization = `Bearer ${access_token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosRequest;
