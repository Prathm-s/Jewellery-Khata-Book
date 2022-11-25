import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, COLORS, FONTS, SIZES, } from '../constants'
import { text } from '../styles'

const ScreenHeader = ({ title, navigation }) => {
    return (

        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
            >
                <Image source={assets.left} />
            </TouchableOpacity>
            <Text style={{ marginLeft: SIZES.small, marginVertical: SIZES.base * 3 + 2, ...text.title }}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.naturelLight,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    }
})

export default ScreenHeader