import { Pressable, StyleSheet, Text, View, Image, Modal } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { COLORS, SIZES } from '../constants'
import PrimaryButton from '../Components/PrimaryButton'
import Input from '../Components/Input'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'

const CustomerInvoices = ({ navigation, route }) => {



    const userDetails = route.params.userDetails
    const { token } = useContext(TokenContext)
    const [modal, setModal] = useState(false)
    const [invoices, setInvoices] = useState([])


    useEffect(() => {

        getInvoices()
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
                // position: 'absolute',
                // left: 20,
                // right: 20,
                // bottom: 25,
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

    const getInvoices = () => {
        axios.post(serverUrl.url + '/api/app/customers/invoice/', {
            id: userDetails.id,
        }, {
            headers: {
                Authorization: "Token " + token.access
            }
        }).then(res => {
            console.log(res.data)
            setInvoices(res.data)
        }).catch(error => console.log(error))
    }

    const showFilterModal = (
        <Modal
            visible={modal}
            statusBarTranslucent={true}
            transparent={true}
            animationType='slide'

        >
            <View style={styles.modalContainer}>
                <View style={styles.modalSub}>
                    <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium, marginBottom: 8 }}>Find Invoice</Text>
                    <Input
                        label={"Invoice No."}
                    />
                    <Input
                        label={"Date"}
                    />
                    <PrimaryButton
                        title={'Apply'}
                        onPress={() => setModal(!modal)}
                    />
                </View>
            </View>
        </Modal>
    )
    const invoiceView = invoices.map((item, index) => {

        let date = new Date(item.created_at)
        let string_date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

        return (<Pressable key={index} style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('InvoiceEdit', { userDetails: { userDetails }, invoice: item })


            }}
        >
            <View style={styles.horizontal}>
                <Text style={styles.head}>{userDetails.full_name}</Text>
                <Text style={{ color: 'limegreen' }}>₹ {item.total_amount - item.paid_amount}</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.subHead}># {item.id}</Text>

                <Text style={styles.subHead}>{string_date}</Text>
            </View>
        </Pressable>)
    })

    return (
        <View style={styles.mainContainer}>
            {showFilterModal}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
                borderBottomColor: COLORS.naturelLight,
                borderBottomWidth: 1
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium }}>Invoices</Text>
                <Pressable
                    onPress={() => setModal(true)}
                >
                    <Image
                        source={require('../Icons/filter.png')}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </Pressable>
            </View>
            <View>
                {invoiceView}
            </View>
        </View>
    )
}

export default CustomerInvoices

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    itemContainer: {
        padding: 10,

        paddingHorizontal: 16,
        borderBottomColor: COLORS.naturelLight,
        borderBottomWidth: 1
    },
    head: {
        fontWeight: 'bold'
    },
    subHead: {
        color: COLORS.naturelGrey
    },
    modalContainer: {

        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    modalSub: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 24,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 20

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


})