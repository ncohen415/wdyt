import React, { useState, useEffect } from "react"
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  useRouter,
  useLocalSearchParams,
  usePathname,
  useNavigation,
  useGlobalSearchParams,
} from "expo-router"
import { Containers, Buttons, Inputs, Colors } from "../../../../../../styles"
import { useAuth } from "../../../../../../hooks/auth/useAuth"
import useAxios from "../../../../../../hooks/useAxios"
import { useLocalStorage } from "../../../../../../hooks/auth/useLocalStorage"
import { setItem } from "expo-secure-store"

type Props = {}

const Context = (props: Props) => {
  const router = useRouter()
  const axios = useAxios()
  const pathname = usePathname()
  const navigation = useNavigation()
  const { questionId } = useGlobalSearchParams()
  const [context, setContext] = useState<string>("")
  const { setItem } = useLocalStorage()
  const { user } = useAuth()

  useEffect(() => {
    const getContext = async () => {
      if (questionId !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: questionId,
          },
        })
        if (res.data) {
          const data = res.data[0]
          if (data.context) {
            setContext(data.context)
          }
        }
      }
    }
    getContext()
  }, [])

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault()
      if (questionId !== undefined) {
        setItem("stored_question_id", questionId?.toString())
      }
      navigation.dispatch(e.data.action)
    })
  }, [])

  const goNext = async () => {
    if (questionId !== undefined) {
      const res = await axios.patch(`/main/questions/${questionId}/`, {
        context: context,
        asker: user?.id,
        question_id: questionId,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/${questionId}/answers`,
        })
      }
      if (res.status === 401) {
        console.log(res.data.error)
      }
    }
  }

  const addToDrafts = async () => {
    if (questionId !== undefined) {
      const res = await axios.patch(`/main/questions/${questionId}/`, {
        asker: user?.id,
        question_id: questionId,
        context: context,
      })
      if (res.status === 201) {
        router.replace({
          pathname: `dashboard/${user?.slug}/profile`,
        })
      }
      if (res.status === 401) {
        console.log(res.data.error)
      }
    }
  }

  const discard = () => {
    // if question id: delete request to delete question > remove id from local storage > reroute home
    // if param question id: delete request to delete question > reroute home
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View>
            <Text style={styles.heading}>Give us some context.</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              onChangeText={(text) => setContext(text)}
              placeholder="Give us some context"
              value={context}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              disabled={context.length < 1}
              style={
                context.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => discard()}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </Pressable>
            <Pressable
              disabled={context.length < 1}
              style={
                context.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => addToDrafts()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              disabled={context.length < 1}
              style={
                context.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => goNext()}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
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
    paddingTop: 15,
  },
  button: {
    backgroundColor: Colors.jet,
    ...Buttons.base,
    // ...Buttons.fulrl,
    flex: 0.3,
    color: Colors.jet,
    marginBottom: 20,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
  },
})
