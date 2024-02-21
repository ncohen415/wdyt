import React, { useState } from "react"
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Containers, Inputs, Colors, Buttons } from "../../../../../styles"
import { useRouter, usePathname, useLocalSearchParams } from "expo-router"
import { useAuth } from "../../../../../hooks/auth/useAuth"

type Props = {}

const Create = (props: Props) => {
  const router = useRouter()
  const [question, setQuestion] = useState<string>("")
  const pathname = usePathname()
  const { user } = useAuth()
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <Text style={styles.heading}>What's on your mind?</Text>
          <TextInput
            style={{ ...styles.input, ...Inputs.spacing }}
            onChangeText={(text) => setQuestion(text)}
            placeholder="Question"
            value={question}
            autoCapitalize="none"
          />
          <Pressable
            style={styles.button}
            onPress={() => router.push(`${pathname}/context`)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Create

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
