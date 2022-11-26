import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../Components/Input'
import PrimaryButton from '../Components/PrimaryButton'
import { SIZES } from '../constants'
import DropdownScreen from '../Components/DropdownMenu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'

const ShopRegister = ({ navigation: { goBack,navigate }, route }) => {

    const userDetails = route.params.userDetails

   

    const { token } = useContext(TokenContext)
    const [errors, setErrors] = useState({});

    const [shop, setShop] = useState({
        shopName: "",
        gst: "",
        address: "",
        udyogAdhar: "",
        dealerType: "",

    })


    const handleOnChange = (text, input) => {
        setShop(pre => {
            return {
                ...pre,
                [input]: text,
            }
        })
    }
    const handleError = (errorMessage, input) => {
        setErrors(pre => ({ ...pre, [input]: errorMessage }))
    }

    const validate = () => {
        let valid = true

        if (!shop.shopName) {
            valid = false
            handleError("Enter shop name", "shopName")
        }

        if (!shop.gst) {
            valid = false
            handleError("Enter shop name", "gst")
        }
        if (!shop.address) {
            valid = false
            handleError("Enter shop name", "address")
        }

        if (!shop.udyogAdhar) {
            valid = false
            handleError("Enter shop name", "udyogAdhar")
        }

        if (!shop.dealerType) {
            valid = false
            handleError("Enter shop name", "dealerType")
        }

        if (valid) registerShop()
    }


    const loginCall = () => {
    
        navigate('Login')
        // const webUrl = "http://52.66.199.187"
        // const localUrl = serverUrl.url
        // axios.post(localUrl + '/api/account/login/', {
        //     email: userDetails.Email,
        //     password: userDetails.Password
        // })
        //     .then((res) => {
        //         console.log(res.data)
        //         setToken(res.data)
        //         storeData(res.data)
        //     })
        //     .catch((error) => console.log(error))

        // setIsLoading(false)
    }
    const registerShop = () => {

        axios.post(serverUrl.url + '/api/account/signup/', {
            "first_name": userDetails.firstName,
            "last_name": userDetails.lastName,
            "shop_name": shop.shopName,
            "email": userDetails.Email,
            "phone_no": userDetails.Mobile,
            "state": "maharashtra",
            "dist": "Kolhapur",
            "address": shop.address,
            "pan_no": userDetails.PAN,
            "gst_no": shop.gst,
            "user_type": shop.dealerType,
            "password": userDetails.Password,
            "password2": userDetails.confirmPassword,
            "adhaar_no": 123,
            "pincode": 1234
        },).then((res) => {
            console.log(res.data)
            alert("Shop registed Successfully")
            loginCall()
           

        })
            .catch((error) => console.log(error))

    }
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                <AntDesign name="left" size={20} color="black" onPress={() => goBack()} />
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.extraLarge }}>Shop Register</Text>
            </View>

            <Text style={{ marginBottom: 16, }}>register shop to continue</Text>
            <View>
                <Input
                    label={'Shop Name'}
                    onChangeText={(text) => handleOnChange(text, "shopName")}
                    error={errors.Email}
                    onFocus={() => handleError(null, 'Email')}
                />
                <Input
                    label={'GST'}
                    onChangeText={(text) => handleOnChange(text, "gst")}
                    error={errors.gst}
                    onFocus={() => handleError(null, 'gst')}
                />
                <Input
                    label={'Adress'}
                    onChangeText={(text) => handleOnChange(text, "address")}
                    error={errors.address}
                    onFocus={() => handleError(null, 'address')}
                />
                <Input
                    label={'Udyog Adhar'}
                    onChangeText={(text) => handleOnChange(text, "udyogAdhar")}
                    error={errors.udyogAdhar}
                    onFocus={() => handleError(null, 'udyogAdhar')}
                />
                <DropdownScreen
                    label='Saler Type'
                    onChangeText={(text) => handleOnChange(text, 'dealerType')}
                    data={[
                        { label: 'Wholesaler', value: 'dealer' },
                        { label: 'Retailer', value: 'retailer' },
                    ]}
                    // error={errors.dealerType}
                    onFocus={() => handleError(null, 'dealerType')}
                />
            </View>
            <PrimaryButton
                title={'Next'}
                onPress={() => { validate() }}
            />
        </View>
    )
}

export default ShopRegister


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50,
        padding: 10,
    }

})