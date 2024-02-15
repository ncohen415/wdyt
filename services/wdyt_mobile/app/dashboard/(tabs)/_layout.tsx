import React from "react"
import { Link, Tabs, usePathname } from "expo-router"

type Props = {}

const _layout = (props: Props) => {
  return (
    <Tabs>
      <Tabs.Screen name="dispatches" />
      <Tabs.Screen name="inbox" />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  )
}

export default _layout
