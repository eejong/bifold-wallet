import React, { useState, useEffect } from 'react'
import { Pressable, Animated } from 'react-native'
import { useTheme } from '../../contexts/theme'
import { useTranslation } from 'react-i18next'

interface ToggleButtonProps {
  isEnabled: boolean
  isAvailable: boolean
  toggleAction: () => void
  testID?: string
  disabled?: boolean
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isEnabled,
  isAvailable,
  toggleAction,
  testID,
  disabled = false,
}) => {
  const { ColorPalette } = useTheme()
  const [toggleAnim] = useState(new Animated.Value(isEnabled ? 1 : 0))
  const { t } = useTranslation()

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isEnabled, toggleAnim])

  // Animate thumb position
  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  })

  return (
    <Pressable
      accessible
      testID={testID}
      accessibilityLabel={isEnabled ? t('Biometry.On') : t('Biometry.Off')}
      accessibilityRole="switch"
      accessibilityState={{ checked: isEnabled }}
      onPress={isAvailable && !disabled ? toggleAction : undefined}
      disabled={!isAvailable || disabled}
    >
      <Animated.View
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: isEnabled
            ? ColorPalette.brand.primary
            : ColorPalette.grayscale.lightGrey,
          backgroundColor: '#FFFFFF', // stays white like your screenshot
          padding: 2,
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: isEnabled
              ? ColorPalette.brand.primary
              : ColorPalette.grayscale.lightGrey,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default ToggleButton
