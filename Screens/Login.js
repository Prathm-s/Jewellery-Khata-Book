
import { Keyboard, StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import { useState, useContext, useEffect } from 'react';
import Input from '../Components/Input'
import { COLORS, SIZES, FONTS } from '../constants';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';
import { serverUrl } from '../constants/apiData';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TokenContext from '../Context/TokenContext';


const Login = ({ navigation }) => {

    const { token, setToken } = useContext(TokenContext)

    const [error, setError] = useState(false)
    const [inputs, setInputs] = useState({
        Email: '',
        Password: '',
    });



    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(async () => {
        getToeknValue()
    }, [])

    const getToeknValue = async () => {
        const tokenValue = await getTokenFromAsync()
        // console.log(tokenValue)
        if (tokenValue) {
            setToken(tokenValue)
            navigation.navigate('Home')

        }

    }
    const getTokenFromAsync = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Token')
            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            console.log(e)
        }
    }
    const handleError = (errorMessage, input) => {
        setErrors(pre => ({ ...pre, [input]: errorMessage }))
    }

    const validate = () => {
        console.log(inputs);
        Keyboard.dismiss();
        let valid = true;
        // email
        if (!inputs.Email) {
            handleError('Please input Email', 'Email')
            valid = false
        }
        // phone
        if (!inputs.Password) {
            handleError('Please input Password', 'Password')
            valid = false
        }
        if (valid) apiCall();
    }

    const storeData = async (value) => {
        try {
            const data = JSON.stringify(value)
            await AsyncStorage.setItem("Token", data)
        } catch (e) { console.log(e) }
    }

    const apiCall = async () => {
        setIsLoading(true);
        const webUrl = "http://52.66.199.187"
        const localUrl = serverUrl.url

        axios.post(localUrl + '/api/account/login/', {
            email: inputs.Email,
            password: inputs.Password
        }).then((res) => {
            console.log(res.data)
            setToken(res.data)
            storeData(res.data)
            setIsLoading(false)

            navigation.navigate('Home')
        }).catch((error) => {
            setError(true)
            setIsLoading(false)
        })



    }

    const handleOnChange = (text, input) => {
        setInputs(pre => {
            return {
                ...pre,
                [input]: text,
            }
        })
    }




    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.extraLarge }}>Login</Text>
                <Text>Sign in to continue</Text>
            </View>
            <Input label="Email"
                onChangeText={(text) => handleOnChange(text, "Email")}
                error={errors.Email}
                onFocus={() => handleError(null, 'Email')}
            />
            <Input label="Password"
                password={true}
                onChangeText={(text) => handleOnChange(text, "Password")}
                error={errors.Password}
                onFocus={() => handleError(null, 'Password')}
            />

            <View style={{ display: error ? null : "none", backgroundColor: `rgba(245, 39, 39, 0.18)`, padding: 10, borderRadius: 6, marginBottom: 10 }}>
                <Text style={{ color: 'red' }}>Check you email and password</Text>
            </View>
            <PrimaryButton title={"Login"} onPress={validate} loader={isLoading ? true : false} />
            <Text style={{ paddingTop: 20, ...styles.graytext, ...styles.label, }} onPress={() => navigation.navigate("Forgot")}>Forgot Password?</Text>
            <View style={styles.registerAlign}>
                <Text style={styles.label}>Dont have an account? </Text>
                <Text onPress={() => navigation.navigate("Register")} style={{ ...styles.label, fontWeight: 'bold', color: "#3FBFFE", }}>Register</Text>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        backgroundColor: 'white',
        flex: 1,

        padding: 10,


    },
    registerAlign: {
        paddingTop: 8,
        flexDirection: 'row',


    },
    graytext: {
        color: 'gray',
    },
    loginButton: {
        padding: 15,
        textAlign: 'center',
        backgroundColor: '#3FBFFE',
        borderRadius: 4,
        shadowColor: '#3FBFFE',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logo: {

        marginBottom: 10,
        width: "100%",
        resizeMode: 'center',
        height: 40,
    },
    inputFields: {

        borderRadius: 4,
        marginTop: 10,
        padding: 10,
        color: 'gray',
        borderColor: '#EBF1FC',
        borderWidth: 1,
    },
    text: {
        // fontFamily: 'Poppins-Regular',
        fontWeight: FONTS.bold,
        textAlign: 'center',
        fontSize: SIZES.extraLarge,
        marginBottom: 10,
        // letterSpacing: .5,
    },
    subCont: {

        marginTop: 20,
        width: "100%",
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 8,
        // letterSpacing: .5,
    }


})