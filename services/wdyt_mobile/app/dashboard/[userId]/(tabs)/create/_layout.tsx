import React from "react"
import { Stack } from "expo-router"
import { Text } from "react-native"
import Header from "../../../../../components/header/header"

type Props = {}

export const unstable_settings = {
  initialRouteName: "dashboard/[userId]/create/indexrou",
}

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
      <Stack.Screen
        name="context"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="answers/index"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="answers/yes-no"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="answers/multi/index"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="answers/multi/options"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />

      <Stack.Screen
        name="answers/words"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="summary"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerLeft: () => (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>WDYT?</Text>
          ),
          contentStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Stack.Screen
        name="success"
        options={{
          headerTitle: "",
          headerBackVisible: true,
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
