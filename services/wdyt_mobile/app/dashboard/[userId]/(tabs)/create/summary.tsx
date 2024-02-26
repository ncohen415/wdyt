import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, Pressable, View, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router"
import { Containers, Inputs, Colors, Buttons } from "../../../../../styles"
import useAxios from "../../../../../hooks/useAxios"
import { useAuth } from "../../../../../hooks/auth/useAuth"
import { Question } from "../../../../../types/types"
type Props = {}

const Summary = (props: Props) => {
  const { question_id } = useLocalSearchParams()
  const [question, setQuestion] = useState<Question>()
  const { user } = useAuth()
  const axios = useAxios()
  const router = useRouter()
  const navigation = useNavigation()

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get(`/main/questions/`, {
        params: {
          question_id: question_id,
        },
      })
      if (res.data) {
        setQuestion(res.data[0])
      }
    }
    if (question_id) {
      getQuestion()
    }
  }, [question_id])

  const confirmQuestion = async () => {
    const res = await axios.patch(`/main/questions/${question_id}/`, {
      question_id: question_id,
      confirmed: true,
      asker: user?.id,
    })
    if (res.status === 201) {
      router.replace(`dashboard/${user?.slug}/create/success`)
    }
    if (res.status === 401) {
      console.log(res.error)
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Question Summary:</Text>
          </View>
          {question && (
            <>
              <Text>{question?.title}</Text>
              <Text>{question?.context}</Text>
            </>
          )}
          <Pressable
            style={styles.button}
            disabled={false}
            onPress={() => confirmQuestion()}
          >
            <Text style={styles.buttonText}>Finish</Text>
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
  headingContainer: {},
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 17,
  },
})
