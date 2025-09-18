import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../contexts/theme'

interface HeaderProps {
  step?: number // from 1 to 4
  onBackPress?: () => void
}

const StepHeader: React.FC<HeaderProps> = ({ step = 1, onBackPress }) => {
  const {  Assets } = useTheme()
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Assets.svg.arrow/>
      </TouchableOpacity>
      <View style={styles.dotsContainer}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              step === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#0047AB', // dark blue
  },
  inactiveDot: {
    borderWidth: 1,
    borderColor: '#0047AB',
    backgroundColor: 'transparent',
  },
})

export default StepHeader