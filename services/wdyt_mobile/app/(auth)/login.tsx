import React, { useState, useEffect } from "react"
import { TextInput, StyleSheet, Button } from "react-native"
import AuthFormLayout from "../../components/layouts/AuthFormLayout"
import { Inputs } from "../../styles"
import { useAuth } from "../../hooks/auth/useAuth"
import useAxios from "../../hooks/useAxios"
import { useLocalStorage } from "../../hooks/auth/useLocalStorage"
import { Redirect, useRouter } from "expo-router"

type Props = {}

const login = (props: Props) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signin, user, loggedInVerify } = useAuth()
  const { getItem } = useLocalStorage()
  const axios = useAxios()
  const router = useRouter()

  console.log(user)

  useEffect(() => {
    const verify = async () => {
      const res = await loggedInVerify()
      if (res?.data?.success && res?.data?.user) {
        router.replace(`/dashboard/${res.data.user.id}/`)
      }
    }
    verify()
  }, [])

  return (
    <AuthFormLayout
      buttonText="Log In"
      buttonOnClick={() => signin(email, password)}
      bottomText="Don't have an account?"
      bottomAction="Sign Up"
      bottomHref="/signup"
    >
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
      />
    </AuthFormLayout>
  )
}
export default login

const styles = StyleSheet.create<any>({
  input: Inputs.base,
})
