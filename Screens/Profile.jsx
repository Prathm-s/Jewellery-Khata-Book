import { StyleSheet, Text, View, Pressable, Image, Button, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants'
import Input from '../Components/Input'
import PrimaryButton from '../Components/PrimaryButton'
import { TextInput } from 'react-native-paper'
import Item from '../Components/Item'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import jwt_decode from 'jwt-decode'
import TokenContext from '../Context/TokenContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Profile = ({ navigation }) => {

  const { token } = useContext(TokenContext)
  const [modal, setModal] = useState(false)
  const [request, setRequest] = useState(false)
  const [detailModal, setDetailsModal] = useState(false)
  const [updated, setUpdated] = useState({})
  const payload = jwt_decode(token.access)
  const [personalDetails, setPersonalDetails] = useState({})
  const [toupdate, setToUpdate] = useState({})

  const handleOnChange = (fieldName, text) => {

    setToUpdate(current => {
      return {
        ...current, [fieldName]: text
      }
    })

    console.log(toupdate)
    setPersonalDetails(current => {
      return {
        ...current, [fieldName]: text
      }
    })
  }

  useEffect(() => {
    console.log(payload)
    getUserDetails(payload.user_id)
  }, [])


  const getUserDetails = (id) => {
    axios.get(serverUrl.url + '/api/account/user/' + id,
      {
        headers: {
          Authorization: 'Token ' + token.access
        }
      }).then(res => {
        console.log(res.data)
        setPersonalDetails(res.data)
      }).catch(error => console.log(error))
  }

  const updateProfile = () => {
    setDetailsModal(!detailModal)

    axios.patch(serverUrl.url + '/api/account/user/' + payload.user_id + '/', toupdate,
      {
        headers: {
          Authorization: 'Token ' + token.access
        }
      }).then(res => console.log(res)).catch(error => console.log(error))
  }

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Token')
    } catch (e) {
      // remove error
    }
    console.log('Done.')
  }

  const showRequestModal = (
    <Modal
      animationType='fade'
      visible={request}
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Update Profile</Text>
            <Pressable onPress={() => { setRequest(false) }}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <View>
            <Input
              placeholder={'GST'}
              label={"Field Name"} />
            <Input label={"Field Details"} />
          </View>
          <PrimaryButton title={"Request Update"} onPress={() => {
            alert("Our team will notify you! Thank you for using Jwelllery Khata Book.")
            setRequest(!request)
          }} />
        </View>
      </View>
    </Modal>
  )

  const showModal = (
    <Modal
      animationType='fade'
      visible={modal}
      transparent={true}
      statusBarTranslucent={true}

    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Update Profile</Text>
            <Pressable onPress={() => { setModal(false) }}>
              <Text>Close</Text>
            </Pressable>
          </View>

          <PrimaryButton title={"Update"} onPress={() => setModal(!modal)} />
        </View>
      </View>
    </Modal>
  )

  const detailsModal = (
    <Modal
      animationType='fade'
      visible={detailModal}
      transparent={true}
      statusBarTranslucent={true}

    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Update Profile</Text>
            <Pressable onPress={() => setDetailsModal(!detailModal)}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <Input
            label={'First Name'}
            value={personalDetails.first_name}
            onChangeText={(text) => {
              handleOnChange('first_name', text)
            }}
          />
          <Input
            label={'LastName'}
            value={personalDetails.last_name}
            onChangeText={(text) => {
              handleOnChange('last_name', text)
            }}
          />
          <Input
            label={'Mobile'}
            value={personalDetails.phone_no}
            onChangeText={(text) => {
              handleOnChange('phone_no', text)
            }}
          />
          <Input
            number
            label={'Email'}
            value={personalDetails.email}
            onChangeText={(text) => {
              handleOnChange('email', text)
            }}
          />
          <Input
            number
            label={'Address'}
            value={personalDetails.address}
            onChangeText={(text) => {
              handleOnChange('address', text)
            }}
          />
          <PrimaryButton title={"Update"} onPress={() => updateProfile()} />
        </View>
      </View>
    </Modal>
  )
  return (

    <View style={styles.profileUi}>
      {showModal}
      {showRequestModal}
      {detailsModal}

      <Pressable onPress={() => setModal(!modal)}>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            borderRadius: 40,
            position: 'absolute',
            zIndex: 10,
            right: -10,
            backgroundColor: COLORS.primaryBlue,
          }}
        >
          <Image
            source={require('../Icons/Transaction.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: 'white',

            }}
          />
        </View>
        <Image source={require('../Icons/cross.png')} style={{
          width: 80,
          height: 80
        }} />

      </Pressable>

      <Text style={styles.shopName} >{personalDetails.shop_name}</Text>
      <View style={styles.cardProfile}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardHeader}>Personal Details</Text>
          <Pressable onPress={() => setDetailsModal(true)}>
            <Text style={{ fontWeight: 'bold' }}>Edit</Text>
          </Pressable>
        </View>


        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>Name</Text>
          <Text>{personalDetails.first_name + " " + personalDetails.last_name} </Text>
        </View>
        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>Mobile</Text>
          <Text>{personalDetails.phone_no}</Text>
        </View>
        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>Email</Text>
          <Text>{personalDetails.email}</Text>
        </View>
        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>Address</Text>
          <Text>{personalDetails.address}</Text>
        </View>
      </View>

      <View style={styles.cardProfile}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardHeader}>Shop Details</Text>
          <Pressable onPress={() => setRequest(true)}>
            <Text style={{ fontWeight: 'bold' }}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>GST No.</Text>
          <Text>{personalDetails.gst_no}</Text>
        </View>
        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>Udyog Adhar No.</Text>
          <Text>{personalDetails.adhaar_no}</Text>
        </View>
        <View style={styles.singCardItem}>
          <Text style={styles.singCardlabel}>PAN Card No.</Text>
          <Text>{personalDetails.pan_no}</Text>
        </View>
      </View>


      <Pressable
        style={{
          flexDirection:'row',
          // borderWidth: 1,
          backgroundColor: COLORS.naturelLight,
          padding:10,
          width:"100%",
          borderRadius:8,
          alignItems:'center'
        }}
        onPress={() => {
          removeValue()
          navigation.getParent()?.navigate('Login')
        }}>

          <AntDesign size={20} color="black" name="logout" style={{padding:10}}/>
        <Text>Logout</Text>
      </Pressable>



    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  iconFor: {
    tintColor: 'black',
    width: 24,
    marginRight: 10,
    height: 24
  },
  options: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderColor: COLORS.naturelLight,
    borderWidth: 0.8,

  },
  profileUi: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  shopName: {
    paddingBottom: 4,
    fontWeight: 'bold',
    fontSize: SIZES.extraLarge
  },
  cardProfile: {
    borderColor: COLORS.naturelLight,
    margin: 16,
    borderWidth: 1,
    padding: 16,
    width: "100%",
    borderRadius: 4,
  },
  singCardItem: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  singCardlabel: {
    color: COLORS.naturelGrey
  },
  cardHeader: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    marginBottom: 10,
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