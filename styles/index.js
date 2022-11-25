import { StyleSheet } from "react-native"
import { COLORS, FONTS, SIZES } from "../constants"
export const text = StyleSheet.create({
    title: {
        fontWeight: FONTS.bold,
        fontSize: SIZES.medium,
        color: COLORS.naturelDark,
    },


})

export const wrapper = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor:'white',
        flex: 1,
        paddingHorizontal: SIZES.medium,
    },
})