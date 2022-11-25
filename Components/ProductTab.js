import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SHC } from './Colors'



const ProductTab = (props) => {

    
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: props.data.item_type == 'gold' ? '#FFE195' : '#E9E6E6', ...styles.qtyCont }}>
                <Text style={{ fontWeight: 'bold', }}>{props.data.qty}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', }}>{props.data.item_name}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ color: '#C6C6C6' }}>{props.data.item_type}</Text>
                    <Text style={{ fontWeight: 'bold' }}>₹ {props.data.price}</Text>
                </View>

            </View>
        </View>
    )
}

export default ProductTab

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,

     
        flex:1,
        borderColor: '#EBF1FC',
        borderBottomWidth:1,
      
        // shadowColor: 'lightgray',

        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowOpacity: 1,
        // shadowRadius: 5,
        // elevation: 20,


    },
    qtyCont: {
        width: "12%",
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,

    }
})