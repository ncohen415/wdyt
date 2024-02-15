import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import { Containers } from "../../styles"

type Props = {}

const Dashboard = (props: Props) => {
  return <SafeAreaView style={styles.mainContainer}>hiii</SafeAreaView>
}

export default Dashboard

const styles = StyleSheet.create<any>({
  mainContainer: Containers.mainContainer,
})
