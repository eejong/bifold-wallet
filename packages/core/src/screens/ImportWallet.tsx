import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { OnboardingStackParams, Screens } from '../types/navigators'

const ImportWallet: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams, Screens.ImportWallet>>()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Import your wallet here</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate(Screens.CreatePIN, { flow: 'import' })}
      />
    </View>
  )
}

export default ImportWallet
