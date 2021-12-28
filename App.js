import React, { useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Main from './src/Main'
import Zocial from "react-native-vector-icons/Zocial"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeBaseProvider } from 'native-base';
const App = () => {

  useEffect(() => {
    Zocial.loadFont()
    FontAwesome.loadFont()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <NativeBaseProvider>
        <Main />
      </NativeBaseProvider>
    </SafeAreaView>
  )
}

export default App
