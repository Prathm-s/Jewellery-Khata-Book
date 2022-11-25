import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Input from '../Components/Input'

import { COLORS } from '../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'

const CustomerDeatils = ({ navigation }) => {


  const { token } = useContext(TokenContext)


  useEffect(() => {

    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });

    apiCall()

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

  const [customers, setCustomers] = useState([])
  const [t, setToken] = useState("")


  const [customerName, setCustomerName] = useState("")

  useEffect(() => {


  }, [customerName])





  const handelOnChangeText = () => {
    apiCall()
  }

  const apiCall = async () => {
    console.log("Token", token.access)
    axios.get(serverUrl.url + "/api/app/customers",
      {
        headers: {
          'Authorization': 'Token ' + token.access
        }
      })
      .then((res) => setCustomers(res.data))
      .catch((error) => {

      })
  }

  return (
    <View style={styles.container}>
      {token != undefined ? null : apiCall()}
      <View style={styles.serachedContainer}>
        <View style={{
          paddingHorizontal: 12,
          paddingTop: 12,
          borderBottomColor: COLORS.naturelLight,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flex: 1 }}>
            <Input

              onChangeText={(text) => {
                setCustomerName(text)
                handelOnChangeText()
              }}
              placeholder="Enter Customer name here"
              label={'Search Customer'}
            />
          </View>
          <View>
            <Pressable
              onPress={() => navigation.navigate('CustomerRegistration')}
            >
              <AntDesign color="white" name="adduser" size={24} style={{ padding: 10, marginTop: 10, backgroundColor: COLORS.primaryBlue, borderRadius: 8, marginLeft: 10, }} />

            </Pressable>
            {/* <PrimaryButton
              title={'Add User'}
              onPress={() => navigation.navigate('CustomerRegistration')}
            /> */}

          </View>
        </View>
        <FlatList
          data={customers}
          renderItem={({ item }) =>
            <Pressable
              style={styles.customer}
              onPress={() => navigation.navigate('Sell', { userDetails: item })}>

              <Text style={{ fontWeight: 'bold' }}>{item.full_name}</Text>
              <Text style={{ color: COLORS.naturelGrey }}>{item.address}</Text>

            </Pressable>}
        />
      </View>
      <View
        style={{ margin: 10 }}>
      </View>

    </View>
  )
}

export default CustomerDeatils

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    flex: 1,
  },
  serachedContainer: {
    flex: 1
  },
  customer: {
    paddingHorizontal: 16,
    borderColor: COLORS.naturelLight,
    borderBottomWidth: 1,
    padding: 10,
  }
})