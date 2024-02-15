import React from "react"
import { Text, Button } from "react-native"
import { useAuth } from "../../../../../hooks/auth/useAuth"
type Props = {}

const Profile = (props: Props) => {
  const { signout } = useAuth()
  return (
    <>
      <Text>Profile</Text>
      <Button title="Log Out" onPress={() => signout()} />
    </>
  )
}

export default Profile
