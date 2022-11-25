import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import PrimaryButton from './PrimaryButton'


const CustomModal = (props) => {
    const [modal, setModal] = useState()

    const handleCallback=()=>{
        props.parentCallback("Send Data")
    }
    return (
        <Modal
            animationType='slide'
            visible={modal}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

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


                    <PrimaryButton title={"Apply"} onPress={() => {
                        setModal(!modal)
                        handleCallback()
                    }} />
                </View>
            </View>

        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
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