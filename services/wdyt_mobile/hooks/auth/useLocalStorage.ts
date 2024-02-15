import { useState } from "react"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

export const useLocalStorage = () => {
  // This hook will allow us to easily store and retrieve data from localStorage. It's a very simple hook, but it's a good idea to keep it in a separate file so we can reuse it in other parts of our application.
  const [value, setValue] = useState<string | null | undefined>(null)

  const setItem = async (key: string, value: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value)
    }
    if (Platform.OS === "ios") {
      await SecureStore.setItemAsync(key, value)
    }
  }

  const getItem = async (key: string) => {
    let value
    try {
      if (Platform.OS === "web") {
        value = localStorage.getItem(key)
      }
      if (Platform.OS === "ios") {
        value = SecureStore.getItem(key)
      }
    } catch (error) {
      console.log(error)
    }

    return value
  }

  const removeItem = async (key: string) => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key)
    }
    if (Platform.OS === "ios") {
      await SecureStore.deleteItemAsync(key)
    }
  }

  return { setItem, getItem, removeItem }
}
