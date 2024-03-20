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
type Props = {}

const Profile = (props: Props) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [draftOrConfirmed, setDraftOrConfirmed] = useState<string>("Drafts")
  const axios = useAxios()
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

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.innerWrapper}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.email}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable onPress={() => setDraftOrConfirmed("Questions")}>
                <Text>Your Questions</Text>
              </Pressable>
              <Pressable onPress={() => setDraftOrConfirmed("Drafts")}>
                <Text>Your Drafts</Text>
              </Pressable>
            </View>
            <View style={styles.questionsWrapper}>
              {draftOrConfirmed === "Drafts" &&
                questions
                  ?.filter((quesiton) => quesiton.confirmed === false)
                  .map((question) => {
                    return (
                      <Pressable>
                        <Text>{question?.title}</Text>
                      </Pressable>
                    )
                  })}
              {draftOrConfirmed === "Questions" &&
                questions
                  ?.filter((quesiton) => quesiton.confirmed === true)
                  .map((question) => {
                    return (
                      <Pressable>
                        <Text>{question?.title}</Text>
                      </Pressable>
                    )
                  })}
            </View>
            <View style={styles.questionsWrapper}>
              {questions
                ?.filter((quesiton) => quesiton.confirmed === true)
                .map((question) => {
                  return (
                    <Pressable>
                      <Text>{question?.title}</Text>
                    </Pressable>
                  )
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
    // justifyContent: "space-between",
  },
  userInfo: {},
  questionsWrapper: {},
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
