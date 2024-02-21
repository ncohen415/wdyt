import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Pressable,
  ScrollView,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { usePathname } from "expo-router"
import { Containers, Colors, Buttons } from "../../styles"
import { Link } from "expo-router"
import { Dimensions } from "react-native"

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
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View style={{ ...styles.topContainer }}>
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
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: Colors.jet,
                      }}
                    />
                    <View>
                      <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: Colors.jet,
                      }}
                    />
                  </View>

                  <Text>Login with Google</Text>
                </View>
              ) : (
                <View style={{ marginBottom: 20 }} />
              )}
            </View>
          </View>
          <View style={styles.signUpContainer}>
            <Text>
              {`${props.bottomText} `}
              <Link href={`${props.bottomHref}`}>{props.bottomAction}</Link>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AuthFormLayout

const styles = StyleSheet.create<any>({
  mainContainer: { ...Containers.mainContainer, flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: "4%",
    paddingLeft: "4%",
  },
  innerWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  topContainer: {
    flex: 0.8,
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
    justifyContent: "flex-end",
    flex: 0.2,
  },
})
