import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../constants'

const Splash = ({ navigation }) => {

    setTimeout(() => navigation.navigate('Login'), 1000)
    return (
        <View style={styles.container}>
            <Image
            style={{
                height:100,
                widht:100,
                resizeMode:'center'
            }}
            source={require('../Icons/logo.png')}
        
            />
            <Text style={{
                fontWeight:'bold',
                fontSize:SIZES.large,
                margin:10
                
            }}>Splash Jwellery</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center'
    }

})