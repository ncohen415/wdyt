import React, { useEffect, useState } from "react"
import axios from "axios"
import axiosRetry from "axios-retry"
import { useLocalStorage } from "./auth/useLocalStorage"
import { decode } from "base-64"
import { getItemAsync, getItem } from "expo-secure-store"

const useAxios = () => {
  const { setItem } = useLocalStorage()

  // const axiosClient = axios.create({
  //     baseURL: env.REACT_APP_ENVIRONMENT === "local" ? `http://${window.location.hostname}:8002/api/` : `https://${env.REACT_APP_API_URL}/api/`,
  //     timeout: 1000000,
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json',
  //     }
  // });
  const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 1000000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })

  axiosClient.interceptors.request.use(
    (config) => {
      const accessToken = getItem("access_token")
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
    (error) => {
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
        const refreshToken = getItem("refresh_token")
        if (refreshToken && refreshToken !== null) {
          const tokenParts = JSON.parse(decode(refreshToken.split(".")[1]))
          const now = Math.ceil(Date.now() / 1000)
          if (tokenParts.exp > now) {
            return axiosClient
              .post("/main/token/refresh/", { refresh: refreshToken })
              .then((response) => {
                if (response && response.data) {
                  setItem("access_token", response.data.access)
                  setItem("refresh_token", response.data.refresh)
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
