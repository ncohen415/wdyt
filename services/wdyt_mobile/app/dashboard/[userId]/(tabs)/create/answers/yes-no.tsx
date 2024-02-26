import React from "react"
import { Text, SafeAreaView, View, Pressable, StyleSheet } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Picker } from "@react-native-picker/picker"

type Props = {}

const YesNo = (props: Props) => {
  return (
    <SafeAreaView>
      <Text>Yes/No</Text>
    </SafeAreaView>
    //   <SafeAreaView style={styles.mainContainer}>
    //   <KeyboardAwareScrollView
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={styles.scrollContainer}
    //   >
    //     <View style={styles.innerWrapper}>
    //       <Text style={styles.heading}>How do you want your answer?</Text>
    //       <View style={{ width: "100%", height: 200 }}>
    //         <Picker
    //           selectedValue={selectedResponseType}
    //           onValueChange={(responseType: string, index: number) =>
    //             setSelectedResponseType(responseType)
    //           }
    //         >
    //           {question?.response_types?.map(
    //             (responseType: string, index: number) => {
    //               return (
    //                 <Picker.Item
    //                   key={index}
    //                   label={responseType}
    //                   value={responseType}
    //                 />
    //               )
    //             }
    //           )}
    //         </Picker>
    //         {/* ADD CHECKBOX TO ALLOW EXPLANATIONS OR NOT */}
    //       </View>
    //       <Pressable
    //         style={styles.button}
    //         disabled={selectedResponseType.length < 1}
    //         onPress={() => addAnswerType()}
    //       >
    //         <Text style={styles.buttonText}>Next</Text>
    //       </Pressable>
    //     </View>
    //   </KeyboardAwareScrollView>
    // </SafeAreaView>
  )
}

export default YesNo

// const styles = StyleSheet.create<any>({
//   mainContainer: {
//     ...Containers.mainContainer,
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingRight: "4%",
//     paddingLeft: "4%",
//   },
//   input: Inputs.base,
//   innerWrapper: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   button: {
//     backgroundColor: Colors.jet,
//     ...Buttons.base,
//     ...Buttons.full,
//     color: Colors.jet,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "white",
//   },
//   heading: {
//     fontSize: 40,
//     fontWeight: "bold",
//   },
// })
