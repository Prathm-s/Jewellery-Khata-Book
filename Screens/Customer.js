import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, Modal, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import CustomerTab from '../Components/CustomerTab'
import { PC, BC, SC } from '../Components/Colors'
import PrimaryButton from '../Components/PrimaryButton'
import Input from '../Components/Input'
import { COLORS, FONTS, SIZES } from '../constants'
import TokenContext from '../Context/TokenContext'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RefreshControl } from 'react-native'
import { serverUrl } from '../constants/apiData'
import { cos } from 'react-native-reanimated'

const Customer = ({ navigation }) => {

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    
    const { token } = useContext(TokenContext)
    const [customers, setCustomers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [modal, setModal] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefresh(!refresh)
        wait(2000).then(() => setRefreshing(false));
    }, []);



    useEffect(() => {
        axios.get(serverUrl.url + "/api/app/customers",
            {
                headers: {
                    'Authorization': 'Token ' + token.access
                }
            })
            .then((res) => {
                setCustomers(res.data)
                console.log(res.data)
            })
            .catch((error) => { console.log(error) })


    }, [refresh])

    const searchCustomer = (text) => {

        axios.get(serverUrl.url + '/api/app/customers/search/?search=' + text,
            {
                headers: {
                    'Authorization': 'Token ' + token.access
                }
            }
        ).then((res) => {
            console.log(res.data)
            setCustomers(res.data)

        }).catch((error) => {
            console.log(error)
        })
    }

    const callBack = (idx, bool) => {
        if (bool) {
            //delete Customer
            console.log(customers[idx])
            axios.delete(serverUrl.url + '/api/app/customers/' + customers[idx].id, {
                headers: {
                    Authorization: 'Token ' + token.access
                }
            }).then(res => {
                alert("Deleted Successfully")
                setRefresh(!refresh)
            }).catch(error => {
                console.log("Error")
                alert("Error Deleting")
            })
        } else {

            navigation.navigate("CustomerRegistration", { userDetails: customers[idx] })
        }
    }


    const showModal =
        <Modal
            animationType='slide'
            visible={modal}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Customer Filter</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={{ width: "48%" }}>
                            <Input
                                label={'Invoice No.'}
                            />
                        </View>
                        <View style={{ width: "48%" }}>
                            <Input
                                label={'Date'}
                            />
                        </View>

                    </View>

                    <Input
                        label={'Purchase (Total)'}
                    />



                    <View>
                        <Text style={{ letterSpacing: 0.5, marginBottom: 8 }}>Time</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity style={styles.TagButton}>
                                <Text style={styles.TagText} >Daily</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.TagButton}>
                                <Text style={styles.TagText}  >Weekly</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.TagButton}>
                                <Text style={styles.TagText}  >Yearly</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <PrimaryButton title={"Apply"} onPress={() => setModal(!modal)} />
                </View>
            </View>

        </Modal>


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1 }}>
                <View style={styles.header}>
                    {/* <Image source={require("../Icons/search.png")} style={{ tintColor: PC, height: 25, width: 25, marginRight: 5 }} /> */}
                    <TextInput
                        placeholder='Search Customer'
                        style={{ flex: 1, letterSpacing: 0.5, }}
                        placeholderTextColor={COLORS.naturelGrey}
                        onChangeText={(text) => {
                            searchCustomer(text)
                        }}
                    />
                </View>
                <Pressable
                    onPress={() => navigation.navigate('CustomerRegistration')}>
                    <AntDesign color="white" name="adduser" size={24} style={{ padding: 12, backgroundColor: COLORS.primaryBlue, borderRadius: 8, marginRight: 10, }} />
                </Pressable>
            </View>
            {showModal}
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                style={{ height: "100%" }}
                contentContainerStyle={{ paddingBottom: 20 }}
                data={customers}
                renderItem={({ item, index }) =>
                    <Pressable
                        onPress={() => navigation.navigate('CustomerInvoices', { userDetails: item })}>
                        <CustomerTab data={item} callBack={callBack} index={index} />
                    </Pressable>}
            />
        </View>
    )
}

export default Customer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 12,
        padding: 10,
        borderColor: SC,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',

    },
    modalView: {

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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    TagButton: {

        backgroundColor: 'rgba(170, 228, 255, 0.4)',
        padding: 10,
        borderRadius: 4,
        marginRight: 10,

    },
    TagText: {
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.primaryBlue,
    }

})