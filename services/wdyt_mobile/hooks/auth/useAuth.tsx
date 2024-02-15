import React, { useState, useContext, createContext } from "react"
import useAxios from "../useAxios"
import { Platform } from "react-native"
import { useLocalStorage } from "./useLocalStorage"
import { Redirect } from "expo-router"
import { useInterval } from "../util/useInterval"

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
}

type Context = {
  signin: Function
  signout: Function
  user: User | null
  setUser: Function
  error: boolean
  loggedInVerify: Function
}

const authContext = createContext<Context>({} as Context)
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const axios = useAxios()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(false)
  const [lastVerifyOn, setLastVerifyOn] = useState<Date | null>(null)
  const { getItem, setItem, removeItem } = useLocalStorage()
  const webPlatform = () => {
    return Platform.OS === "web"
  }

  const signin = async (email: string, password: string) => {
    try {
      setError(false)
      const response = await axios.post("main/token/obtain/", {
        email: email,
        password: password,
      })
      await setItem("access_token", response.data.access)
      await setItem("refresh_token", response.data.refresh)
      setUser(response.data.user)
      return response
    } catch (error) {
      setError(true)
    }
    return false
  }

  const signout = async () => {
    try {
      const refreshToken = await getItem("refresh_token")
      // if (webPlatform()) {
      //   await setLocalData("is_logged_in", false)
      // } else {
      //   await setLocalData("is_logged_in", "false")
      // }r
      await removeItem("access_token")
      await removeItem("refresh_token")
      await axios.post("/main/blacklist/", {
        refresh_token: refreshToken,
      })
    } catch {}
  }

  const loggedInVerify = async () => {
    try {
      const response = await axios.post("main/token/verify/")
      if (response && response.data && response.data.success) {
        await setItem("access_token", response.data.access)
        await setItem("refresh_token", response.data.refresh)
        return response
      } else {
        setUser(null)
        return false
      }
    } catch {
      setUser(null)
      return false
    }
  }
  const isLoggedIn = async () => {
    console.log("refreshing token")
    const currentTime = new Date()
    if (
      !lastVerifyOn ||
      currentTime.getTime() - lastVerifyOn.getTime() > 240000
    ) {
      setLastVerifyOn(new Date())
      const response = await loggedInVerify()
      return response
    } else {
      console.log("token has been refreshed less than 4 minutes ago")
    }
  }

  useInterval(async () => {
    await isLoggedIn()
  }, 1000 * 60 * 4)

  return {
    user,
    setUser,
    signin,
    signout,
    error,
    // isLoggedIn,
    loggedInVerify,
  }
}