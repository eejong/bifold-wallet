import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'

import { ButtonType } from '../components/buttons/Button-api'
import InfoTextBox from '../components/texts/InfoTextBox'
import { TOKENS, useServices } from '../container-api'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import { OnboardingStackParams, Screens } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'
import { ThemedText } from '../components/texts/ThemedText'

export const TermsVersion = '1'


interface TermsProps {
  visible: boolean
  onAgree: () => void
  onClose: () => void
}

const Terms: React.FC<TermsProps> = ({visible, onAgree, onClose}) => {
  const [store, dispatch] = useStore()
  const agreedToPreviousTerms = store.onboarding.didAgreeToTerms
  const [checked, setChecked] = useState(agreedToPreviousTerms)
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams>>()
  const { OnboardingTheme, TextTheme } = useTheme()
  const [Button] = useServices([TOKENS.COMP_BUTTON])

  const onSubmitPressed = useCallback(() => {
    dispatch({
      type: DispatchAction.DID_AGREE_TO_TERMS,
      payload: [{ DidAgreeToTerms: TermsVersion }],
    })
  }, [dispatch])

  const style = StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      padding: 20,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    controlsContainer: {
      marginTop: 'auto',
      marginBottom: 20,
    },
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer:{
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      alignItems: 'center',
      maxHeight: '90%',
      shadowColor: '#00000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
    }
  })

  const onBackPressed = () => {
    //TODO:(jl) goBack() does not unwind the navigation stack but rather goes
    //back to the splash screen. Needs fixing before the following code will
    //work as expected.

    // if (nav.canGoBack()) {
    //   nav.goBack()
    // }

    navigation.navigate(Screens.Onboarding)
  }
    return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={style.modalWrapper}>
        <View style={style.modalContainer}>
          <ScrollView>
            <InfoTextBox>
              {t('Terms.Description') ||
                'Please agree to the terms and conditions below before using this application.'}
            </InfoTextBox>
            <ThemedText style={{ marginTop: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. {/* Add more terms if needed */}
            </ThemedText>
          </ScrollView>

          <View style={{ marginTop: 20 }}>
            <Button
              title={t('Global.Accept')}
              onPress={onAgree}
              testID={testIdWithKey('Accept')}
              buttonType={ButtonType.Primary}
            />
            <Button
              title={t('Global.Back')}
              onPress={onClose}
              testID={testIdWithKey('Back')}
              buttonType={ButtonType.Secondary}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Terms
