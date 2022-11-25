import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants'

const PrimaryButton = ({ title, loader, onPress = () => { } }) => {
    
    return (
        <TouchableOpacity
            style={{...styles.button}}
            activeOpacity={0.7}
            onPress={onPress}
        >
            {loader &&
                <ActivityIndicator color='#fff' style={{ marginRight: 8 }} />
            }
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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

export default PrimaryButton