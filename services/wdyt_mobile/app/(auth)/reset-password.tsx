import React, { useState } from "react"
import AuthFormLayout from "../../components/layouts/AuthFormLayout"
import { TextInput, StyleSheet } from "react-native"
import { Inputs } from "../../styles"
import { useRouter } from "expo-router"

type Props = {}

const signup = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const router = useRouter()
  const reset = async () => {
    console.log("reset password func")
    router.replace("/login")
  }
  return (
    <AuthFormLayout
      buttonText="Reset Password"
      buttonOnClick={reset}
      bottomText="Nevermind."
      bottomAction="Back to Login"
      bottomHref="/login"
    >
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
