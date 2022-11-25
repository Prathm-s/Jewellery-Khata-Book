import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../constants'


const Qunatity = (props) => {

    const [qty, setQty] = useState(props.qty+1)
    const [isDecremented, setIsDecremented] = useState(false)
    useEffect(() => {
        props.parentCallback(qty, props.index, isDecremented)
    }, [qty])

    return (
        <View style={{ flexDirection: 'row' }}>
         
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.naturelLight, }}>
                <Pressable style={{
                    backgroundColor: "#6dcff6",
                    width: 24,
                    height: "100%",
                    alignItems: 'center',
                    borderRadius: 4,
                    padding: 4
                }}
                    onPress={() => {
                        setQty(qty - 1)
                        setIsDecremented(true)
                    }} >
                    <Text>-</Text>
                </Pressable>
                <Text style={{ marginHorizontal: 10, padding: 4, fontWeight: 'bold' }}>{qty}</Text>

                <Pressable style={{
                    backgroundColor: "#6dcff6",
                    width: 24,
                    height: "100%",
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: 4,
                }} onPress={() => {
                    setQty(qty + 1)
                    setIsDecremented(false)

                }} >
                    <Text>+</Text>
                </Pressable>
            </View>
       
        </View>
    )
}

export default Qunatity

const styles = StyleSheet.create({})