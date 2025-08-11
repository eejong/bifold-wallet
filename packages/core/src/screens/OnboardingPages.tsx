import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import DigitalWallet from '../assets/img/digital-wallet 1.svg'
import DigitalIdentity from '../assets/img/digital-identity 1.svg'
import Folder from '../assets/img/folder 1.svg'
import Button, { ButtonType } from '../components/buttons/Button'
import { GenericFn } from '../types/fn'
import { testIdWithKey } from '../utils/testable'

import { useTheme } from '../contexts/theme'

import { ThemedText } from '../components/texts/ThemedText'
import { OnboardingStyleSheet } from './Onboarding'

export const createCarouselStyle = (OnboardingTheme: any) => {
  return StyleSheet.create<OnboardingStyleSheet>({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 180,
    width: 180,
  }
}

const CustomPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const { Assets } = useTheme()
  const { t } = useTranslation()
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Assets.svg.secureImage {...imageDisplayOptions} />
        </View>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={styles.headerText} testID={testIdWithKey('HeaderText')}>
            Ornare suspendisse sed nisi lacus
          </ThemedText>
          <ThemedText style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
            Enim facilisis gravida neque convallis a cras semper. Suscipit adipiscing bibendum est ultricies integer
            quis auctor elit sed.
          </ThemedText>
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: string; body: string; devModeListener?: boolean }> = [
  {
    image: DigitalWallet,
    title: 'ASTIg na wallet!',
    body: 'DOST - ASTI Wallet helps you prove your identity in a digital manner. It does this by storing digital credentials issued by participating entities such as government services. n/n/Elevate your online presence!',
    devModeListener: true,
  },
  {
    image: DigitalIdentity,
    title: 'Digital credentials',
    body: 'Digital credentials are the electronic equivalent of physical credentials such as certifications and permits offered by participating services n/n/Services are simplified and expected as organizations and individuals can confirm who you are with trusted information from digital credentials.',
  },
  {
    image: Folder,
    title: 'Private and confidential',
    body: 'We created this app to protect your data! n/n/DOST-ASTI will not know where and when you use your digital credentials, unless you are interacting with them. n/n/You also have control who can access your credentials and data. Only the necessary information that is needed are taken. ',
  },
]

export const createPageWith = (PageImage: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: 'center' }}>{<PageImage style={imageDisplayOptions} />}</View>
      <View style={{ marginBottom: 20 }}>
        <ThemedText style={styles.headerText} testID={testIdWithKey('HeaderText')}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.bodyText, { marginTop: 25 }]} testID={testIdWithKey('BodyText')}>
          {body}
        </ThemedText>
      </View>
    </ScrollView>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  return [
    ...guides.map((g) => createPageWith(g.image, g.title, g.body, OnboardingTheme)),
    CustomPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages
