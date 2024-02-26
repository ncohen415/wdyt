import React from "react"
import { Text, SafeAreaView, View, Pressable, StyleSheet } from "react-native"
import { Containers, Buttons, Inputs, Colors } from "../../../../../styles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
type Props = {}

const Success = (props: Props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Success!</Text>
          </View>
          <Pressable style={styles.button} disabled={false} onPress={() => {}}>
            <Text style={styles.buttonText}>Go Home</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Success

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
