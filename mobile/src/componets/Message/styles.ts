import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../../theme"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 36,
    },
    message: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        lineHeight: 20,
        marginBottom: 12,
    },
    userName: {
        fontSize: 15,
        color: COLORS.WHITE,
        fontFamily: FONTS.REGULAR,
        marginLeft: 16,
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    }
})