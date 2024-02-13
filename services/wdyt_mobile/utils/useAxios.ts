import axios from "axios"
import axiosRetry from "axios-retry"
import { getLocalData, setLocalData } from "./LocalStorage"

const useAxios = () => {
  const mobileApp = process.env.EXPO_PUBLIC_MOBILE_APP

  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  }
  if (mobileApp === "true") {
    headers = {
      ...headers,
      "x-mobile-app": "true",
    }
  }
  const axiosClient = axios.create({
    baseURL:
      process.env.EXPO_PUBLIC_ENVIRONMENT == "local"
        ? process.env.EXPO_PUBLIC_API_URL
        : `https://${process.env.EXPO_PUBLIC_API_URL}/api/`,
    timeout: 1000000,
    headers: headers,
  })
  axiosClient.interceptors.request.use(
    async (config) => {
      const accessToken = await getLocalData("access_token")
      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (
        error &&
        error.response &&
        error.response.status === 401 &&
        (originalRequest.url === "/main/token/refresh/" ||
          originalRequest.url === "main/token/refresh/")
      ) {
        return Promise.reject(error)
      }
      if (error && error.response && error.response.status === 401) {
        const refreshToken = await getLocalData("refresh_token")
        if (refreshToken && refreshToken != "null") {
          const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))
          const now = Math.ceil(Date.now() / 1000)
          if (tokenParts.exp > now) {
            return axiosClient
              .post("/main/token/refresh/", { refresh: refreshToken })
              .then(async (response) => {
                if (response && response.data) {
                  await setLocalData("access_token", response.data.access)
                  await setLocalData("refresh_token", response.data.refresh)
                  axiosClient.defaults.headers["Authorization"] =
                    "Bearer " + response.data.access
                  originalRequest.headers["Authorization"] =
                    "Bearer " + response.data.access
                }
                return axiosClient(originalRequest)
              })
              .catch((err) => {})
          }
        }
      }
      return Promise.reject(error)
    }
  )
  axiosRetry(axiosClient, { retries: 3 })
  return axiosClient
}

export default useAxios
