import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, Pressable, View, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useGlobalSearchParams, useRouter, useNavigation } from "expo-router"
import { Containers, Inputs, Colors, Buttons } from "../../../../../../styles"
import useAxios from "../../../../../../hooks/useAxios"
import { useAuth } from "../../../../../../hooks/auth/useAuth"
import { Question, MultipleChoiceOption } from "../../../../../../types/types"
import { useLocalStorage } from "../../../../../../hooks/auth/useLocalStorage"
type Props = {}

const Summary = (props: Props) => {
  const { questionId } = useGlobalSearchParams()
  const [question, setQuestion] = useState<Question>()
  const { user } = useAuth()
  const axios = useAxios()
  const router = useRouter()
  const navigation = useNavigation()

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get(`/main/questions/`, {
        params: {
          question_id: questionId,
        },
      })
      if (res?.data && res?.data[0]?.multiple_choice_options) {
        setQuestion(res?.data[0])
      }
    }
    if (questionId) {
      getQuestion()
    }
  }, [])

  const confirmQuestion = async () => {
    const res = await axios.patch(`/main/questions/${questionId}/`, {
      question_id: questionId,
      confirmed: true,
      asker: user?.id,
    })
    if (res.status === 201) {
      router.push(`dashboard/${user?.slug}/create/${questionId}/success`)
    }
    if (res.status === 401) {
      console.log(res.data.error)
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View>
            {question !== undefined && (
              <View>
                <Text style={styles.heading}>{question?.title}</Text>
                <View style={styles.questionInfoWrapper}>
                  <Text>Response Type: </Text>
                  <Text>{question?.response_type}</Text>
                </View>
                <View style={styles.questionInfoWrapper}>
                  <Text>Allow Explanation: </Text>
                  <Text>{question?.allow_explanation ? "Yes" : "No"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: Colors.jet,
                      opacity: 0.6,
                      marginBottom: 15,
                    }}
                  />
                </View>
                <Text style={styles.context}>{question?.context}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: Colors.jet,
                      opacity: 0.6,
                      marginBottom: 15,
                    }}
                  />
                </View>
                <View>
                  {question?.response_type === "Multiple Choice" && (
                    <>
                      {question.multiple_choice_options !== undefined &&
                        question?.multiple_choice_options?.map(
                          (option, index) => {
                            return (
                              <View key={option.id} style={styles.input}>
                                <Text>{option.option}</Text>
                              </View>
                            )
                          }
                        )}
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
          <Pressable
            style={styles.button}
            disabled={false}
            onPress={() => confirmQuestion()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Summary

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
  innerWrapper: {
    flex: 1,
    justifyContent: "space-between",
    // paddingTop: 15,
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
  headingContainer: {},
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15,
  },
  context: {
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 17,
  },
  input: {
    ...Inputs.base,
    ...Inputs.spacing,
  },
  questionInfoWrapper: {
    flexDirection: "row",
    marginBottom: 15,
  },
})
