import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '../texts/ThemedText'

export interface PINHeaderProps {
  updatePin?: boolean
}
const styles = StyleSheet.create({
    headerText: {
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 50,
      color: '#042645',
    },
  })

const PINHeader = ({ updatePin }: PINHeaderProps) => {
  const { TextTheme } = useTheme()
  const { t } = useTranslation()
  return (
    <View>
      <View>
        <ThemedText style={styles.headerText}>
            {updatePin ? t('PINChange.ChangePIN') : t('PINCreate.CreatePIN')}
        </ThemedText>
      </View>
      <ThemedText style={{ marginBottom: 16, alignContent: 'center' }}>
        <ThemedText style={{ fontWeight: TextTheme.bold.fontWeight }}>
          {updatePin ? t('PINChange.RememberChangePIN') : t('PINCreate.RememberPIN')}
        </ThemedText>{' '}
        
      </ThemedText>
    </View>
  )
}

export default PINHeader
