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
} from "../../../../../../../styles"
import { useLocalSearchParams, useRouter } from "expo-router"
import useAxios from "../../../../../../../hooks/useAxios"
import { useAuth } from "../../../../../../../hooks/auth/useAuth"

type Props = {}

const MultipleChoiceOptions = (props: Props) => {
  const { question_id, number_selection } = useLocalSearchParams()
  const [options, setOptions] = useState<string[]>()
  const axios = useAxios()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const initializeInputs = () => {
      let initialOptions = []
      let number
      if (number_selection) {
        number = parseInt(number_selection?.toString())
      }
      if (number !== undefined) {
        for (let i = 0; i < number; i++) {
          initialOptions.push("")
        }
      }
      setOptions(initialOptions)
    }
    if (number_selection) {
      initializeInputs()
    }
  }, [number_selection])

  const updateOption = (option: string, index: number) => {
    if (options !== undefined) {
      let oldOptions = [...options]
      oldOptions[index] = option
      setOptions(oldOptions)
    }
  }

  const submitOptions = async () => {
    const res = await axios.post(`/main/multiple-choice-options/`, {
      question_id: question_id,
      options: options,
    })
    if (res.status === 201) {
      router.replace({
        pathname: `dashboard/${user?.slug}/create/summary`,
        params: {
          question_id: question_id,
        },
      })
    }
    if (res.status === 400) {
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
            <Text style={styles.heading}>Set your choices.</Text>
            <Text style={styles.subHeading}>Keep your choices short.</Text>
          </View>
          <View>
            {options?.map((option, index) => {
              return (
                <View key={index}>
                  <Text>{`Option ${index + 1}:`}</Text>
                  <TextInput
                    key={index}
                    style={{ ...styles.input, ...Inputs.spacing }}
                    onChangeText={(text) => updateOption(text, index)}
                    placeholder="Option"
                    autoCapitalize="none"
                  />
                </View>
              )
            })}
          </View>
          <Pressable
            style={styles.button}
            disabled={false}
            onPress={() => submitOptions()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
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
