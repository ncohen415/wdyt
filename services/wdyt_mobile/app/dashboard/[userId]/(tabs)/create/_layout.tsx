import React from "react"
import { Stack } from "expo-router"

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="context/index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="answerOptions/index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
    </Stack>
  )
}

export default _layout
