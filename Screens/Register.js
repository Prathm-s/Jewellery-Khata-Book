import { Keyboard, StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { useState, useContext } from 'react';
import { useFonts } from 'expo-font';
import Input from '../Components/Input'
import { COLORS, SIZES, FONTS } from '../constants';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';
import { serverUrl } from '../constants/apiData';
import TokenContext from '../Context/TokenContext';



const Register = ({ navigation }) => {

    const { token } = useContext(TokenContext)
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        Mobile: '',
        PAN: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',


    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

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
        if (!inputs.firstName) {
            handleError('Please input Name', 'FirstName')
            valid = false
        }

        if (!inputs.lastName) {
            handleError('Please input Name', 'LastNAme')
            valid = false
        }
        if (!inputs.Mobile) {
            handleError('Please input Mobile', 'Mobile')
            valid = false
        }

        if (valid) apiCall();
    }
    const apiCall = async () => {
        validateEmail()

        setIsLoading(true);
        setTimeout(() => {
            alert('submitted successfully');
            setIsLoading(false)
            // navigation.navigate('Invice', { inviceNo: inputs.inviceNo })
        }, 2000);

        // navigation.navigate('ShopRegister')

    }

    const validateEmail = () => {
        axios.get(serverUrl.url + '/api/account/exists/', {
            email: inputs.Email
        },
        ).then((res) => {
            console.log(res.data)
            if (!res.data['msg']) {
                console.log(res.data['msg'])
                navigation.navigate("ShopRegister", { userDetails: inputs })
            } else {
                alert("User Alread exist with this mail")
            }
        }).catch((error) => navigation.navigate("ShopRegister", { userDetails: inputs })
        )
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
        <ScrollView style={styles.container}>
            <View style={styles.subCont}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.extraLarge }}>Register</Text>
                <Text>Sign up to continue</Text>
            </View>


            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Input label="First Name"
                        onChangeText={(text) => handleOnChange(text, "firstName")}
                        error={errors.Mobile}
                        onFocus={() => handleError(null, 'firstName')}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <Input label="Last Name"
                        onChangeText={(text) => handleOnChange(text, "lastName")}
                        error={errors.Mobile}
                        onFocus={() => handleError(null, 'lastName')}
                    />
                </View>
            </View>


            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Input label="Mobile"
                        keyboardType='numeric'
                        onChangeText={(text) => handleOnChange(text, "Mobile")}
                        error={errors.Mobile}
                        onFocus={() => handleError(null, 'Mobile')}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <Input label="PAN"
                        keyboardType='numeric'
                        onChangeText={(text) => handleOnChange(text, "PAN")}
                        error={errors.Mobile}
                        onFocus={() => handleError(null, 'PAN')}
                    />
                </View>
            </View>



            <Input label="Email"
                onChangeText={(text) => {
                    handleOnChange(text, "Email")
                }}
                error={errors.Email}
                onFocus={() => handleError(null, 'Email')}
            />
            <Input label="Password"
                password={true}
                onChangeText={(text) => handleOnChange(text, "Password")}
                error={errors.Password}
                onFocus={() => handleError(null, 'Password')}

            />
            <Input label="Confirm Password"
                password={true}
                onChangeText={(text) => handleOnChange(text, "confirmPassword")}
                error={errors.confirmPassword}
                onFocus={() => handleError(null, 'confirmPassword')}

            />



            <PrimaryButton title={"Next"} onPress={validate} loader={isLoading ? true : false} />

            <View style={styles.registerAlign}>
                <Text style={styles.label}>Already have an account ? </Text>
                <Text onPress={() => navigation.navigate("Login")} style={{ ...styles.label, color: "#3FBFFE", fontWeight: 'bold', }}>Login</Text>
            </View>

        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',

        padding: 10,
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    registerAlign: {
        paddingTop: 8,
        marginBottom: 100,
        flexDirection: 'row',


    },
    graytext: {
        color: 'gray',
        textAlign: 'center'
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
        marginBottom: 16,
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 8,
        // letterSpacing: .5,
    }


})