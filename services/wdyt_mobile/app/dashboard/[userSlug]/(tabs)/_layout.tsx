import React from "react"
import { Slot, Tabs } from "expo-router"

type Props = {}

const _layout = (props: Props) => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "Create",
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ tabBarLabel: "Notifications" }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  )
}

export default _layout
