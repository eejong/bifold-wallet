import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DeviceEventEmitter, Keyboard, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../contexts/auth'
import { useStore } from '../contexts/store'
import { useLockout } from '../hooks/lockout'
import { DispatchAction } from '../contexts/reducers/store'
import { useTheme } from '../contexts/theme'
import { testIdWithKey } from '../utils/testable'

import { InlineErrorType, InlineMessageProps } from '../components/inputs/InlineErrorText'
import PINInput from '../components/inputs/PINInput'
import { ThemedText } from '../components/texts/ThemedText'
import PopupModal from '../components/modals/PopupModal'
import { InfoBoxType } from '../components/misc/InfoBox'
import { EventTypes, minPINLength } from '../constants'

interface PINEnterProps {
  setAuthenticated: (status: boolean) => void
}

const PINEnter: React.FC<PINEnterProps> = ({ setAuthenticated }) => {
  const { t } = useTranslation()
  const { checkWalletPIN, getWalletSecret, isBiometricsActive, disableBiometrics } = useAuth()
  const [store, dispatch] = useStore()
  const { getLockoutPenalty, attemptLockout } = useLockout()
  const { ColorPalette } = useTheme()

  const [PIN, setPIN] = useState('')
  const [errorMsg, setErrorMsg] = useState<InlineMessageProps | undefined>()
  const [modalMessage, setModalMessage] = useState<string | null>(null)
  const [biometricsDisabled, setBiometricsDisabled] = useState(false)

  const attempts = store.loginAttempt.loginAttempts

  const unlockWalletWithPIN = useCallback(
    async (pin: string) => {
      const result = await checkWalletPIN(pin)
      if (!result) {
        const newAttempt = attempts + 1
        const penalty = getLockoutPenalty(newAttempt)

        dispatch({ type: DispatchAction.ATTEMPT_UPDATED, payload: [{ loginAttempts: newAttempt }] })

        if (penalty) {
          attemptLockout(penalty)
          return
        }

        const triesLeft = 3 - (newAttempt % 3)
        const message = triesLeft === 1
          ? t('PINEnter.LastTryBeforeTimeout')
          : t('PINEnter.IncorrectPINTries', { tries: triesLeft })

        setErrorMsg({
          message,
          inlineType: InlineErrorType.error,
        })
        setModalMessage(message)
        return
      }

      dispatch({ type: DispatchAction.ATTEMPT_UPDATED, payload: [{ loginAttempts: 0 }] })
      setAuthenticated(true)
    },
    [attempts, checkWalletPIN, dispatch, getLockoutPenalty, attemptLockout, setAuthenticated, t]
  )

  const onPINComplete = async (pin: string) => {
    if (pin.length < minPINLength) {
      setErrorMsg({
        message: t('PINCreate.PINTooShort'),
        inlineType: InlineErrorType.error,
      })
      return
    }
    await unlockWalletWithPIN(pin)
  }

  const handleDelete = () => {
    setPIN(PIN.slice(0, -1))
  }

  const handleDigitPress = (digit: string) => {
    if (PIN.length < 6) {
      const nextPIN = PIN + digit
      setPIN(nextPIN)
      if (nextPIN.length === minPINLength) {
        Keyboard.dismiss()
        onPINComplete(nextPIN)
      }
    }
  }

  const handleBiometrics = async () => {
    try {
      const active = await isBiometricsActive()
      if (!active) {
        await disableBiometrics()
        setBiometricsDisabled(true)
        return
      }

      const secret = await getWalletSecret()
      if (secret) {
        setAuthenticated(true)
      }
    } catch {
      setBiometricsDisabled(true)
    }
  }

  const keypadLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['bio', '0', 'del'],
  ]

  const renderKey = (key: string) => {
    if (key === 'bio') {
      if (!store.preferences.useBiometry || biometricsDisabled) return <View key="bio" style={styles.button} />
      return (
        <TouchableOpacity key="bio" style={styles.button} onPress={handleBiometrics}>
          <Text>🔒</Text>
        </TouchableOpacity>
      )
    }

    if (key === 'del') {
      return (
        <TouchableOpacity key="del" style={styles.button} onPress={handleDelete}>
          <Text>⌫</Text>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity key={key} style={styles.button} onPress={() => handleDigitPress(key)}>
        <Text style={styles.buttonText}>{key}</Text>
      </TouchableOpacity>
    )
  }

  const Dots = () => (
    <View style={styles.dotContainer}>
      {[...Array(6)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            PIN.length > index ? styles.dotFilled : styles.dotEmpty,
          ]}
        />
      ))}
    </View>
  )

  const HelpText = useMemo(() => {
    return (
      <>
        <ThemedText variant="headingThree">{t('PINEnter.Title')}</ThemedText>
        <ThemedText variant="labelSubtitle">{t('PINEnter.EnterPIN')}</ThemedText>
      </>
    )
  }, [t])

  return (
    <View style={[styles.container, { backgroundColor: ColorPalette.brand.primaryBackground }]}>
      {HelpText}
      <PINInput
        onPINChanged={setPIN}
        value={PIN}
        inlineMessage={errorMsg}
        accessibilityLabel={t('PINEnter.EnterPIN')}
        testID={testIdWithKey('EnterPIN')}
      />
      <Dots />
      {keypadLayout.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map(renderKey)}
        </View>
      ))}
      {modalMessage && (
        <PopupModal
          notificationType={InfoBoxType.Info}
          title={t('PINEnter.IncorrectPIN')}
          bodyContent={<ThemedText variant="popupModalText">{modalMessage}</ThemedText>}
          onCallToActionLabel={t('Global.Okay')}
          onCallToActionPressed={() => setModalMessage(null)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    width: 70,
    height: 70,
    margin: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  dotFilled: {
    backgroundColor: '#000',
  },
  dotEmpty: {
    backgroundColor: '#000',
    opacity: 0.3,
  },
})

export default PINEnter
