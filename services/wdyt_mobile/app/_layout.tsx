import React from "react"
import { Redirect } from "expo-router"
import { Platform } from "react-native"
import { Text } from "react-native"
import { Slot } from "expo-router"
import { ProvideAuth } from "../hooks/auth/useAuth"

const AppLayout = () => {
  return (
    <ProvideAuth>
      <Slot />
    </ProvideAuth>
  )
}

export default AppLayout
