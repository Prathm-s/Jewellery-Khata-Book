import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PC, BC, SC, SHC } from './Colors'
import { COLORS } from '../constants'
import OptionsMenu from 'react-native-option-menu'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


const MoreIcon = require('../Icons/More.png')


const CustomerTab = (props) => {

    const editPost = () => {
        props.callBack(props.index,false)
    }
    const deletePost = () => {
        props.callBack(props.index,true)
    }

    const button = (<SimpleLineIcons style={styles.icon} color='black' name="options-vertical" size={14} />
    )
    return (
        <View style={styles.userComponent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', }}>{props.data.full_name}</Text>

                <OptionsMenu
                    // button={MoreIcon}
                    customButton={button}
                    buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                    destructiveIndex={1}
                    options={["Edit", "Delete", "Cancel"]}
                    style={{ zIndex: 100 }}
                    actions={[editPost, deletePost]} />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.grayText}>{props.data.address}</Text>
                <Text style={styles.grayText}>12/10/2022</Text>
            </View>
        </View>
    )
}

export default CustomerTab

const styles = StyleSheet.create({
    userComponent: {
        padding: 10,
        paddingHorizontal: 16,

        borderBottomWidth: 1,
        borderColor: COLORS.naturelLight,

        // shadowColor:SHC,

        // shadowOffset:{
        //     width:0,
        //     height:0,
        // },
        // shadowOpacity:1,
        // shadowRadius:5,
        // elevation:20,

    },
    grayText: {
        color: COLORS.naturelGrey,
        letterSpacing: 0.5
    }

})