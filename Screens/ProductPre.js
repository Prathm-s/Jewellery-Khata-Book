import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import Input from '../Components/Input'
import PrimaryButton from '../Components/PrimaryButton'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'




const ProductPre = ({ navigation, route }) => {

  const { token } = useContext(TokenContext)
  const [inputs, setInputs] = useState();
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState({


  })


  useEffect(() => {
    setData(route.params.item)

  }, [])


  const handleError = (errorMessage, input) => {
    setErrors(pre => ({ ...pre, [input]: errorMessage }))
  }

  const handleOnChange = (text, input) => {
    setItem(pre => {
      return {
        ...pre,
        [input]: text,
      }
    })
    setData(pre => {
      return {
        ...pre,
        [input]: text,
      }
    })
  }

  const updateItem = () => {
    console.log(item)

    axios.patch(serverUrl.url + '/api/app/products/' + data.id + '/?type=' + data.item_type, item, {
      headers: {
        Authorization: 'Token ' + token.access
      }
    }).then(res => { console.log(res) }).catch(error => console.log(error))

    setModal(false)

  }


  const productModal = (
    <Modal
      visible={modal}
      animationType='fade'
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.Head}>Add Item</Text>
              <Pressable
                onPress={() => setModal(!modal)}
              >
                <Text>Close</Text>
              </Pressable>
            </View>

            <Input
              label='Item Name'
              value={data.item_name}
              onChangeText={(text) => {
                handleOnChange(text, 'item_name')
              }}
              error={errors.item_name}
              onFocus={() => handleError(null, 'item_name')}
            />
            <Input
              value={item.itemDesc}
              label='Item Description'
              onChangeText={(text) => {
                handleOnChange(text, 'itemDesc')
              }}

            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '48%' }}>
                <Input label='Grm Rate'
                  value={data.grm_wt}
                  onChangeText={(text) => {
                    handleOnChange(text, 'grm_wt')
                  }}
                  onFocus={() => handleError(null, "grm_wt")}
                  error={errors.grmRate}
                />
              </View>
              <View style={{ width: '48%' }}>
                <Input label='Majuri'
                  value={item.majuri}
                  onChangeText={(text) => {
                    handleOnChange(text, 'majuri')
                  }}
                  onFocus={() => handleError(null, "majuri")}
                  error={errors.majuri}
                />


              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '48%' }}>
                <Input label='Gross Wt'
                  value={data.gross_wt}

                  onChangeText={(text) => {
                    handleOnChange(text, 'gross_wt')
                  }}
                  onFocus={() => handleError(null, "gross_wt")}
                  error={errors.gross_wt}
                />
              </View>
              <View style={{ width: '48%' }}>
                <Input label='Net. Wt'
                  value={data.net_wt}

                  onChangeText={(text) => {
                    handleOnChange(text, 'net_wt')
                  }}
                  onFocus={() => handleError(null, "net_wt")}
                  error={errors.net_wt}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ width: '48%' }}>
                <Input
                  label='Stone Wt'
                  value={data.stone_wt}
                  onChangeText={(text) => {
                    handleOnChange(text, 'stone_wt')
                  }}
                  onFocus={() => handleError(null, "stone_wt")}
                  error={errors.qty}

                />
              </View>
              <View style={{ width: '48%' }}>
                <Input
                  label='Quantity'
                  value={data.qty}
                  onChangeText={(text) => {
                    handleOnChange(text, 'qty')
                  }}
                  onFocus={() => handleError(null, "qty")}
                  error={errors.qty}
                />
              </View>


            </View>
          </View>

          <PrimaryButton
            title={"Update"}
            onPress={() => {
              updateItem()
            }}
          />
        </View>

      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      {productModal}
      <View style={styles.Header}>
        <Text style={styles.head}>{data.item_name}</Text>
        <Text style={styles.head}>₹ {data.price}</Text>

      </View>
      <Text>This is product description</Text>

      <View style={styles.cardContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headText}>Specification</Text>
          <Pressable onPress={() => setModal(true)}>

            <Text>Update</Text>
          </Pressable>
        </View>

        <View style={styles.innerContainer}>

          <View style={styles.SingleText}>
            <Text style={styles.productSpec} >Material</Text>
            <Text style={styles.ProductData}>{data.item_type}</Text>
          </View>

          <View style={styles.SingleText}>
            <Text style={styles.productSpec} >Gross Wt</Text>
            <Text style={styles.ProductData}>{data.gross_wt}</Text>
          </View>

          <View style={styles.SingleText}>
            <Text style={styles.productSpec} >Net Wt</Text>
            <Text style={styles.ProductData}>{data.net_wt}</Text>
          </View>

          <View style={styles.SingleText}>
            <Text style={styles.productSpec} >Gram Rate</Text>
            <Text style={styles.ProductData}>{data.grm_wt}</Text>
          </View>


          <View style={styles.SingleText}>
            <Text style={styles.productSpec} >Quantity</Text>
            <Text style={styles.ProductData}>{data.qty}</Text>
          </View>

          <View style={{ borderTopWidth: 1, borderTopColor: COLORS.naturelLight, paddingTop: 8, borderStyle: 'dashed', ...styles.SingleText }}>
            <Text style={{ fontWeight: 'bold', ...styles.productSpec, color: 'black' }} >Price</Text>
            <Text style={styles.ProductData}>{data.grm_wt * data.net_wt}</Text>
          </View>

        </View>
      </View>

    </View>
  )
}

export default ProductPre

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
  Head: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16
  },
  Header: { flexDirection: 'row', justifyContent: 'space-between' },
  cardContainer: {
    marginTop: 16,
  },
  head: {
    fontWeight: 'bold',
    fontSize: 20,

  },
  headText: {
    fontWeight: 'bold',
    fontSize: SIZES.medium
  },
  innerContainer: {
    marginTop: 10,
    borderRadius: 4,
    borderColor: COLORS.naturelLight,
    borderWidth: 1,
    padding: 16
  },
  SingleText: { justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 },
  ProductData: { fontWeight: 'bold', color: 'black' },
  productSpec: { color: COLORS.naturelGrey }
})