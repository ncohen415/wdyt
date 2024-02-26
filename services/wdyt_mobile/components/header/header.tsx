import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { Colors } from "../../styles"

type Props = {}

const Header = (props: Props) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>WDYT?</Text>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create<any>({
  headerContainer: {
    height: 150,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
})
