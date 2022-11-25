import { Keyboard, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenHeader from '../Components/ScreenHeader';
import { wrapper } from '../styles';
import Input from '../Components/Input';
import PrimaryButton from "../Components/PrimaryButton";

const Item = (props) => {
    const [inputs, setInputs] = useState({
        itemName: '',
        phone: '',
        itemDesc: '',
        itemPrice: '',
        gross: '',
        net: '',
        grm: '',
        gst: '',
        inviceNo: '12352'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleError = (errorMessage, input) => {
        setErrors(pre => ({ ...pre, [input]: errorMessage }))
    }

    console.log(errors);
    const validate = () => {
        console.log(inputs);
        Keyboard.dismiss();
        let valid = true;
        // email
        // if (!inputs.itemName) {
        //     handleError('Please input item name', 'itemName')
        //     valid = false
        // }
        // // phone
        // if (!inputs.phone) {
        //     handleError('Please input phone', 'phone')
        //     valid = false
        // }

        if (valid) {
            // alert('Calling parent')
            props.parentCallback("Working Fine")
            // apiCall()
        };
    }
    const apiCall = async () => {

        setIsLoading(true);
        setTimeout(() => {
            alert('submitted successfully');
            setIsLoading(false)
            navigation.navigate('Invice', { inviceNo: inputs.inviceNo })
        }, 2000);
    }

    const handleOnChange = (text, input) => {
        setInputs(pre => {
            return {
                ...pre,
                [input]: text,
            }
        })
        // props.parentCallback(inputs, props.index)
    }

    useEffect(() => {
        console.log(inputs)
        props.parentCallback(inputs, props.index)

    }, [inputs.itemPrice])


    return <ScrollView>
        <View style={wrapper.container}>
            {/* <Text style={[styles.label, { marginTop: 16, marginBottom: 18, textAlign: 'right' }]}>Invice No : {inputs.inviceNo} </Text> */}

            <Input
                label='Item Name'
                onChangeText={(text) => {
                    handleOnChange(text, 'itemName')

                }}
                error={errors.itemName}
                onFocus={() => handleError(null, 'itemName')}
            />
            <Input label='Item Description'
                onChangeText={(text) => {
                    handleOnChange(text, 'itemDesc')

                }
                }
            />

            <Input label='Item Price'
                onChangeText={(text) => {
                    console.log(text)
                    handleOnChange(text, 'itemPrice')
                }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <Input label='Gross Wt' />
                </View>
                <View style={{ width: '48%' }}>
                    <Input label='Net. Wt' />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}>
                    <Input label='Grm Rate' />
                </View>
                <View style={{ width: '48%' }}>
                    <Input label='GST %' />
                </View>
            </View>



        </View>

    </ScrollView>
}

export default Item

const styles = StyleSheet.create({})