import React from "react"
import { Stack } from "expo-router"
import { Text } from "react-native"

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
    </Stack>
  )
}

export default _layout
