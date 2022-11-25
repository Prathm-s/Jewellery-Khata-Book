import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext    } from 'react'
import Input from '../Components/Input'
import { SIZES } from '../constants'
import PrimaryButton from '../Components/PrimaryButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'

const Forgot = ({ navigation: { goBack } }) => {
    const [email, setEmail] = useState("")
    const { token } = useContext(TokenContext)
    const validateEmail = () => {
        axios.get(serverUrl.url + '/api/account/exists/?email='+email
        ).then((res) => {
            console.log(res.data)
            if (res.data['msg']) {
         
                sentEmail(email)

            } else {
                alert("User does not exist with this mail")
            }
        }).catch((error) => alert("User does not exist with this mail"))
    }

    const sentEmail = (mail) => {
        axios.post(serverUrl.url + '/api/account/forgot-password/email/', {
            email: mail
        }, {
            headers: {
                Authorization: 'Token ' + token.access
            }
        }).then(res => alert("Password reset link has sent to mail")).catch(error => alert("Something went wrong"))
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                <AntDesign name="left" size={20} color="black" onPress={() => goBack()} />
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.extraLarge, paddingLeft: 10 }}>Forgot Password</Text>
            </View>
            <Input
                label={'Email'}
                onChangeText={(text) => setEmail(text)}
                placeholder={"Enter your registered email"}
            />

            <PrimaryButton onPress={() => { validateEmail() }}
                title={"Send Link"}
            />
        </View>
    )
}

export default Forgot

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1,

    }
})