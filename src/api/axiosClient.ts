/* eslint-disable */
import axios, { AxiosError, AxiosResponse } from "axios";
import AxiosResponseData from "../models/axios";
import { BadRequestFieldError, HttpResponse } from "../models/http";
import env from "./../app/env";
import {
  getRefreshToken,
  setRefreshToken,
  setToken,
} from "../services/localStorageService";

const axiosClient = axios.create({
  baseURL: env.baseGatewayUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Separate instance for refresh token to avoid circular dependencies
const axiosRefresh = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  // @ts-expect-error: we want to return the different data type
  (response: AxiosResponse<AxiosResponseData>) => {
    const { status, data: responseData, headers } = response;
    const data: HttpResponse<object> = {
      status,
      ok: true,
      body: responseData,
      data: function (): { payload: any; type: "auth/loginSuccess" } {
        throw new Error("Function not implemented.");
      },
    };

    if (headers.link) {
      data.pagination = {
        paging: 0,
        total: Number(headers["x-total-count"]),
      };
    }

    return data;
  },
  ({ response }) => {
    const { status, data } = response as AxiosResponse<AxiosResponseData>;
    const fieldErrors: BadRequestFieldError = {};

    if (
      typeof data?.fieldErrors === "object" ||
      Array.isArray(data?.fieldErrors)
    ) {
      if (data?.fieldErrors?.length) {
        data.fieldErrors.forEach(({ field, messageCode }) => {
          if (fieldErrors[field]) {
            fieldErrors[field].push(messageCode);
          } else {
            fieldErrors[field] = [messageCode];
          }
        });
      }
    }

    const error: HttpResponse = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        messageCode: data?.messageCode || data?.data?.messageCode,
        title: `${data?.messageCode || ""}-title`,
        errors: data?.errors,
        detail: data?.detail,
        data: data?.data,
        fieldErrors: fieldErrors,
      },
      data: function (): { payload: any; type: "auth/loginSuccess" } {
        throw new Error("Function not implemented.");
      },
    };
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {

    // Ensure error.response and error.config are defined
    if (error.response && error.config) {
      const originalRequest = error.config;

      // Check if the error is a 401 and if the request hasn't been retried yet
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent endless retries

        // Try to refresh the token
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const response = await axios.post("/refresh-token", {
              refreshToken,
            });
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            setToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            // Retry the original request with the new token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure (e.g., redirect to login)
            window.location.href = "/login";
          }
        } else {
          // No refresh token available, redirect to login
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

const handleRequest = (promise: Promise<HttpResponse>) =>
  promise.then((res) => res).catch((err) => err as HttpResponse<any>);

export default axiosClient;

export { handleRequest };
