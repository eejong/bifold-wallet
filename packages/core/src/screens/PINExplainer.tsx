import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button, { ButtonType } from '../components/buttons/Button'
//import BulletPoint from '../components/inputs/BulletPoint'
import { useTheme } from '../contexts/theme'
import { testIdWithKey } from '../utils/testable'
import { Screens } from '../types/navigators'
import { useNavigation } from '../../__mocks__/@react-navigation/core'
//import { ThemedText } from '../components/texts/ThemedText'

export interface PINExplainerProps {
  onCreateWallet?: () => void
  onAlreadyHaveWallet?: () => void
  continueCreatePIN?: () => void
}
const PINExplainer: React.FC<PINExplainerProps>= ({ onCreateWallet, onAlreadyHaveWallet, continueCreatePIN }) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { ColorPalette, Assets } = useTheme()

  const handleCreate = onCreateWallet ?? 
    (() => {
      navigation.navigate(Screens.CreatePIN, { flow: 'create' }) 
      continueCreatePIN?.()
    })

    const handleImport = onCreateWallet ?? 
    (() => {
      navigation.navigate(Screens.CreatePIN, { flow: 'import' }) 
      continueCreatePIN?.()
    })


  const style = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: ColorPalette.brand.primaryBackground,
      justifyContent: 'center',
      margin: 20,
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
    },

  })

  const imageDisplayOptions = {
    fill: ColorPalette.notification.infoText,
    height: 150,
    width: 250,
  }

  return (
    <SafeAreaView style={style.safeAreaView} edges={['bottom', 'left', 'right']}>   
        <View style={style.imageContainer}>
          <Assets.svg.sierra {...imageDisplayOptions} />
        </View>
        <View>
          <View style={style.button}>
            <Button
              title={t('PINCreate.Explainer.CreateWallet')}
              accessibilityLabel={t('PINCreate.Explainer.CreateWallet')}
              testID={testIdWithKey('ContinueCreatePIN')}
              onPress={handleCreate}
              buttonType={ButtonType.Primary}
            />  
          </View>
          <View style={style.button}>
            <Button
              title={t('PINCreate.Explainer.ImportWallet')}
              accessibilityLabel={t('PINCreate.Explainer.ImportWallet')}
              testID={testIdWithKey('ContinueCreatePIN')}
              onPress={handleImport}
              buttonType={ButtonType.Secondary}
            />  
          </View>
        </View>   
    </SafeAreaView>
  )
}

export default PINExplainer
