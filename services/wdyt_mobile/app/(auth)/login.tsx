import React, { useState } from "react"
import { TextInput, StyleSheet } from "react-native"
import AuthFormLayout from "../../components/layouts/AuthFormLayout"
import { Inputs } from "../../styles"
type Props = {}

const login = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = () => {
    console.log("hey")
  }

  return (
    <AuthFormLayout buttonText="Log In" buttonOnClick={login}>
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
    </AuthFormLayout>
  )
}
export default login

const styles = StyleSheet.create<any>({
  input: Inputs.base,
})
