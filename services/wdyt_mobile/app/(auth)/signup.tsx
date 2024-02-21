import React, { useState } from "react"
import AuthFormLayout from "../../components/layouts/AuthFormLayout"
import { TextInput, StyleSheet } from "react-native"
import { Inputs } from "../../styles"
import { phone as phoneValidator } from "phone"
import { validate } from "react-email-validator"
import useAxios from "../../hooks/useAxios"
import { useRouter } from "expo-router"

type Props = {}

const signup = (props: Props) => {
  const axios = useAxios()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")

  const requiredPhoneNumberValidator = (input: string) => {
    let valid = true
    if (!phoneValidator(input).isValid) {
      valid = false
    }
    return valid
  }
  const requiredEmailValidator = (input: string) => {
    let valid = true
    if (input.length < 1) {
      valid = false
    }
    if (!validate(input)) {
      valid = false
    }
    return valid
  }

  const register = async () => {
    if (
      requiredPhoneNumberValidator(phone) &&
      requiredEmailValidator(email) &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password === password2
    ) {
      let res = await axios.post(`/main/custom-users/`, {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password,
      })
      if (res.status === 201) {
        router.replace("/login")
      }
      if (res.status === 200) {
        console.log(res.data.error)
      }
    }
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
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        value={firstName}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setLastName(text)}
        placeholder="Last Name"
        value={lastName}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPhone(text)}
        placeholder="Phone Number"
        value={phone}
        keyboardType="numeric"
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TextInput
        style={{ ...styles.input, ...Inputs.spacing }}
        onChangeText={(text) => setPassword2(text)}
        placeholder="Confirm Password"
        value={password2}
        autoCapitalize="none"
        secureTextEntry={true}
      />
    </AuthFormLayout>
  )
}

export default signup

const styles = StyleSheet.create<any>({
  input: Inputs.base,
})
