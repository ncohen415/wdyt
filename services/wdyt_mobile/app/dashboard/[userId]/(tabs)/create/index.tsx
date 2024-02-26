import React, { useState, useEffect } from "react"
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
import useAxios from "../../../../../hooks/useAxios"
import { useLocalStorage } from "../../../../../hooks/auth/useLocalStorage"
type Props = {}

const Create = (props: Props) => {
  const router = useRouter()
  const axios = useAxios()
  const pathname = usePathname()
  const [questionId, setQuestionId] = useState<number | null>(null)
  const [title, setTitle] = useState<string>("")
  const { user } = useAuth()
  const { param_question_id } = useLocalSearchParams()
  const { getItem, removeItem } = useLocalStorage()

  useEffect(() => {
    const getTitle = async () => {
      if (param_question_id !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: param_question_id,
          },
        })
        if (res.data) {
          const data = res.data[0]
          setTitle(data.title)
        }
      }

      // await removeItem("stored_question_id")
    }
    getTitle()
  }, [])

  useEffect(() => {
    const getFutureId = async () => {
      const stored_question_id = await getItem("stored_question_id")
      if (
        stored_question_id !== null &&
        stored_question_id !== undefined &&
        param_question_id === undefined
      ) {
        console.log("running")
        await setQuestionId(parseInt(stored_question_id))
        await removeItem("stored_question_id")
      }
    }
    getFutureId()
  }, [pathname])

  const goNext = async () => {
    if (param_question_id !== undefined) {
      console.log("patch from param passed")
      const res = await axios.patch(`/main/questions/${param_question_id}/`, {
        asker: user?.id,
        question_id: param_question_id,
        title: title,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/context`,
          params: {
            param_question_id: param_question_id,
          },
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
    if (questionId !== null && questionId !== undefined) {
      console.log("patch from storage passed")
      const res = await axios.patch(`/main/questions/${questionId}/`, {
        asker: user?.id,
        question_id: questionId,
        title: title,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/context`,
          params: {
            param_question_id: questionId,
          },
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
    if (
      (questionId === null || questionId === undefined) &&
      param_question_id === undefined
    ) {
      console.log("new question")
      const res = await axios.post("/main/questions/", {
        asker: user?.id,
        title: title,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/context`,
          params: {
            param_question_id: res.data.question_id,
          },
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
  }

  const addToDrafts = async () => {
    if (param_question_id !== undefined) {
      const res = await axios.patch(`/main/questions/${questionId}/`, {
        asker: user?.id,
        question_id: questionId,
        title: title,
      })
      if (res.status === 201) {
        router.replace({
          pathname: `dashboard/${user?.slug}/profile`,
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    } else {
      const res = await axios.post("/main/questions/", {
        asker: user?.id,
        title: title,
      })
      if (res.status === 201) {
        setTitle("")
        router.replace({
          pathname: `dashboard/${user?.slug}/profile`,
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
  }

  const discard = () => {
    // if question id: delete request to delete question > remove id from local storage > reroute home
    // if no question id: reroute home
  }

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
            onChangeText={(text) => setTitle(text)}
            placeholder="Question"
            value={title}
            autoCapitalize="none"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              disabled={title.length < 1}
              style={
                title.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => discard()}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </Pressable>
            <Pressable
              disabled={title.length < 1}
              style={
                title.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => addToDrafts()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              disabled={title.length < 1}
              style={
                title.length < 1
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
  },
})
