import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Pressable,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { usePathname } from "expo-router"
import { Containers, Colors, Buttons } from "../../styles"
import { Link } from "expo-router"

type Props = {
  children: React.ReactNode
  buttonText: string
  buttonOnClick: () => void
  bottomText: string
  bottomAction: string
  bottomHref: string
}

const AuthFormLayout = (props: Props) => {
  const pathname = usePathname()

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            {/* IMAGE PLACEHOLDER */}
            {/* <Image /> */}
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 30000,
                backgroundColor: Colors.jet,
              }}
            />
          </View>
          <View style={styles.formContainer}>
            {props.children}
            {pathname === "/login" && (
              <Link href={"/reset-password"} style={styles.forgotPassword}>
                Forgot Password?
              </Link>
            )}
            {props.buttonText ? (
              <Pressable style={styles.button} onPress={props.buttonOnClick}>
                <Text style={styles.buttonText}>{props.buttonText}</Text>
              </Pressable>
            ) : (
              ""
            )}

            {pathname === "/login" ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: Colors.jet }}
                  />
                  <View>
                    <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
                  </View>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: Colors.jet }}
                  />
                </View>

                <Text>Login with Google</Text>
              </>
            ) : (
              ""
            )}
          </View>
        </View>
        <View style={styles.signUpContainer}>
          {/* FORM GOES HERE */}
          <Text>
            {`${props.bottomText} `}
            <Link href={`${props.bottomHref}`}>{props.bottomAction}</Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AuthFormLayout

const styles = StyleSheet.create<any>({
  mainContainer: Containers.mainContainer,
  scrollContainer: {
    ...Containers.scrollContainer,
    justifyContent: "space-between",
  },
  topContainer: {
    marginTop: "30%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  formContainer: {},
  forgotPassword: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.jet,
    ...Buttons.base,
    ...Buttons.full,
    color: Colors.jet,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
  },
  signUpContainer: {
    height: 75,
  },
})
