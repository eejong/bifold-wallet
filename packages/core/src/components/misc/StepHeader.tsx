import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useTheme, } from '../../contexts/theme'

interface HeaderProps {
  step?: number // from 1 to 4
  onBackPress?: () => void
}


const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  backButton: {
    marginRight: 20, color: 'red',
    left: 20
  },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#042645', // dark blue
  },
  inactiveDot: {
    borderWidth: 2,
    borderColor: '#042645',
    backgroundColor: 'transparent',
  },
})

  
const StepHeader: React.FC<HeaderProps> = ({ step = 1, onBackPress }) => {
  const {  ColorPalette, Assets } = useTheme()

   const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 30,
    width: 40,
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Assets.svg.arrowBack {...imageDisplayOptions}/>
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

export default StepHeader