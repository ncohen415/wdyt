import React, { useState, useEffect } from "react"
import { Text, View, SafeAreaView, Pressable, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import {
  useRouter,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router"
import {
  Containers,
  Buttons,
  Inputs,
  Colors,
} from "../../../../../../../styles"
import { useAuth } from "../../../../../../../hooks/auth/useAuth"
import useAxios from "../../../../../../../hooks/useAxios"
import { Picker } from "@react-native-picker/picker"
import { Question } from "../../../../../../../types/types"
import Checkbox from "expo-checkbox"

type Props = {}

const Answers = (props: Props) => {
  const axios = useAxios()
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const { questionId } = useGlobalSearchParams()
  const [question, setQuestion] = useState<Question>()
  const [allowExplanation, setAllowExplanation] = useState<boolean>(true)
  const [selectedResponseType, setSelectedResponseType] = useState<string>("")

  useEffect(() => {
    const getQuestion = async () => {
      if (questionId !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: questionId,
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
    if (questionId !== undefined) {
      const res = await axios.patch(`/main/questions/${questionId}/`, {
        asker: user?.id,
        question_id: questionId,
        response_type: selectedResponseType,
        allow_explanation:
          selectedResponseType === "Yes/No" ||
          selectedResponseType === "Multiple Choice"
            ? allowExplanation
            : null,
      })
      if (res.status === 201) {
        if (selectedResponseType === "Yes/No") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/${questionId}/answers/yes-no`,
          })
        } else if (selectedResponseType === "Multiple Choice") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/${questionId}/answers/multi`,
          })
        } else if (selectedResponseType === "Words Only") {
          router.push({
            pathname: `dashboard/${user?.slug}/create/${questionId}/answers/words`,
          })
        }
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
        response_type: selectedResponseType,
        allow_explanation:
          selectedResponseType === "Yes/No" ||
          selectedResponseType === "Multiple Choice"
            ? allowExplanation
            : null,
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

  console.log(
    "check",
    selectedResponseType === "Yes/No" ||
      selectedResponseType === "Multiple Choice"
      ? allowExplanation
      : null
  )

  const discard = async () => {}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <Text style={styles.heading}>How do you want your answer?</Text>
          <View
            style={{
              flex: 0.5,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                width: "100%",
                minHeight: 200,
              }}
            >
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
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                disabled={selectedResponseType === "Words Only"}
                style={{ margin: 8 }}
                value={allowExplanation}
                onValueChange={setAllowExplanation}
                color={allowExplanation ? Colors.jet : undefined}
              />
              <Text>Allow an explanation?</Text>
            </View>
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
    paddingTop: 15,
    // backgroundColor: "green",
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
