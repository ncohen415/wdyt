import React, { useState } from "react"
import AuthFormLayout from "../../components/layouts/AuthFormLayout"
import { TextInput, StyleSheet } from "react-native"
import { Inputs } from "../../styles"

type Props = {}

const signup = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const register = async () => {
    console.log("hey")
  }
  return (
    <AuthFormLayout
      buttonText="Sign Up"
      buttonOnClick={register}
      bottomText="Already have an account?"
      bottomAction="Log in"
      bottomHref="/login"
    >
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        value={password}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword2(text)}
        placeholder="Confirm Password"
        value={password2}
      />
    </AuthFormLayout>
  )
}

export default signup

const styles = StyleSheet.create<any>({
  input: Inputs.base,
})
