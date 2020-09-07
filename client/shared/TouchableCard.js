import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export const TouchableCard = ({ children, styles, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles}>{children}</View>
    </TouchableOpacity>
  )
}
