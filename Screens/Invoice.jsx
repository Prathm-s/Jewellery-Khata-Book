import { Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView, Pressable, Image, Modal } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import Input from '../Components/Input';
import PrimaryButton from '../Components/PrimaryButton';
import Qunatity from '../Components/Qunatity';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { serverUrl } from '../constants/apiData';
import TokenContext from '../Context/TokenContext';
import DropdownScreen from '../Components/DropdownMenu'




const Button = () => {
    return <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
    </TouchableHighlight>
}




const InputGroup = ({ label, firstItem = false, ...props }) => (<View style={[styles.inputGroup, firstItem ? { marginTop: 16 } : '', { ...props }]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={[styles.input]} />
</View>)

const InvoiceForm = ({ InvoiceNo = '', navigation }) => {

    const [inputs, setInputs] = useState();
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [seller, setSeller] = useState({
        name: "",
        mobile: "",
        date: ""
    })

    const { token } = useContext(TokenContext)

    const [isLoading, setIsLoading] = useState(false);
    const [Price, setPrice] = useState(0)
    const [items, setItems] = useState([])
    const [modal, setModal] = useState(false)
    const [errors, setErrors] = useState({});
    const [item, setItem] = useState({
        material: "",
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

    useEffect(() => {
        var date = new Date()
        setDate(date.getUTCDate() + '/' + parseInt(date.getUTCMonth()+1) + '/' + date.getUTCFullYear())
    }, [])

    useEffect(() => {
        console.log("Updating using useEffect ")
        updatePrice()
    }, [items]);


    const handleSalerChange = (data, filedName) => {
        setSeller(current => {
            return {
                ...current, [filedName]: data
            }
        })
    }
    const updatePrice = () => {
        var priceCal = 0
        items.map((e) => priceCal += parseFloat((parseFloat(e.itemPrice) * e.qty)))

        setPrice(priceCal.toFixed(2))
    }

    const editItem = (idx) => {

        setItem(items[idx])
        setModal(true)
        var arr = items

        arr[idx] = arr[arr.length - 1]
        arr[idx].qty -= 1

        arr.pop()
        // const temp = arr.map((item, index) => {
        //     if (index === idx) {
        //         // setPrice(Price - item.itemPrice)
        //         item.qty -= 1
        //         return arr[arr.length - 1]
        //     }
        //     else return item
        // })

        // temp.pop()
        setItems(arr)
        updatePrice()
    }


    const validate = () => {

        Keyboard.dismiss();
        let valid = true;
        // email
        if (!inputs.name) {
            handleError('Please input item name', 'name')
            valid = false
        }
        // phone
        if (!inputs.phone) {
            handleError('Please input phone', 'phone')
            valid = false
        }

        if (valid) apiCall();
    }

    const apiCall = async () => {

        setIsLoading(true);
        setTimeout(() => {
            alert('Saved successfully');
            setIsLoading(false)
        }, 2000);
    }

    const handleError = (errorMessage, input) => {
        setErrors(pre => ({ ...pre, [input]: errorMessage }))
    }

    const handleOnChange = (text, input) => {
        setItem(pre => {
            return {
                ...pre,
                [input]: text,
            }
        })
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


    const productPurchase = () => {


        const gold = items.map((item) => {
            return {
                "item_name": item.itemName,
                "price": item.itemPrice,
                "karet": 0,
                "gross_wt": item.grossWt,
                "net_wt": item.netWt,
                "grm_wt": item.grmRate,
                "stone_wt": 0,
                "fine_wt": 0,
                "qty": item.qty
            }
        })
        const gold_items = items.filter((item, index) => {
            if (item.material == "gold") {
                console.log(item)
                return {

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

        let date = new Date()
        let dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()

        const invoiceObjectPur = {
            "seller_name": seller.name,
            "total_amount": Price,
            "paid_amount": "34000",
            "gst": "230.00",
            "created_at": dateString,
            "gold_items": gold_arr,
            "silver_items": silver_arr
        }
        console.log(invoiceObjectPur)

        axios.post(serverUrl.url + '/api/app/purchase/', invoiceObjectPur, {
            headers: {
                "Authorization": 'Token ' + token.access
            }
        }).then((res) => console.log(res)).catch((error) => console.log(error))

        alert("Inoivce Create Successfully")

        navigation.navigate('Main')
        // navigation.navigate('GeneratePdf', { party: invoiceObjectPur, items: items })
    }
    const displayItems = items.map((item, remIndex) =>



        <Pressable style={styles.billProduct} onLongPress={() => editItem(remIndex)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                <View style={styles.singleItemHeader}>
                    <Text style={styles.itemname}>{item.itemName}</Text>

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
                <Text style={styles.Price}>Rs.{item.itemPrice}</Text>
                <Qunatity parentCallback={parentCallback} index={remIndex} qty={item.qty} />
            </View>

        </Pressable>
    )


    const itemModal = (
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

                        <Input
                            label='Item Name'
                            value={item.itemName}
                            onChangeText={(text) => {
                                handleOnChange(text, 'itemName')
                            }}
                            error={errors.itemName}
                            onFocus={() => handleError(null, 'itemName')}
                        />
                        <Input
                            value={item.itemDesc}
                            label='Item Description'
                            onChangeText={(text) => {
                                handleOnChange(text, 'itemDesc')
                            }}

                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Input label='Grm Rate'
                                    value={item.grmRate}
                                    onChangeText={(text) => {
                                        handleOnChange(text, 'grmRate')
                                    }}
                                    onFocus={() => handleError(null, "grmRate")}
                                    error={errors.grmRate}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Input label='Majuri'
                                    value={item.majuri}
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
                                    value={item.grossWt}

                                    onChangeText={(text) => {
                                        handleOnChange(text, 'grossWt')
                                    }}
                                    onFocus={() => handleError(null, "grossWt")}
                                    error={errors.grossWt}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Input label='Net. Wt'
                                    value={item.netWt}

                                    onChangeText={(text) => {
                                        handleOnChange(text, 'netWt')
                                    }}
                                    onFocus={() => handleError(null, "netWt")}
                                    error={errors.netWt}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Input label='GST %'
                                    value={item.gst}
                                    onChangeText={(text) => {
                                        handleOnChange(text, 'gst')
                                    }}
                                    onFocus={() => handleError(null, "gst")}
                                    error={errors.gst}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <DropdownScreen
                                    label='Material'
                                    onChangeText={(text) => handleOnChange(text, "material")}
                                    // error={errors.state}
                                    data={[
                                        { label: 'Gold', value: 'gold' },
                                        { label: 'Silver', value: 'silver' },
                                    ]}

                                    onFocus={() => handleError(null, 'material')}
                                />
                            </View>
                        </View>
                    </View>

                    <PrimaryButton
                        title={"Add Item"}
                        onPress={() => {

                            setModal(!modal)

                            var FinalPrice = (parseInt(item["netWt"]) * parseInt(item["grmRate"])) + (parseInt(item['majuri']) * parseInt(item["netWt"]))
                            var gst = item["gst"]
                            if (gst !== "" && gst != null && gst != 0) {
                                FinalPrice = FinalPrice + ((parseInt(gst) / 100) * FinalPrice)
                            }
                            var temp = item
                            temp["itemPrice"] = FinalPrice

                            setItems([...items, temp])

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
                        }}
                    />
                </View>

            </View>
        </Modal>
    )

    const dateEvent = (event, date) => {
        console.log(event)
        console.log(date)
        let changedDate = date.getUTCDate() + '/' + parseInt(date.getUTCMonth()+1) + '/' + date.getUTCFullYear()
        handleSalerChange(changedDate, "date")
        setShow(false)

    };

    return (<View style={{ flex: 1 }}>

        {show && <RNDateTimePicker value={new Date()} onChange={dateEvent} />}




        <View style={{ flex: 1, }}>
            {itemModal}
            <View style={{ padding: 8, paddingHorizontal: 16, backgroundColor: 'white', margin: 10, borderRadius: 8 }}>

                <Input label='Saler Name'

                    onChangeText={(text) => handleSalerChange(text, "name")}
                    error={errors.salerName}
                    onFocus={() => handleError(null, 'salerName')}
                    data={InvoiceNo}
                />

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ marginRight: 10, flex: 1 }}>
                        <Input
                            number
                            onChangeText={(text) => handleSalerChange(text, "mobile")}
                            label={'Mobile'}
                        />
                    </View>
                    <View >
                        <Input
                            onChangeText={(text) => handleSalerChange(text, "date")}
                            value={seller.date}
                            onFocus={() => setShow(true)}
                            label={'Invoice Date'}
                        />
                    </View>

                </View>

            </View>

            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium }}>Items</Text>
                {/* <Pressable
                    onPress={() => {
                        setModal(true)
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>Add Item</Text>
                </Pressable> */}
            </View>

            <View style={{ borderRadius: 6, backgroundColor: 'white', marginHorizontal: 10, paddingTop: 10 }}>
                {displayItems}
                <Pressable
                    style={styles.addItemButton}
                    onPress={() => setModal(!modal)}
                >
                    <AntDesign style={styles.icon} color={COLORS.primaryBlue} name="pluscircle" size={20} />
                    <Text style={{ color: COLORS.primaryBlue }}>Add Item</Text>
                </Pressable>
            </View>

        </View>

        <View style={{ marginHorizontal: 16 }}>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', flex: 3 }}>Total</Text>
                    <Text style={{ flex: 0.1 }}>₹</Text>

                    <Text style={{ flex: 1, textAlign: 'right', borderBottomWidth: 1, borderBottomColor: 'gray', borderStyle: 'dashed' }}> {Price}</Text>
                </View>



            </View>
            <PrimaryButton title='Save' onPress={() => productPurchase()} />
        </View>
    </View>)
}


const Invoice = ({ route, navigation }) => {
    useEffect(() => {
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


    return (
        <ScrollView style={{ flex: 1, }}>
            <InvoiceForm InvoiceNo={route.params?.InvoiceNo} navigation={navigation} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10
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
    inputGroup: {
        marginBottom: 18,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.naturelLight,
        borderRadius: 5,

        fontSize: SIZES.small,
        fontWeight: FONTS.bold,
        color: COLORS.naturelGrey,
        width: '100%',
        height: 40,
    },
    label: {
        color: COLORS.naturelDark,
        fontWeight: FONTS.bold,
        fontSize: SIZES.font,
        marginBottom: 8,
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
    },
    rowItems: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',

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
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: COLORS.naturelLight,
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 0,

    },
    billProduct: {
        paddingHorizontal: 16,

        borderBottomColor: COLORS.naturelLight,
        borderBottomWidth: 1,
        paddingBottom: 10,
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
})

export default Invoice