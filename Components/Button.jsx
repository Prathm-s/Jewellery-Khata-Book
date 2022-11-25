import { TouchableHighlight, StyleSheet,Text } from "react-native"
import { COLORS,SHADOWS,FONTS,SIZES } from "../constants"


const Button = () => {
    return <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
    </TouchableHighlight>
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 12,
        backgroundColor: COLORS.primaryBlue,
        padding: 16,
        borderRadius: 5,
        ...SHADOWS.blueButton
    },
    buttonText: {
        color: "#fff",
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        lineHeight: 25.2,
        letterSpacing: .5,
        textAlign: 'center',
    }
})

export default Button