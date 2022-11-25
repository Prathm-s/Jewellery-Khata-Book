import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import PrimaryButton from '../Components/PrimaryButton'
import Input from '../Components/Input'
import DropdownScreen from '../Components/DropdownMenu'
import { serverUrl } from '../constants/apiData'
import axios from 'axios'
import TokenContext from '../Context/TokenContext'

const AddItem = ({ navigation }) => {


  const [type, setType] = useState("gold_items")
  const { token } = useContext(TokenContext)

  const [item, setItem] = useState({
    itemName: "",
    itemDesc: "",
    itemPrice: 0,
    karet: 0,
    material: "",
    grmRate: "",
    grossWt: "",
    netWt: "",
    gst: "",
    qty: 1,
    majuri: 0,
    fineRate: 0,
    stoneRate: 0,

  })


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


  const validate = () => {

    let valid = true

    if (!item.itemName) {
      valid = false
      handleError("Enter item name", "name")
    }
    if (!item.grmRate) {
      valid = false
      handleError("Enter gram rate", "gramRate")
    }
    if (!item.majuri) {
      valid = false
      handleError("Enter gram rate", "majuri")
    }
    // if (!item.material) {
    //   valid = false
    //   handleError("Enter gram rate", "material")
    // }
    if (!item.karet) {
      valid = false
      handleError("Enter gram rate", "karet")
    }
    if (!item.netWt) {
      valid = false
      handleError("Enter gram rate", "netWt")
    }
    if (!item.gst) {
      valid = false
      handleError("Enter gram rate", "gst")
    }

    console.log(valid)

    if (valid) {
      let totalAmount = parseFloat(item.grmRate) * parseInt(item.netWt)
      console.log(totalAmount)
      apiCall()
    }
  }

  const apiCall = () => {

    const object = {
      // "gold_items": [],
      "silver_items": []
    }
    object[type] = [
      {
        "item_name": item.itemName,
        "price": parseFloat(item.grmRate) * parseInt(item.netWt),
        "karet": item.karet,
        "gross_wt": item.grossWt,
        "net_wt": item.netWt,
        "grm_wt": item.grmRate,
        "stone_wt": item.stoneRate,
        "fine_wt": item.fineRate,
        "qty": 1,
      }

    ]

    axios.post(
      serverUrl.url + '/api/app/products/', object,
      {
        headers: {
          'Authorization': 'Token ' + token.access
        }
      }
    )
      .then((res) => {
        alert("Item added Successfully")
        navigation.navigate("Main")
      })
      .catch((error) => console.log(error))

  }

  const handleOnChange = (text, fieldName) => {
    setItem(current => {
      return {
        ...current, [fieldName]: text,
      }
    })
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View style={{ flex: 1 }}>
        <View >
          <Input
            label='Item Name'
            onChangeText={(text) => {
              handleOnChange(text, 'itemName')

            }}
          // error={errors.itemName}
          // onFocus={() => handleError(null, 'itemName')}
          />
          <Input label='Item Description'
            onChangeText={(text) => {
              handleOnChange(text, 'itemDesc')

            }
            }
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <Input label='Quantity'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'qty')
                }} />
            </View>
            <View style={{ width: '48%' }}>
              <DropdownScreen
                label='Material '
                onChangeText={(text) => setType(text)}
                // error={errors.state}
                data={[
                  { label: 'Gold', value: 'gold_items' },
                  { label: 'Silver', value: 'silver_items' },
                ]}

                onFocus={() => handleError(null, 'material')}
              />
            </View>
          </View>




          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <Input label='Karet'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'karet')
                }} />
            </View>
            <View style={{ width: '48%' }}>
              <Input label='Majuri'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'majuri')
                }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <Input label='Gross Wt'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'grossWt')
                }} />
            </View>
            <View style={{ width: '48%' }}>
              <Input label='Net. Wt'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'netWt')
                }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <Input label='Gram/Fine Rate'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'grmRate')
                }} />
            </View>
            <View style={{ width: '48%' }}>
              <Input label='GST %'
                onChangeText={(text) => {
                  console.log(text)
                  handleOnChange(text, 'gst')
                }} />
            </View>
          </View>



        </View>



        <PrimaryButton title={"Add"} onPress={() => validate()} />
      </View>
    </ScrollView>
  )
}

export default AddItem

const styles = StyleSheet.create({

})