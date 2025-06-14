import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

export class AuthError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message)
    this.name = "Auth Error"
  }
}

export class ServerError extends Error {
  constructor(message: string = "Server error") {
    super(message)
    this.name = "Server Error"
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error") {
    super(message)
    this.name = "Network Error"
  }
}

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
})

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((callback) => callback());
  failedQueue = [];
};


api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const csrfToken = Cookies.get("csrf_token");
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
)


api.interceptors.response.use((response: AxiosResponse): AxiosResponse => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      throw new NetworkError("Unable to reach the server");
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push(() => {
            api(originalRequest).then(resolve).catch(reject);
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post("http://localhost:8000/api/v1/auth/refresh-token",
            {},
            { withCredentials: true }
        )

        if (refreshResponse.status === 200) {
          processQueue()
          return api(originalRequest)
        }
      } catch (refreshError) {
            throw new AuthError("Token cannot be refreshed")
      } finally {
            isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api

export const fetcher = (url: string) => api.get(url).then((res) => res.data)