import React, { useState } from "react"
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useRouter, usePathname, useLocalSearchParams } from "expo-router"
import { Containers, Buttons, Inputs, Colors } from "../../../../../styles"
import { useAuth } from "../../../../../hooks/auth/useAuth"
type Props = {}

const Context = (props: Props) => {
  const [context, setContext] = useState<string>("")
  const router = useRouter()
  const { question } = useLocalSearchParams()
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
            editable
            multiline
            numberOfLines={4}
            onChangeText={(text) => setContext(text)}
            placeholder="Give us some context"
            value={context}
            style={{ padding: 10 }}
          />
          <Pressable
            style={styles.button}
            onPress={() =>
              router.replace({
                pathname: `dashboard/${user?.id}/create/answers`,
                params: {
                  question: question,
                  context: encodeURIComponent(context),
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

export default Context

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
