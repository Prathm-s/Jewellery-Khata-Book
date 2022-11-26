import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { COLORS, SIZES } from '../constants'


import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TokenContext from '../Context/TokenContext';
import axios from 'axios';
import { serverUrl } from '../constants/apiData';






const Report = () => {

    const { token } = useContext(TokenContext)

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    const [report, setReport] = useState({ "sell": 0, "purchase": 0 })
    const [sell, setSell] = useState([])
    const [purchase, setPurchases] = useState([])
    const [price, setPrice] = useState({
        gold_price: 0,
        silver_price: 0
    })

    useEffect(() => {
        const todayObj = {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "day": date.getDay(),
        }
        getReport(todayObj)
    }, [])

    const getReport = async (dateObj) => {

        const result = await axios.post(serverUrl.url + '/api/app/purchase-sale/', dateObj,
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

        temp = 0
        result["sells"].map((item) => temp += item.total_amount)
        setReport(current => {
            return {
                ...current, "sell": temp
            }
        })


        setPurchases(result['purchases'])
        setSell(result['sells'])
        console.log(result['purchases'])
    }

    const dateEvent = (event, date) => {

        // let changedDate = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()

        if (event.type == "set") {
            setShow(false)

            const dateObject = {
                "year": date.getUTCFullYear(),
                "month": date.ggetUTCMonth() + 1,
                "day": date.getUTCDate()
            }
            console.log(date, dateObject)

            getReport(dateObject)
            return 
        }   
        return

    };

    return (
        <View style={styles.container}>

            {show && <RNDateTimePicker value={new Date()} onChange={dateEvent} />}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...styles.lable, marginTop: 0 }}>Show</Text>
                <Pressable style={styles.selector} onPress={() => {
                    setShow(true)
                }}>
                    <Text>Today</Text>


                </Pressable>
            </View>


            <View style={styles.valueMainCont}>

                <View style={{ ...styles.valueContainer, marginRight: 10 }}>
                    <Text>Purchase</Text>
                    <Text style={styles.Values}>{report['purchase']}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text>Sale</Text>
                    <Text style={styles.Values}>{report['sell']}</Text>
                </View>

            </View>
{/* 
            <View style={styles.valueMainCont}>
                {show && <RNDateTimePicker value={date} onChange={() => { setShow(false) }} />}

                <View style={{ ...styles.valueContainer, marginRight: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 8,
                        borderBottomColor: COLORS.naturelLight,

                        borderBottomWidth: 1
                    }}>
                        <View style={{ width: 10, height: 10, backgroundColor: 'orange', borderRadius: 10 }} />
                        <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>Gold</Text>
                    </View>
                    <Text style={{ ...styles.lable }}>Sale</Text>
                    <Text style={{ ...styles.Values, marginTop: 0 }}>25060</Text>
                    <Text style={{ ...styles.lable }}>Purchase</Text>
                    <Text style={{ ...styles.Values, marginTop: 0 }}>25060</Text>

                </View>

                <View style={{ ...styles.valueContainer }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 8,
                        borderBottomColor: COLORS.naturelLight,

                        borderBottomWidth: 1
                    }}>
                        <View style={{ width: 10, height: 10, backgroundColor: 'lightgray', borderRadius: 10 }} />
                        <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>Silver</Text>
                    </View>
                    <Text style={{ ...styles.lable }}>Sale</Text>
                    <Text style={{ ...styles.Values, marginTop: 0 }}>25060</Text>
                    <Text style={{ ...styles.lable }}>Purchase</Text>
                    <Text style={{ ...styles.Values, marginTop: 0 }}>25060</Text>

                </View>

            </View> */}


        </View>
    )
}

export default Report

const styles = StyleSheet.create({

    container: {
        flex: 1,

        padding: 16,
    },
    lable: {
        marginTop: 8,
        color: COLORS.naturelGrey
    },
    selector: {
        marginLeft: 4,
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 4,

        backgroundColor: 'white',
    },
    Values: {
        marginTop: 4,
        fontWeight: 'bold',
        fontSize: SIZES.extraLarge,
    },
    valueContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        flex: 1,

    },
    valueMainCont: {
        marginTop: 16,

        flexDirection: 'row',
    },
    salesContainer: {
        backgroundColor: 'white',
        flex: 1

    }


})