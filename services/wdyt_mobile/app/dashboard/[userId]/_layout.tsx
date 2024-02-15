import React from "react"
import { Slot, Tabs, Stack } from "expo-router"
import ProtectedRoute from "../../../components/routes/ProtectedRoute"

type Props = {}

const _layout = (props: Props) => {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  )
}

export default _layout
