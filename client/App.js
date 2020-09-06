import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'
import { AppLoading } from './store/atoms'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

export default function App() {
  const [isLoading, toggleLoading] = useRecoilState(AppLoading)
  useEffect(() => {
    async function loadApp() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      }).then(() => toggleLoading(false))
    }
  }, [])
  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
