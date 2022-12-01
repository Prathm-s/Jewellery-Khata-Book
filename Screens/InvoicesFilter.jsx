import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Input from '../Components/Input'
import { COLORS } from '../constants'
import { color } from 'react-native-reanimated'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { RefreshControl } from 'react-native'


const InvoicesFilter = () => {
    const { token } = useContext(TokenContext)
    const [active, setActive] = useState(0)
    const [date, setDate] = useState(new Date())

    const [today, setToday] = useState("")
    const [purchase, setPurchase] = useState([])
    const [sell, setSell] = useState([])
    const [invoices, setInvoices] = useState([])
    const [invoiceBack, setInvoicesBack] = useState([])

    const [show, setShow] = useState(false)


    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // setRefresh(!refresh)
        wait(2000).then(() => setRefreshing(false));
    }, []);



    useEffect(() => {
        if (active == 1) {
            setInvoices(sell)
            setInvoicesBack(sell)
        } else if (active == 2) {
            setInvoices(sell.concat(purchase))
            setInvoicesBack(sell.concat(purchase))
        } else {
            setInvoices(purchase)
            setInvoicesBack(purchase)
        }

    }, [active])


    useEffect(() => {
    }, [invoices])

    useEffect(() => {
        initToday()
        getInvoices()
    }, [])

    const initToday = () => {
        let date = new Date()
        let stringDate = date.getUTCDate() + '/' + parseInt(date.getUTCMonth() + 1) + '/' + date.getUTCFullYear()
        setToday(stringDate)
    }

    const getInvoices = () => {
        axios.get(serverUrl.url + '/api/app/invoices/', {
            headers: {
                Authorization: "Token " + token.access
            }
        }).then(res => {
            const result = res.data
            setInvoices(res.data['purchase_invoices'])
            setInvoicesBack(res.data['purchase_invoices'])
            setSell(result['sell_invoces'])
            setPurchase(result['purchase_invoices'])
        })
            .catch(error => console.log(error))
    }


    const getReport = async (dateObj) => {
        const result = await axios.post(serverUrl.url + '/api/app/purchase-sale/', dateObj,
            {
                headers: {
                    "Authorization": 'Token ' + token.access
                }

            }).then((res) => {
                return res.data
            }).catch((error) => console.log(error))

        console.log(res)
        setPurchase(result['purchases'])
        setSell(result['sells'])


    }
    const searchItem = (itemName) => {
        
        const filterd = invoiceBack.filter((item, index) => {
            if (item.customer_name.toLowerCase().includes(itemName.toLowerCase())) {
                return item
            }
        })
        setInvoices(filterd)
    }

    const dateEvent = (event, date) => {
        if (event.type == "set") {

            let changedDate = date.getUTCDate() + '/' + parseInt(date.getUTCMonth() + 1) + '/' + date.getUTCFullYear()
            setToday(changedDate)
            console.log(today)
            const dateObject = {
                "year": date.getUTCFullYear(),
                "month": date.getUTCMonth(),
                "day": date.getUTCDate()
            }
            getReport(dateObject)
            setShow(false)
            return
        }
        return

    };

    const displayInvoices = invoices.map((item, index) => {
        console.log(item)
        return (
            <View key={index} style={{ padding: 8, borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.seller_name || item.customer_name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>₹ {item.total_amount}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'lightgray' }}>Invoice No: {item.id}</Text>
                    <Text style={{ color: 'lightgray' }}>{item.created_at.replaceAll('-', '/')}</Text>
                </View>
            </View>
        )
    })
    return (
        <View style={styles.mainContainer}>
            {show && <RNDateTimePicker value={date} onChange={dateEvent} />}

            <Input
                label={'Search Invoice'}
                onChangeText={(text) => searchItem(text)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', }}>

                    <Pressable
                        onPress={() => {
                            setActive(0)
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: COLORS.naturelLight,
                            marginRight: 10,
                            padding: 8,
                            borderRadius: 4,
                            backgroundColor: active == 0 ? COLORS.primaryBlue : null
                        }}>
                        <Text style={{ color: active == 0 ? 'white' : null }}>Purchase</Text>
                    </Pressable>


                    <Pressable
                        onPress={() => {
                            setActive(1)

                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: COLORS.naturelLight,
                            marginRight: 10,
                            padding: 8,
                            borderRadius: 4,
                            backgroundColor: active == 1 ? COLORS.primaryBlue : null,

                        }}>
                        <Text style={{ color: active == 1 ? 'white' : null }}>Sale</Text>
                    </Pressable>


                    <Pressable
                        onPress={() => {
                            setActive(2)
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: COLORS.naturelLight,
                            marginRight: 10,
                            padding: 8,
                            borderRadius: 4,
                            backgroundColor: active == 2 ? COLORS.primaryBlue : null,

                        }}>
                        <Text style={{ color: active == 2 ? 'white' : null }}>All</Text>
                    </Pressable>

                </View>
                <Pressable
                    onPress={() => {
                        setShow(true)
                    }}
                    style={{
                        borderWidth: 1,
                        borderColor: COLORS.naturelLight,

                        padding: 8,
                        borderRadius: 4,
                        backgroundColor: COLORS.naturelLight,

                    }}>
                    <Text>{today}</Text>
                </Pressable>
            </View>

            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}>
                {displayInvoices}
            </ScrollView>

        </View >
    )
}

export default InvoicesFilter

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        padding: 16,
        flex: 1,
    },
    active: {
        backgroundColor: COLORS.primaryBlue
    }
})