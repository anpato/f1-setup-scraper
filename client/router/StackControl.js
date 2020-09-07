import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeView from '../views/HomeView'
import ResultView from '../views/ResultView'

const Stack = createStackNavigator()
export const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" mode="modal">
    <Stack.Screen
      name="Home"
      component={HomeView}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Results"
      component={ResultView}
      options={{ title: 'Race Results' }}
    />
  </Stack.Navigator>
)
