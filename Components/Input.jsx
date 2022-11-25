import { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const Input = ({ firstInput, label, error, password, data="", onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    // console.log(hidePassword)
    return (
        <View style={[styles.inputGroup, firstInput ? { marginTop: 16 } : '']}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...props}
             
                style={[styles.input, { borderColor: error ? COLORS.primaryRed : isFocused ? COLORS.primaryBlue : COLORS.naturelLight }, { ...props }]}
                autoCorrect={false}
                onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                defaultValue={data}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={hidePassword}
            />
            {error &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 18,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,

        fontWeight: FONTS.bold,
        color: COLORS.naturelGrey,
        width: '100%',
        height: 44,
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 8,
        letterSpacing: .5,
    },
    error: {
        color: COLORS.primaryRed,
        fontWeight: FONTS.bold,
        fontSize: SIZES.small,
        marginTop: 4,
        letterSpacing: .5,
    }
})

export default Input