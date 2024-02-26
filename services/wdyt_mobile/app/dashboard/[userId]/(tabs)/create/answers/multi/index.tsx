import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, View, Pressable, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Picker } from "@react-native-picker/picker"
import {
  Containers,
  Inputs,
  Buttons,
  Colors,
} from "../../../../../../../styles"
import useAxios from "../../../../../../../hooks/useAxios"
import { useAuth } from "../../../../../../../hooks/auth/useAuth"
import { useLocalSearchParams, useRouter, usePathname } from "expo-router"

type Props = {}

const MultipleChoice = (props: Props) => {
  const { user } = useAuth()
  const axios = useAxios()
  const pathname = usePathname()
  const { param_question_id } = useLocalSearchParams()
  const router = useRouter()
  const [numberSelection, setNumberSelection] = useState<number | null>(null)

  useEffect(() => {
    const getQuestion = async () => {
      if (param_question_id !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: param_question_id,
          },
        })
        if (res.data) {
          if (res.data[0].multiple_choice_number_of_options === null) {
            setNumberSelection(2)
          } else {
            setNumberSelection(res.data[0].multiple_choice_number_of_options)
          }
        }
      }
    }
    getQuestion()
  }, [pathname])

  const goNext = async () => {
    if (param_question_id !== undefined) {
      const res = await axios.patch(`/main/questions/${param_question_id}/`, {
        question_id: param_question_id,
        asker: user?.id,
        multiple_choice_number_of_options: numberSelection,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/answers/multi/options`,
          params: {
            question_id: param_question_id,
            number_selection: numberSelection,
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
      const res = await axios.patch(`/main/questions/${param_question_id}/`, {
        asker: user?.id,
        question_id: param_question_id,
        multiple_choice_number_of_options: numberSelection,
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
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Select your number of choices.</Text>
            <Text style={styles.subHeading}>Minimum of 2. Maximum of 4.</Text>
          </View>
          <View style={{ width: "100%", height: 200 }}>
            {numberSelection !== null && (
              <Picker
                selectedValue={numberSelection}
                onValueChange={(value: number) => setNumberSelection(value)}
              >
                <Picker.Item label={"2"} value={2} />
                <Picker.Item label={"3"} value={3} />
                <Picker.Item label={"4"} value={4} />
              </Picker>
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              disabled={numberSelection === null}
              style={
                numberSelection === null
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => discard()}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </Pressable>
            <Pressable
              disabled={numberSelection === null}
              style={
                numberSelection === null
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => addToDrafts()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              disabled={numberSelection === null}
              style={
                numberSelection === null
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

export default MultipleChoice

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
