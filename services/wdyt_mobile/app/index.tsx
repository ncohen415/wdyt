import React from "react"
import { Text, Platform } from "react-native"
import { Redirect } from "expo-router"

type Props = {}

const index = (props: Props) => {
  if (Platform.OS === "web") {
    return <Text>index</Text>
  } else if (Platform.OS === "ios") {
    return <Redirect href={"/login"} />
  }
}
export default index
