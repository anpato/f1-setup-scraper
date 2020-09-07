import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Setups from '../views/Setups'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { HomeStack } from './StackControl'

const Tabs = createBottomTabNavigator()

export default TabControl = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName
        switch (route.name) {
          case 'Home_Stack':
            iconName = Platform.OS === 'ios' || 'web' ? 'ios-home' : 'md-home'
            break
          case 'Setups':
            iconName =
              Platform.OS === 'ios' || 'web' ? 'ios-settings' : 'md-settings'
            break
          default:
            break
        }
        return <Ionicons name={iconName} size={size} color={color} />
      }
    })}
    tabBarOptions={{
      showLabel: false
      // tabStyle: { backgroundColor: '#eeeeee' }
    }}
  >
    <Tabs.Screen name="Home_Stack" component={HomeStack} />
    <Tabs.Screen name="Setups" component={Setups} />
  </Tabs.Navigator>
)
