import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import PrimaryButton from '../Components/PrimaryButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RazorpayCheckout from 'react-native-razorpay'


const Premium = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: SIZES.extraLarge, fontWeight: 'bold' }}>Premium Plan</Text>
            <Text style={{ color: 'gray' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci exercitationem aspernatur perspiciatis nostrum ullam, quae facere illum cumque nulla modi architecto molestiae minus optio atque similique rerum debitis nemo explicabo!</Text>
            <View style={styles.cardStyle}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>₹ </Text>
                    <Text style={{ fontSize: SIZES.extraLarge, fontWeight: 'bold' }}>499.00 / Yr</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons color="limegreen" size={20} name="ios-checkmark-circle" />
                        <Text style={{ marginLeft: 6 }}>Download Invoice</Text>
                    </View>
                </View>
            </View>
            <PrimaryButton
                onPress={() => {



                    var options = {
                        description: 'Credits towards consultation',
                        image: require('../assets/icon.png'),
                        currency: 'INR',
                        key: 'rzp_test_zrpImOIk0S6Vsc',
                        amount: '49900',
                        name: 'Jwellery Khata Book',
                        // order_id: 'order_DslnoIgkIDL8Zt',
                        prefill: {
                            email: 'gaurav.kumar@example.com',
                            contact: '9191919191',
                            name: 'Gaurav Kumar'
                        },
                        theme: { color: COLORS.primaryBlue }
                    }
                    RazorpayCheckout.open(options).then((data) => {
                        // handle success
                        alert(`Success: ${data.razorpay_payment_id}`);
                    }).catch((error) => {
                        // handle failure
                        console.log(error)
                        alert(`Error: ${error.code} | ${error.description}`);
                    });
                }}
                title={"Buy 499.00/Yr"}
            />
        </View>
    )
}

export default Premium

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 16,
        fontWeight: 'bold',
        fontSize: SIZES.extraLarge
    },
    cardStyle: {
        marginVertical: 16,
        borderColor: "lightgray",
        borderRadius: 8,
        borderWidth: 1,
        padding: 16
    }
})

