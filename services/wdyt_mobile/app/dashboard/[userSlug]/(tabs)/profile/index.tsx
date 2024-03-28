import React, { useState, useEffect } from "react"
import {
  Text,
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useAuth } from "../../../../../hooks/auth/useAuth"
import { Inputs, Containers, Buttons, Colors } from "../../../../../styles"
import useAxios from "../../../../../hooks/useAxios"
import { Question } from "../../../../../types/types"
import { useRouter } from "expo-router"
import { useLocalStorage } from "../../../../../hooks/auth/useLocalStorage"
type Props = {}

const Profile = (props: Props) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [draftOrConfirmed, setDraftOrConfirmed] = useState<string>("Drafts")
  const axios = useAxios()
  const router = useRouter()
  const { removeItem } = useLocalStorage()
  const { signout, user } = useAuth()

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get(`/main/questions/`, {
        params: {
          asker_id: user?.id,
        },
      })
      if (res.data) {
        setQuestions(res.data)
      }
    }
    getQuestions()
  }, [])

  const goToDraftQuestion = (questionId: number) => {
    router.replace({
      pathname: `dashboard/${user?.slug}/create/`,
      params: {
        local_question_id: questionId,
      },
    })
  }

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.innerWrapper}>
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
                <Text style={styles.heading}>{user?.email}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text>User Score:</Text>
                <Text>{user?.email}</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text>Total Answers:</Text>
                <Text>{user?.email}</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: Colors.jet,
                opacity: 0.5,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 15,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Pressable onPress={() => setDraftOrConfirmed("Questions")}>
                <Text style={styles.heading}>Your Questions</Text>
              </Pressable>
              <Pressable onPress={() => setDraftOrConfirmed("Drafts")}>
                <Text style={styles.heading}>Your Drafts</Text>
              </Pressable>
            </View>
            <View style={styles.questionsWrapper}>
              {draftOrConfirmed === "Drafts" &&
                questions
                  ?.filter((quesiton) => quesiton.confirmed === false)
                  .map((question, index) => {
                    if (index === 0) {
                      return (
                        <View key={question?.id}>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginBottom: 15,
                            }}
                          />
                          <Pressable
                            onPress={() => goToDraftQuestion(question?.id)}
                          >
                            <Text>{question?.title}</Text>
                          </Pressable>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                          />
                        </View>
                      )
                    } else {
                      return (
                        <View key={question?.id}>
                          <Pressable
                            onPress={() => goToDraftQuestion(question?.id)}
                          >
                            <Text>{question?.title}</Text>
                          </Pressable>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                          />
                        </View>
                      )
                    }
                  })}
              {draftOrConfirmed === "Questions" &&
                questions
                  ?.filter((quesiton) => quesiton.confirmed === true)
                  .map((question, index) => {
                    if (index === 0) {
                      return (
                        <View key={question?.id}>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginBottom: 15,
                            }}
                          />
                          <Pressable
                            onPress={() => goToDraftQuestion(question?.id)}
                          >
                            <Text>{question?.title}</Text>
                          </Pressable>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                          />
                        </View>
                      )
                    } else {
                      return (
                        <View key={question?.id}>
                          <Pressable
                            onPress={() => goToDraftQuestion(question?.id)}
                          >
                            <Text>{question?.title}</Text>
                          </Pressable>
                          <View
                            style={{
                              borderBottomColor: Colors.jet,
                              opacity: 0.5,
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                          />
                        </View>
                      )
                    }
                  })}
            </View>
          </View>
        </KeyboardAwareScrollView>

        <Button title="Log out" onPress={() => signout()} />
      </SafeAreaView>
    </>
  )
}

export default Profile

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
    paddingTop: 15,
  },
  userInfoWrapper: {
    marginBottom: 15,
  },

  userInfoItem: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionsWrapper: {},
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
