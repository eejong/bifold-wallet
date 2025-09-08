import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button, { ButtonType } from '../components/buttons/Button'
import BulletPoint from '../components/inputs/BulletPoint'
import { useTheme } from '../contexts/theme'
import { testIdWithKey } from '../utils/testable'
import { ThemedText } from '../components/texts/ThemedText'


export interface PINExplainerProps {
  continueCreatePIN: () => void
}

const PINExplainer: React.FC<PINExplainerProps> = ({ continueCreatePIN }) => {
  const { t } = useTranslation()
  const { ColorPalette, TextTheme, Assets } = useTheme()

  const style = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
    },
    scrollViewContentContainer: {
      padding: 20,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button:{
      paddingVertical: 10,
      marginHorizontal: 20,
    }
  })

  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 300,
    width: 300,
  }

  return (
    <SafeAreaView style={style.safeAreaView} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
        <View style={style.imageContainer}>
          <Assets.svg.sierra {...imageDisplayOptions} />
        </View>
        <View>
          <View style={style.button}>
            <Button
              title={t('PINCreate.Explainer.CreateWallet')}
              accessibilityLabel={t('PINCreate.Explainer.CreateWallet')}
              testID={testIdWithKey('ContinueCreatePIN')}
              onPress={continueCreatePIN}
              buttonType={ButtonType.Primary}
            />  
          </View>
          <View style={style.button}>
            <Button
              title={t('PINCreate.Explainer.ImportWallet')}
              accessibilityLabel={t('PINCreate.Explainer.ImportWallet')}
              testID={testIdWithKey('ContinueCreatePIN')}
              onPress={continueCreatePIN}
              buttonType={ButtonType.Secondary}
            />  
          </View>
        </View>
        
      </ScrollView>      
    </SafeAreaView>
  )
}

export default PINExplainer
