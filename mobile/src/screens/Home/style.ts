import { StyleSheet } from 'react-native'
import { COLORS } from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BLACK_SECONDARY,
        padding: 20,
        paddingTop: getStatusBarHeight() + 17,
    },
    text: {
        fontSize: 20,
        color: COLORS.WHITE,
    }
})