import React, { useState, useEffect } from "react"
import { Text, View, SafeAreaView, Pressable, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useRouter, usePathname, useLocalSearchParams } from "expo-router"
import { Containers, Buttons, Inputs, Colors } from "../../../../../../styles"
import { useAuth } from "../../../../../../hooks/auth/useAuth"
import useAxios from "../../../../../../hooks/useAxios"
import { Picker } from "@react-native-picker/picker"
import { Question } from "../../../../../../types/types"
import { useLocalStorage } from "../../../../../../hooks/auth/useLocalStorage"

type Props = {}

const Answers = (props: Props) => {
  const axios = useAxios()
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const { param_question_id } = useLocalSearchParams()
  const { getItem } = useLocalStorage()
  const [question, setQuestion] = useState<Question>()
  const [questionId, setQuestionId] = useState<number | null>(null)
  const [selectedResponseType, setSelectedResponseType] = useState<string>("")

  useEffect(() => {
    const getQuestion = async () => {
      if (param_question_id !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: param_question_id,
          },
        })
        if (res.data) {
          setQuestion(res.data[0])
          if (res.data[0].response_type === null) {
            setSelectedResponseType(res?.data[0]?.response_types[0])
          } else {
            setSelectedResponseType(res?.data[0]?.response_type)
          }
        }
      }
    }

    getQuestion()
  }, [pathname])

  const goNext = async () => {
    if (param_question_id !== undefined) {
      const res = await axios.patch(`/main/questions/${param_question_id}/`, {
        asker: user?.id,
        question_id: param_question_id,
        response_type: selectedResponseType,
      })
      if (res.status === 201) {
        if (selectedResponseType === "Yes/No") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/answers/yes-no`,
            params: {
              param_question_id: param_question_id,
            },
          })
        } else if (selectedResponseType === "Multiple Choice") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/answers/multi`,
            params: {
              param_question_id: param_question_id,
            },
          })
        } else if (selectedResponseType === "Words Only") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/answers/words`,
            params: {
              param_question_id: param_question_id,
            },
          })
        }
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
  }

  const addToDrafts = async () => {
    if (param_question_id !== undefined) {
      const res = await axios.patch(`/main/questions/${param_question_id}/`, {
        asker: user?.id,
        question_id: param_question_id,
        response_type: selectedResponseType,
      })
      if (res.status === 201) {
        router.replace({
          pathname: `dashboard/${user?.slug}/profile`,
        })
      }
      if (res.status === 401) {
        console.log(res.error)
      }
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <Text style={styles.heading}>How do you want your answer?</Text>
          <View style={{ width: "100%", height: 200 }}>
            <Picker
              selectedValue={selectedResponseType}
              onValueChange={(responseType: string, index: number) =>
                setSelectedResponseType(responseType)
              }
            >
              {question?.response_types?.map(
                (responseType: string, index: number) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={responseType}
                      value={responseType}
                    />
                  )
                }
              )}
            </Picker>
            {/* ADD CHECKBOX TO ALLOW EXPLANATIONS OR NOT */}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              disabled={selectedResponseType.length < 1}
              style={
                selectedResponseType.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => discard()}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </Pressable>
            <Pressable
              disabled={selectedResponseType.length < 1}
              style={
                selectedResponseType.length < 1
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => addToDrafts()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              disabled={selectedResponseType.length < 1}
              style={
                selectedResponseType.length < 1
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
    // ...Buttons.fulrl,
    flex: 0.3,
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
