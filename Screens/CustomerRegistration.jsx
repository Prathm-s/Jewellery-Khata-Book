import { Keyboard, View, StyleSheet, ScrollView, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import ScreenHeader from '../Components/ScreenHeader';
import { wrapper } from '../styles';
import DropdownScreen from '../Components/DropdownMenu';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import Input from '../Components/Input';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { serverUrl } from '../constants/apiData';
import TokenContext from '../Context/TokenContext';

const RegistrationForm = ({ navigation, route }) => {

    const [inputs, setInputs] = useState({
        id: 0,
        fullName: '',
        email: '',
        state: 'Maharashtra',
        city: 'Kolhapur',
        address: '',
        adhaar: '',
        pan: '',
        gst: '',
        phone: 0,
    });

    const [updating, setUpdating] = useState(false)
    useEffect(() => {

        if (route.params != undefined) {
            console.log(route.params.userDetails)
            const userDetails = route.params.userDetails
            setInputs({
                id: userDetails.id,
                fullName: userDetails.full_name,
                email: userDetails.email,
                state: userDetails.state,
                city: userDetails.dist,
                address: userDetails.address,
                adhaar: userDetails.adhaar_no,
                pan: userDetails.pan_no,
                gst: userDetails.gst_no,
                phone: userDetails.phone_no,
            })
            setUpdating(true)
        }

    }, [])

    const { token } = useContext(TokenContext)






    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleError = (errorMessage, input) => {
        setErrors(pre => ({ ...pre, [input]: errorMessage }))
    }


    const validate = () => {

        Keyboard.dismiss();
        let valid = true;
        // email
        if (!inputs.fullName) {
            handleError('Please input Full name', 'fullName')
            valid = false
        }
        // phone
        if (!inputs.phone) {
            handleError('Please input phone', 'phone')
            valid = false
        }

        if (!inputs.email) {
            handleError('Please input email', 'email')
            valid = false
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            valid = false
            handleError('Invalid email', 'email')
        }
        if (!inputs.pan) {
            handleError('Please input pan', 'pan')
            valid = false
        }
        if (!inputs.adhaar) {
            handleError('Please input adhar', 'adhar')
            valid = false
        }
        if (!inputs.gst) {
            handleError('Please input gst', 'gst')
            valid = false
        }

        if (valid) {
            apiCall()
            // navigation.navigate("Sell", inputs)
        }
    }


    const apiCall = async () => {
        setIsLoading(true);


        if (!updating) {
            axios.post(serverUrl.url + "/api/app/customers/", {
                "full_name": inputs.fullName,
                "email": inputs.email,
                "phone_no": inputs.phone,
                "state": "maharashtra",
                "dist": "Kolhapur",
                "address": inputs.address,
                "pan_no": inputs.pan,
                "gst_no": inputs.gst,
                "adhaar_no": inputs.adhaar
            },
                {
                    headers: {
                        'Authorization': 'Token ' + token.access
                    }
                }

            ).then((res) => {
                alert("Customer Saved Successfully", res.data)
                setIsLoading(false)
                navigation.navigate('Customer')

            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
        } else {
            //Update Customer 
   
            axios.patch(serverUrl.url + "/api/app/customers/" + inputs.id + '/', {
                "full_name": inputs.fullName,
                "email": inputs.email,
                "phone_no": inputs.phone,
                "state": "Maharashtra",
                "dist": "Kolhapur",
                "address": inputs.address,
                "pan_no": inputs.pan,
                "gst_no": inputs.gst,
                "adhaar_no": inputs.adhaar
            },
                {
                    headers: {
                        'Authorization': 'Token ' + token.access
                    }
                }

            ).then((res) => {
                alert("Customer Updated Successfully", res.data)
                setIsLoading(false)
                navigation.navigate('Customer')

            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
        }
    }

    const handleOnChange = (text, input) => {
        setInputs(pre => {
            return {
                ...pre,
                [input]: text,
            }
        })
    }


    return <ScrollView>
        <View style={[wrapper.container, { marginTop: 16 }]}>

            <Input
                label='Full Name'
                value={inputs.fullName}
                onChangeText={(text) => handleOnChange(text, 'fullName')}
                error={errors.fullName}
                onFocus={() => handleError(null, 'fullName')}
            />
            <Input
                label='Phone'
                keyboardType='numeric'
                value={inputs.phone}
                onChangeText={(text) => handleOnChange(text, 'phone')}
                error={errors.phone}
                onFocus={() => handleError(null, 'phone')}
            />
            <Input
                label='Email'
                value={inputs.email}
                onChangeText={(text) => handleOnChange(text, 'email')}
                error={errors.email}
                onFocus={() => handleError(null, 'email')}
            />

            <Input
                label='Address'
                value={inputs.address}

                onChangeText={(text) => handleOnChange(text, 'address')}
                error={errors.address}
                onFocus={() => handleError(null, 'address')}
            />


            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <Input
                        label='State'
                        value={inputs.state}

                        onChangeText={(text) => handleOnChange(text, 'state')}
                        error={errors.state}
                        onFocus={() => handleError(null, 'state')}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Input
                        label='City'
                        value={inputs.city}

                        onChangeText={(text) => handleOnChange(text, 'city')}
                        error={errors.gst}
                        onFocus={() => handleError(null, 'city')}
                    />
                </View>
            </View>


            <Input
                label='Adhaar No'
                keyboardType='numeric'
                value={inputs.adhaar}
                onChangeText={(text) => handleOnChange(text, 'adhaar')}
                error={errors.adhaar}
                onFocus={() => handleError(null, 'adhaar')}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <Input
                        label='Pan No'
                        value={inputs.pan}

                        onChangeText={(text) => handleOnChange(text, 'pan')}
                        error={errors.pan}
                        onFocus={() => handleError(null, 'pan')}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Input
                        label='GST No'
                        value={inputs.gst}

                        onChangeText={(text) => handleOnChange(text, 'gst')}
                        error={errors.gst}
                        onFocus={() => handleError(null, 'gst')}
                    />
                </View>

            </View>
        </View>
        <View style={{ marginHorizontal: 16 }}>
            <PrimaryButton
                title={'Submit'}
                onPress={validate}
                loader={isLoading ? true : false} />
        </View>
    </ScrollView>
}


export const CustomerRegistration = ({ navigation, route }) => {
    useEffect(() => {

        //Add item
        // setItems([<Item parentCallback={handleCallback.bind(this)} index={0} />])


        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: {
                padding: 10,
                paddingBottom: 20,
                height: 70,

                backgroundColor: "white",
                borderRadius: 10,

                shadowColor: 'lightgray',
                shadowOffset: {
                    width: 0,
                    height: 4
                },
                shadowOpacity: 0.25,
                shadowRadius: 20,
                elevation: 10,

            },
        });
    }, [navigation]);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <RegistrationForm navigation={navigation} route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: COLORS.naturelLight,
        borderRadius: 5,

        fontSize: SIZES.small,
        fontWeight: FONTS.bold,
        color: COLORS.naturelGrey,
        width: '100%',
        height: 48,
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 12,
        lineHeight: 21,
        letterSpacing: .5,
    },
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

export default CustomerRegistration