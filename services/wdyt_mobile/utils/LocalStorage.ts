import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const webPlatform = () => {
  return Platform.OS === "web"
}

async function setLocalData(key: string, value: string) {
  try {
    if (webPlatform()) {
      localStorage.setItem(key, value)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  } catch (error) {}
}

async function getLocalData(key: string) {
  try {
    let data = null
    if (webPlatform()) {
      data = localStorage.getItem(key)
    } else {
      data = await SecureStore.getItemAsync(key)
    }
    if (data !== null) {
      return data
    } else {
      return
    }
  } catch (error) {
    return
  }
}

async function removeLocalData(key: string) {
  try {
    if (webPlatform()) {
      localStorage.removeItem(key)
    } else {
      await SecureStore.deleteItemAsync(key)
    }
    //   await AsyncStorage.removeItem(key);
  } catch (error) {}
}

export { setLocalData, getLocalData, removeLocalData }
