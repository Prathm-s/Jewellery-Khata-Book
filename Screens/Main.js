import { Pressable, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Button, Modal } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import CustomerTab from '../Components/CustomerTab'
import { COLORS } from '../constants'
import { SIZES } from '../constants'
import Input from '../Components/Input'
import PrimaryButton from '../Components/PrimaryButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'


const Main = ({ navigation }) => {

    const [modal, setModal] = useState(false)
    const [salePur, setSalePur] = useState([10, 10])
    const [priceModal, setPriceModal] = useState(false)
    const [report, setReport] = useState({ "sell": 0, "purchase": 0 })
    const [sell, setSell] = useState([])
    const [price, setPrice] = useState({
        gold_price: 0,
        silver_price: 0
    })

    const { token } = useContext(TokenContext)

    useEffect(() => {
        getGoldSilverPrice()
        getDailyReport()
    }, [])

    const getGoldSilverPrice = async () => {
        const result = await axios.get(serverUrl.url + '/api/app/gold-silver-price/', {
            headers: {
                "Authorization": 'Token ' + token.access
            },

        }).then((res) => {
            return res.data
        }).catch((error) => console.log(error))
        setPrice(result)
    }


    const getDailyReport = async () => {
        let date = new Date()
        const todayObj = {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "day": date.getDay(),
        }

        const result = await axios.post(serverUrl.url + '/api/app/purchase-sale/', todayObj,
            {
                headers: {
                    "Authorization": 'Token ' + token.access
                }

            }).then((res) => {
                return res.data
            }).catch((error) => console.log(error))

        let temp = 0

        result["purchases"].map((item) => temp += item.total_amount)
        setReport(current => {
            return {
                ...current, "purchase": temp
            }
        })
        console.log(temp)

        temp = 0
        result["sells"].map((item) => temp += item.total_amount)
        setReport(current => {
            return {
                ...current, "sell": temp
            }
        })

        setSell(result['sells'])
        console.log(result['sells'])

    }

    const updatePrice = () => {
        setModal(!modal)
        console.log(price)
        axios.patch(serverUrl.url + '/api/app/gold-silver-price/', {
            "gold_price": price["gold_price"],
            "silver_price": price["silver_price"]
        }, {
            headers: {
                "Authorization": 'Token ' + token.access
            }
        })
            .then((res) => console.log(res))
            .catch((error) => console.log(error))

    }
    const showModal = (
        <Modal
            visible={modal}
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Update Rate</Text>
                        <Pressable onPress={() => setModal(!modal)}>

                            <Text>Close</Text>
                        </Pressable>
                    </View>

                    <Input
                        data={price.gold_price}
            
                        onChangeText={(text) => {
                            let arr = price

                            arr['gold_price'] = text
                            setPrice(arr)
                        }}
                        label={'Gold'}
                    />

                    <Input

                      
                        data={price.silver_price}
                        onChangeText={(text) => {
                            let arr = price
                            arr['silver_price'] = text
                            setPrice(arr)
                        }}
                        label={'Silver'}
                    />

                    <PrimaryButton title={"Update"} onPress={() => updatePrice()} />
                </View>
            </View>
        </Modal>
    )


    return (
        <View style={styles.container}>
            {showModal}
            <Pressable

                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: `rgba(255, 212, 90, 0.48)`, padding: 8, borderRadius: 6, marginBottom: 10 }}
                onPress={() => {
                    navigation.navigate("Premium")
                }}
            >
                <Text style={{}} >Trail Mode</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 8 }} >90 days Remaining</Text>
                    <AntDesign color="black" name="right" size={12} />

                </View>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium }}> Overview</Text>
                <Pressable
                    style={{ backgroundColor: COLORS.naturelLight, borderRadius: 4, padding: 8 }}
                    onPress={() => setModal(true)}
                >
                    {/* <Text style={{  }}>Update</Text> */}
                    <AntDesign size={18} color="black" name="edit" />

                </Pressable>
            </View>
            <View style={styles.RateContainer}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <View style={{ width: 10, height: 10, backgroundColor: 'orange', borderRadius: 10 }} />
                        <Text style={{ marginLeft: 4, color: 'gray' }}>Gold</Text>
                    </View>
                    <Text style={{ fontSize: 30, ...styles.spacing }}>₹{price.gold_price}</Text>
                </View>
                <View >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <View style={{ width: 10, height: 10, backgroundColor: 'lightgray', borderRadius: 10 }} />
                        <Text style={{ marginLeft: 4, color: 'gray' }}>Silver</Text>
                    </View>
                    <Text style={{ fontSize: 30, ...styles.spacing }}>₹{price.silver_price}</Text>
                </View>

            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>

                <TouchableOpacity style={styles.buttonsUi} onPress={() => navigation.navigate('Purchase')}>
                    <Image source={require('../Icons/shopping-cart.png')} style={styles.uiIcons} />
                    <Text style={{ color: 'gray', }}>Purchase</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonsUi} onPress={() => navigation.navigate('Sell')}>
                    <Image source={require('../Icons/cross.png')} style={styles.uiIcons} />
                    <Text style={{ color: 'gray', }}>Sell Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonsUi} onPress={() => navigation.navigate('AddItem')} >
                    <Image source={require('../Icons/add.png')} style={styles.uiIcons} />
                    <Text style={{ color: 'gray', }}>Add Item</Text>
                </TouchableOpacity>

            </View>


            <View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: `rgba(159, 232, 255, 0.34)`,
                    borderRadius: 8,
                    marginBottom: 8,
                    // borderColor: "#F7F7F7",
                    // borderWidth: 1,
                    marginTop: 20,

                    padding: 12
                }}>
                    <View>
                        <Text style={{ color: COLORS.naturelGrey }}>Sales</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium }}>{report['sell']}</Text>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right', color: COLORS.naturelGrey }}>Purchase</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium }}>{report['purchase']}</Text>
                    </View>
                </View>
            </View>



            <View style={{ marginTop: 10, borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium, marginHorizontal: 6, }}>Invoices</Text>
                <Pressable onPress={() => navigation.navigate("InvoiceFilter")} style={{ backgroundColor: COLORS.naturelLight, padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 4 }} >View All</Text>
                    <AntDesign color="black" name="right" size={12} />

                </Pressable>
            </View>


            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 400 }}
                    data={sell}

                    renderItem={({ item }) =>
                        <Pressable onPress={() => console.log()} >
                            {/* <CustomerTab data={item} /> */}
                            <View style={{ padding: 10, borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{}}>{item.customer_name}</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'limegreen' }}>₹ {item.total_amount - item.paid_amount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                </View>

                            </View>

                        </Pressable>}
                />
            </View>

        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    spacing: {
        letterSpacing: 0.5
    },
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1
    },

    editButton: {
        backgroundColor: 'white',
        flex: 0.5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsUi: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,

        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,

    },
    uiIcons: {
        margin: 5,
        height: 30,
        width: 30
    },
    BlueContainer: {
        backgroundColor: COLORS.primaryBlue,
        padding: 20,

        borderRadius: 20,

        shadowColor: '#00A3FF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 40,

    },
    RateContainer: {
        borderColor: "#F7F7F7",
        borderWidth: 1,

        flexDirection: 'row',
        borderRadius: 8,
        padding: 20,
        marginTop: 10,
        backgroundColor: 'white',

    },
    subBlueContainer: {
        flexDirection: 'row',

        justifyContent: 'space-between'

    },
    //MOdal Design
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


})
