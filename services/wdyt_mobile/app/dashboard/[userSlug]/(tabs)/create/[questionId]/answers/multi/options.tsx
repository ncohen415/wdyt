import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Picker } from "@react-native-picker/picker"
import {
  Containers,
  Inputs,
  Colors,
  Buttons,
} from "../../../../../../../../styles"
import { useGlobalSearchParams, useRouter } from "expo-router"
import useAxios from "../../../../../../../../hooks/useAxios"
import { useAuth } from "../../../../../../../../hooks/auth/useAuth"
import { useLocalStorage } from "../../../../../../../../hooks/auth/useLocalStorage"
import { MultipleChoiceOption } from "../../../../../../../../types/types"
import { useIsFocused } from "@react-navigation/native"

type Props = {}

const MultipleChoiceOptions = (props: Props) => {
  const { questionId } = useGlobalSearchParams()
  const [options, setOptions] = useState<Array<MultipleChoiceOption | string>>()
  const axios = useAxios()
  const { user } = useAuth()
  const router = useRouter()
  const focused = useIsFocused()
  const { getItem } = useLocalStorage()

  useEffect(() => {
    const initializeInputs = async (data: any) => {
      let initialOptions = data.multiple_choice_options
      let number = data.multiple_choice_number_of_options

      if (initialOptions.length < 2 && number !== undefined) {
        for (let i = 0; i < number; i++) {
          initialOptions.push("")
        }
      }
      if (initialOptions.length >= 2 && initialOptions.length < number) {
        for (
          let i = 0;
          i < parseInt(number) - parseInt(initialOptions.length);
          i++
        ) {
          initialOptions.push("")
        }
      }
      setOptions(initialOptions)
    }

    const getQuestion = async () => {
      if (questionId !== undefined) {
        const res = await axios.get(`/main/questions/`, {
          params: {
            question_id: questionId,
          },
        })
        if (res.data) {
          const data = res.data[0]
          console.log(data.multiple_choice_options.length)
          if (data.multiple_choice_options.length > 0) {
            setOptions(res.data[0]?.multiple_choice_options)
          } else {
            initializeInputs(data)
          }
        }
      }
    }
    getQuestion()
  }, [focused])

  console.log("options", options)
  console.log("focused", focused)

  const updateOption = (
    text: string,
    index: number,
    option?: MultipleChoiceOption
  ) => {
    if (options !== undefined) {
      if (option === undefined) {
        let oldOptions = [...options]
        oldOptions[index] = text
        setOptions(oldOptions)
      } else {
        let oldOptions = [...options]
        let optionToUpdate = oldOptions.find(
          (oldOption) =>
            (oldOption as MultipleChoiceOption).id ===
            (option as MultipleChoiceOption).id
        )
        if (optionToUpdate !== undefined) {
          ;(optionToUpdate as MultipleChoiceOption).option = text
        }
        setOptions(oldOptions)
      }
    }
  }

  const goNext = async () => {
    if (options?.every((option) => typeof option === "string")) {
      const res = await axios.post(`/main/multiple-choice-options/`, {
        question_id: questionId,
        options: options,
      })
      if (res.status === 201) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/${questionId}/summary`,
        })
      }
      if (res.status === 400) {
        console.log(res.data.error)
      }
    } else {
      const res = await axios.post(
        `/main/multiple-choice-options/update_existing_multiple_choice_options/`,
        {
          question_id: questionId,
          options: options,
        }
      )
      if (res.status === 200) {
        router.push({
          pathname: `dashboard/${user?.slug}/create/${questionId}/summary`,
        })
      }
      if (res.status === 400) {
        console.log(res.data.error)
      }
    }
  }

  const addToDrafts = async () => {
    if (questionId !== undefined) {
      const res = await axios.post(`/main/multiple-choice-options/`, {
        question_id: questionId,
        options: options,
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
    console.log("discard")
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Set your choices.</Text>
            <Text style={styles.subHeading}>Keep your choices short.</Text>
          </View>
          <View>
            {options?.map((option, index) => {
              return (
                <View key={index}>
                  <Text>{`Option ${index + 1}:`}</Text>
                  <TextInput
                    value={
                      (option as MultipleChoiceOption).option
                        ? (option as MultipleChoiceOption).option
                        : options[index]
                    }
                    style={{ ...styles.input, ...Inputs.spacing }}
                    onChangeText={(text) =>
                      typeof option === "string"
                        ? updateOption(text, index, undefined)
                        : updateOption(text, index, option)
                    }
                    placeholder="Option"
                    autoCapitalize="none"
                  />
                </View>
              )
            })}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              disabled={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
              }
              style={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => discard()}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </Pressable>
            <Pressable
              disabled={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
              }
              style={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
                  ? { ...styles.button, ...styles.disabled }
                  : styles.button
              }
              onPress={() => addToDrafts()}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              disabled={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
              }
              style={
                !options?.every((option) =>
                  typeof option === "string"
                    ? option.length >= 1
                    : (option as MultipleChoiceOption).option.length >= 1
                )
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

export default MultipleChoiceOptions

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
  buttonText: {
    color: "white",
  },
  disabled: {
    opacity: 0.6,
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
