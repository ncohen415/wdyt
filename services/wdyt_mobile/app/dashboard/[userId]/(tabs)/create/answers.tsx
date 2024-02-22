import React, { useState } from "react"
import { Text, View, SafeAreaView, Pressable, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useRouter, usePathname, useLocalSearchParams } from "expo-router"
import { Containers, Buttons, Inputs, Colors } from "../../../../../styles"
import { useAuth } from "../../../../../hooks/auth/useAuth"
type Props = {}

const Answers = (props: Props) => {
  const router = useRouter()
  const { user } = useAuth()
  const { question, context } = useLocalSearchParams()
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <Text>answers</Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              router.replace({
                pathname: `dashboard/${user?.id}/create/answers`,
                params: {
                  question: question,
                  context: context,
                },
              })
            }
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Answers

const styles = StyleSheet.create<any>({
  mainContainer: {
    ...Containers.mainContainer,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingRight: "4%",
    paddingLeft: "4%",
  },
  input: Inputs.base,
  innerWrapper: {
    flex: 1,
    justifyContent: "space-between",
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
  heading: {
    fontSize: 40,
    fontWeight: "bold",
  },
})
