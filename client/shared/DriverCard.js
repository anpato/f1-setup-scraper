import React from 'react'

export const DriverCard = () => (
  <View key={result.Driver.code} style={styles.driverCard}>
    <View style={styles.cardHeader}>
      <Text
        style={styles.primaryText}
      >{`${result.Driver.givenName} ${result.Driver.familyName} ${result.number}`}</Text>
      <Text style={styles.primaryText}>P{result.position}</Text>
    </View>
    <View style={styles.qualiSection}>
      <View style={styles.qualiList}>
        <Text style={styles.qualiInfo}>Q1</Text>
        <Text>{result.Q1 || 'No Time'}</Text>
      </View>
      <View style={styles.qualiList}>
        <Text style={styles.qualiInfo}>Q2</Text>
        <Text>{result.Q2 || 'No Time'}</Text>
      </View>
      <View style={styles.qualiList}>
        <Text style={styles.qualiInfo}>Q3</Text>
        <Text>{result.Q3 || 'No Time'}</Text>
      </View>
    </View>
  </View>
)
