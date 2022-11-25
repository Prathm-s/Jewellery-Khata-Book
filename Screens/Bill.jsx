import { Modal, Text, View, StyleSheet, TextInput, ScrollView, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import Input from '../Components/Input';
import PrimaryButton from "../Components/PrimaryButton";

import Qunatity from '../Components/Qunatity';
import { COLORS, FONTS, SIZES } from '../constants';
import DynamicDropdown from '../Components/DynamicDropdown';
import axios from 'axios';
import { serverUrl } from '../constants/apiData';
import TokenContext from '../Context/TokenContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'



const BillingForm = ({ navigation, route }) => {

    const { token } = useContext(TokenContext)
    const [Price, setPrice] = useState(0.00)
    const [modal, setModal] = useState(false)

    const [paymentData, setPaymentData] = useState({
        total: 0,
        discount: 0,
        tax: 0,
        gst: 0,
        paidAmount: 0

    })

    const [item, setItem] = useState({
        itemName: "",
        itemDesc: "",
        itemPrice: "",
        grmRate: "",
        grossWt: "",
        netWt: "",
        gst: "",
        qty: 0,
        majuri: 0
    })
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    const [items, setItems] = useState([])
    const [errors, setErrors] = useState({})
    const [products, setProducts] = useState([])
    const [userModal, setUserModal] = useState(false)
    const [customers, setCustomers] = useState([])
    const [index, setIndex] = useState(null)
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        getProducts()
        editInvoice()
        var date = new Date()
        setDate( date.getUTCFullYear() + '-' + parseInt(date.getUTCMonth() + 1) + '-' + date.getUTCDate())
    }, [])


    useEffect(() => {
        updatePrice()
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


    const editInvoice = () => {

        if (route.params !== undefined) {
            console.log(route.params.invoice)

            const invoice = route.params.invoice
            const details = route.params.userDetails["userDetails"]
            console.log(route.params.userDetails)
            console.log("items list : ",items,invoice)
            setCustomer(details)
            setPaymentData({
                total: invoice.total_amount,
                discount: 0,
                tax: 0,
                gst: 0,
                paidAmount: invoice.paid_amount
            })
            let goldArr = invoice.gold_items.map((item) => {
                return {
                    itemId: item.id,
                    itemName: item.item_name,
                    itemDesc: "",
                    itemPrice: item.price,
                    grmRate: item.grm_wt,
                    grossWt: item.gross_wt,
                    netWt: item.net_wt,
                    gst: "",
                    qty: item.qty - 1,
                    majuri: 0
                }
            }) 
            const silverArr = invoice.silver_items.map((item) => {
                return {
                    itemId: item.id,
                    itemName: item.item_name,
                    itemDesc: "",
                    itemPrice: item.price,
                    grmRate: item.grm_wt,
                    grossWt: item.gross_wt,
                    netWt: item.net_wt,
                    gst: "",
                    qty: item.qty - 1,
                    majuri: 0
                }
            }) 

            setItems(goldArr.concat(silverArr))


        } else {
            getCustomers()

        }
    }

    const getProducts = async () => {
        const result = await axios.get(serverUrl.url + '/api/app/products/', {
            headers: {
                'Authorization': 'Token ' + token.access
            }
        }).then((res) => {
            return res.data['gold_items'].concat(res.data['silver_items'])
        }).catch((error) => console.log(error))

        setProducts(result)
        console.log(result)
    }



    const getCustomers = async () => {
        const result = await axios.get(serverUrl.url + "/api/app/customers", {
            headers: {
                'Authorization': 'Token ' + token.access
            }
        }).then((res) => {
            console.log(res.data)
            setCustomers(res.data)
        }).catch((error) => console.log(error))


    }

    const onCustomerSelect = (cus) => {
        console.log(cus)
        setCustomer(cus)

    }
    const onSearchItem = (item) => {
        console.log(item)

        let item_price = parseFloat(item.grm_wt * item.net_wt).toFixed(2)

        const itemIns = {
            itemId: item.id,
            material: item.item_type,
            itemName: item.item_name,
            itemDesc: "",
            itemPrice: item_price,
            grmRate: item.grm_wt,
            grossWt: item.gross_wt,
            netWt: item.net_wt,
            gst: 0,
            qty: 0,
            majuri: 0
        }
        // setItems([...items, itemIns])


        setItem(itemIns)
    }
    const addItem = () => setModal(true)

    const updatePrice = () => {
        var priceCal = 0
        items.map((e) => priceCal += parseFloat((parseFloat(e.itemPrice) * e.qty)))
        setPrice(priceCal.toFixed(2))
        setPaymentData(current => {
            return {
                ...current, total: priceCal.toFixed(2)
            }
        })
        console.log(paymentData)
    }

    const handleUserDetails = (text, filedName) => {
        setuDetails(current => {
            return {
                ...current, [filedName]: text
            }
        })
    }
    const handleOnChange = (text, fieldName) => {
        setItem(current => {
            return {
                ...current, [fieldName]: text,
            }
        })
    }

    const handleError = (errorMessage, input) => {
        setErrors(current => ({ ...current, [input]: errorMessage }))
    }

    const editItem = (idx) => {


        setItem(items[idx])
        setModal(true)
        setIndex(idx)

    }

    const parentCallback = (qty, index, isDecremented) => {

        var arr = items
        if (isDecremented) {
            // setPrice(Price - parseInt(items[index]["itemPrice"]))
            arr[index]["qty"] = arr[index]["qty"] - 1
        }
        else {

            // setPrice(Price + parseInt(items[index]["itemPrice"]))
            arr[index]["qty"] = arr[index]["qty"] + 1
        }

        setItems(arr)
        updatePrice()
    }

    const saveProduct = () => {

        const gold_items = items.filter((item, index) => {
            if (item.material == "gold") {
                console.log(item)
                return {
                    "id": item.itemId,
                    "item_name": item.itemName,
                    "item_type": item.material,
                    "karet": "12",
                    "gross_wt": item.grossWt,
                    "net_wt": item.netWt,
                    "grm_wt": item.grmRate,
                    "stone_wt": "23",
                    "fine_wt": item.grmRate,
                    "price": item.itemPrice,
                    "qty": item.qty
                }

            } else {
                return null
            }
        })

        const silver_items = items.filter((item, index) => {
            if (item.material == "silver") {
                return item
            } else {
                return null
            }
        })

        const gold_arr = gold_items.map((item) => {
            return {
                "id": item.itemId,
                "item_name": item.itemName,
                "item_type": item.material,
                "karet": "12",
                "gross_wt": item.grossWt,
                "net_wt": item.netWt,
                "grm_wt": item.grmRate,
                "stone_wt": "23",
                "fine_wt": item.grmRate,
                "price": item.itemPrice,
                "qty": item.qty
            }
        })
        const silver_arr = silver_items.map((item) => {
            return {
                "id": item.itemId,
                "item_name": item.itemName,
                "item_type": item.material,
                "karet": "12",
                "gross_wt": item.grossWt,
                "net_wt": item.netWt,
                "grm_wt": item.grmRate,
                "stone_wt": "23",
                "fine_wt": item.grmRate,
                "price": item.itemPrice,
                "qty": item.qty
            }
        })


        const invoiceObject = {
            "customer": customer.id,
            "total_amount": Price,
            "paid_amount": paymentData.paidAmount,
            "gst": customer.gst_no,
            "created_at": date,
            "gold_items": gold_arr,
            "silver_items": silver_arr
        }

        let id = null
        if (route.params !== undefined) id = route.params.invoice.id
        console.log(invoiceObject)
        navigation.navigate('InvoicePreview', { userDetails: customer, data: items, total: Price, inst: invoiceObject, invoiceId: id })

        // axios.post(serverUrl.url+'/api/app/sell/',{

        // },{
        //     headers:{
        //         "Authorization":'Token '+token.access
        //     }
        // }
        // )

    }
    const itemCallback = (item) => {
        console.log("Parent Printing ", item)
    }

    const onAddItem = () => {
        setModal(!modal)
        var FinalPrice = (parseInt(item["netWt"]) * parseInt(item["grmRate"])) + (parseInt(item['majuri']) * parseInt(item["netWt"]))

        var gst = item["gst"]
        if (gst !== "" && gst != null && gst != 0) {
            FinalPrice = FinalPrice + ((parseInt(gst) / 100) * FinalPrice)
        }

        var temp = item
        temp["itemPrice"] = FinalPrice

        if (index !== null) {
            var arr = items
            arr[index] = temp

            setItems(arr)
            updatePrice()

        } else {
            setItems([...items, temp])
        }
        setIndex(null)
        setItem({
            itemName: "",
            itemDesc: "",
            price: "",
            grmRate: "",
            grossWt: "",
            netWt: "",
            gst: "",
            qty: 0,
            majuri: 0
        })
    }
    const displayItems = items.map((item, remIndex) =>



        <Pressable style={styles.billProduct} onLongPress={() => editItem(remIndex)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                <View style={styles.singleItemHeader}>
                    <Text style={styles.itemname}>{item.itemName || item.item_name}</Text>

                </View>
                <Pressable onPress={() => {
                    setItems(items.filter((e, index) => index !== remIndex))
                    var updatedPrice = Price - item.itemPrice * item.qty
                    if (updatedPrice < 0)
                        setPrice(0)
                    else
                        setPrice(updatedPrice)
                }
                }>
                    <Image source={require('../Icons/X.png')} style={{ width: 20, height: 20 }} />
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.Price}>Rs.{item.itemPrice || item.price}</Text>
                <Qunatity parentCallback={parentCallback} index={remIndex} qty={item.qty} />
            </View>

        </Pressable>
    )

    const showUserModal = (
        <Modal
            visible={userModal}
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View >
                        <Text style={styles.Head}>Customer Register</Text>

                        <Input
                            label='Customer Name'

                            onChangeText={(text) => {
                                handleUserDetails(text, 'customerName')
                            }}

                        />
                        <Input
                            label='Address'

                            onChangeText={(text) => {
                                handleUserDetails(text, 'address')
                            }}

                        />
                        <Input
                            label='Mobile'

                            onChangeText={(text) => {
                                handleUserDetails(text, 'mobile')
                            }}

                        />
                        <Input
                            label='GST Number'
                            onChangeText={(text) => {
                                handleUserDetails(text, 'gst')
                            }}

                        />

                    </View>
                    <PrimaryButton
                        title={"Register"}
                        onPress={() => {
                            setUserModal(!userModal)
                        }}
                    />
                </View>

            </View>
        </Modal>
    )
    const showModal = (
        <Modal
            visible={modal}
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.Head}>Add Item</Text>
                            <Pressable
                                onPress={() => setModal(!modal)}
                            >
                                <Text>Close</Text>
                            </Pressable>
                        </View>

                        <View style={{ borderColor: COLORS.naturelLight, borderWidth: 1, borderRadius: 4, marginBottom: 4 }}>
                            <DynamicDropdown
                                data={products}
                                itemCallback={itemCallback}
                                onChange={item => onSearchItem(item)}
                                labelField="item_name"
                                valueField="item_name"
                                placeholder="Select Item"
                                searchPlaceholder="Search Item"
                            />

                        </View>

                        <Input
                            label='Item Name'
                            data={item.itemName}
                            onChangeText={(text) => {
                                handleOnChange(text, 'itemName')
                            }}
                            error={errors.itemName}
                            onFocus={() => handleError(null, 'itemName')}
                        />
                        <Input
                            data={item.itemDesc}
                            label='Item Description'
                            onChangeText={(text) => {
                                handleOnChange(text, 'itemDesc')
                            }}

                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Input label='Grm Rate'
                                    data={item.grmRate}
                                    onChangeText={(text) => {
                                        handleOnChange(text, 'grmRate')
                                    }}
                                    onFocus={() => handleError(null, "grmRate")}
                                    error={errors.grmRate}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Input label='Majuri'
                                    data={item.majuri}
                                    onChangeText={(text) => {
                                        handleOnChange(text, 'majuri')
                                    }}
                                    onFocus={() => handleError(null, "majuri")}
                                    error={errors.majuri}
                                />


                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Input label='Gross Wt'
                                    data={item.grossWt}

                                    onChangeText={(text) => {
                                        handleOnChange(text, 'grossWt')
                                    }}
                                    onFocus={() => handleError(null, "grossWt")}
                                    error={errors.grossWt}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Input label='Net. Wt'
                                    data={item.netWt}

                                    onChangeText={(text) => {
                                        handleOnChange(text, 'netWt')
                                    }}
                                    onFocus={() => handleError(null, "netWt")}
                                    error={errors.netWt}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>



                            <View >
                                <Input label='GST %'
                                    data={item.gst}
                                    onChangeText={(text) => {
                                        handleOnChange(text, 'gst')
                                    }}
                                    onFocus={() => handleError(null, "gst")}
                                    error={errors.gst}
                                />


                            </View>
                        </View>



                    </View>
                    <PrimaryButton
                        title={"Add Item"}
                        onPress={() => onAddItem()}
                    />
                </View>

            </View>
        </Modal>
    )

    const dateEvent = (event, date) => {

        let changedDate = date.getUTCFullYear() + '-' + parseInt(date.getUTCMonth() + 1) + '-' + date.getUTCDate()
        if (event.type == "set") {
            setDate(changedDate)
            setCustomer(curr => {
                return {
                    ...curr, date: changedDate
                }
            })
            setShow(false)
            return
        }
        return

    };



    return <ScrollView style={{ flex: 1 }}>

        {show && <RNDateTimePicker value={new Date()} onChange={dateEvent} />}

        <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <DynamicDropdown
                    data={customers}
                    style={{ flex: 1, backgroundColor: 'white', borderRadius: 8, padding: 8 }}
                    itemCallback={itemCallback}
                    onChange={item => onCustomerSelect(item)}
                    labelField="full_name"
                    valueField="id"
                    placeholder="Select Customer"
                    searchPlaceholder="Search Customer"
                />
                <View>
                    <Pressable onPress={() => navigation.navigate('CustomerRegistration')}>
                        <AntDesign color="white" name="adduser" size={24} style={{ padding: 10, backgroundColor: COLORS.primaryBlue, borderRadius: 8, marginLeft: 10, }} />
                    </Pressable>


                </View>
                {/* <DynamicDropdown data={products} itemCallback={itemCallback} onChange={item => onSearchItem(item)} /> */}
            </View>


        </View>


        <View style={{ backgroundColor: 'white', padding: 16, marginHorizontal: 16, borderRadius: 8, }}>

            <View style={styles.userDetails}>
                <Text style={styles.subText}>Customer Name</Text>
                <Text style={{ fontWeight: 'bold' }}>{customer.full_name}</Text>
            </View>
            <View style={styles.userDetails}>
                <Text style={styles.subText}>Address</Text>
                <Text>{customer.address}</Text>
            </View>
            <View style={styles.userDetails}>
                <Text style={styles.subText}>Mobile</Text>
                <Text>{customer.phone_no}</Text>
            </View>
            <View style={styles.userDetails}>
                <Text style={styles.subText}>GST</Text>
                <Text>{customer.gst_no}</Text>
            </View>
            <View style={styles.invoiceDate}>
                <Text style={styles.subText}>Invoice Date</Text>
                <TextInput
                    onFocus={() => setShow(true)}
                    defaultValue={date}
                    style={styles.invoiceButton}
                />
            </View>
        </View>


        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
        }}>

            <Text style={{
                fontWeight: 'bold',
                fontSize: SIZES.medium
            }}>Items</Text>

            {/* <Pressable onPress={() => addItem()}>
                <Text style={{ fontWeight: 'bold' }}>Add</Text>
            </Pressable> */}

        </View>

        <View style={{
            backgroundColor: 'white',
            marginHorizontal: 16,
            borderRadius: 10
        }}>
            {displayItems}

            <Pressable
                style={styles.addItemButton}
                onPress={() => setModal(!modal)}
            >
                <AntDesign style={styles.icon} color={COLORS.primaryBlue} name="pluscircle" size={20} />
                <Text style={{ color: COLORS.primaryBlue }}>Add Item</Text>
            </Pressable>
        </View>
        <View >


            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', flex: 3 }}>Total</Text>
                    <Text style={{ flex: 0.1 }}>₹</Text>

                    <Text style={{ flex: 1, textAlign: 'right', borderBottomWidth: 1, borderBottomColor: 'gray', borderStyle: 'dashed' }}> {Price}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ flex: 3 }}>Paid</Text>
                    <Text style={{ flex: 0.1 }}>₹</Text>

                    <TextInput
                        onChangeText={(text) => {
                            setPaymentData(current => {
                                return {
                                    ...current, paidAmount: parseFloat(text)
                                }
                            })

                        }}
                        style={{ flex: 1, textAlign: 'right', borderBottomWidth: 1, borderBottomColor: 'gray', borderStyle: 'dashed' }}
                    // placeholder={paymentData.paidAmount}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 3, color: 'green' }}>Balance Due</Text>
                    <Text style={{ flex: 0.1 }}>₹</Text>

                    <Text style={{ flex: 1, textAlign: 'right', color: 'green' }}>  {parseFloat(paymentData.total) - paymentData.paidAmount}</Text>
                </View>



            </View>

            {showModal}
            {showUserModal}

            <View style={{ margin: 16 }}>
                <PrimaryButton title={'Save'}
                    onPress={() => saveProduct()} />
            </View>

        </View>

    </ScrollView>

}


export const Bill = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            {/* <ScreenHeader title='Selling' navigation={navigation} /> */}
            <BillingForm navigation={navigation} route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    invoiceButton: {

        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.naturelLight,
        padding: 8,

    },
    invoiceDate: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderStyle: 'dashed',
        borderTopColor: 'gray',
        borderTopWidth: 1,

    },
    icon: {
        marginRight: 10,
    },
    addItemButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: COLORS.naturelLight,
        borderWidth: 1,
        padding: 10,
        margin: 16,
        alignItems: 'center',
        borderRadius: 8
    },
    billProduct: {

        padding: 10,
        borderRadius: 8,
        borderBottomColor: COLORS.naturelLight,
        borderBottomWidth: 1
    },
    label: {

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
    Head: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        marginBottom: 8,
    },
    itemname: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    Price: {

        fontSize: SIZES.medium
    },
    itemDesc: {
        color: 'gray',

    },
    singleItemHeader: {

    },
    userDetails: {
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subText: {
        color: COLORS.naturelGrey
    }
})

export default Bill