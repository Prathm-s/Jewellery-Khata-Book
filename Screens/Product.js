import { StyleSheet, Text, TextInput, View, Image, Button, FlatList, Pressable, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ProductTab from '../Components/ProductTab'
import { COLORS, SIZES } from '../constants'
import Input from '../Components/Input'
import PrimaryButton from '../Components/PrimaryButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TokenContext from '../Context/TokenContext'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native'

const Product = ({ navigation }) => {
    const [modal, setModal] = useState(false)
    const [products, setProducts] = useState([])
    const [productsB, setProductsB] = useState([])
    const { token } = useContext(TokenContext)

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getProducts()
        // setRefresh(!refresh)
        wait(2000).then(() => setRefreshing(false));
    }, []);



    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = () => {
        axios.get(serverUrl.url + '/api/app/products', {
            headers: {
                'Authorization': 'Token ' + token.access
            }
        }).then((res) => {

            const result = res.data['silver_items'].concat(res.data['gold_items'])

            setProducts(result)
            setProductsB(result)



        }).catch((error) => console.log(error))
    }

    const searchProducts = (text) => {
        const filterdProducts = productsB.filter((item) => item.item_name.toLowerCase().includes(text.toLowerCase()))

        setProducts(filterdProducts)
        console.log(filterdProducts)
        console.log(products)

    }

    const showModal = (
        <Modal
            animationType='slide'
            visible={modal}
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight: 'bold', fontSize: SIZES.large, marginBottom: 10 }}>Product Filter</Text>

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

                    <PrimaryButton title={"Apply"} onPress={() => setModal(!modal)} />
                </View>
            </View>

        </Modal>
    )

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: COLORS.naturelLight, borderBottomWidth: 1 }}>
                <View style={styles.header}>
                    {/* <Image source={require("../Icons/search.png")} style={{ tintColor: '#3FBFwFE', height: 25, width: 25, marginRight: 5 }} /> */}
                    <TextInput
                        placeholder='Search Products'
                        style={{ flex: 1, letterSpacing: 0.5, }}
                        placeholderTextColor={COLORS.naturelGrey}
                        onChangeText={(text) => {
                            console.log(text)
                            searchProducts(text)
                        }} />

                </View>
                <Pressable
                    onPress={() => navigation.navigate('AddItem')}>
                    <AntDesign color="white" name="plus" size={24} style={{ padding: 12, backgroundColor: COLORS.primaryBlue, borderRadius: 8, marginRight: 10, }} />
                </Pressable>

            </View>

            {showModal}
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                style={{ flex: 1 }}
            >
                {
                    products.map((item, index) =>
                        <Pressable key={index} onPress={() => navigation.navigate("ProductPre", { item: item })}>
                            <ProductTab data={item} />
                        </Pressable>)
                }
            </ScrollView>
            {/* 
            <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={products}
                renderItem={({ item }) => <Pressable onPress={() => navigation.navigate("ProductPre", { item: item })}>
                    <ProductTab data={item} />
                </Pressable>}
            /> */}

        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 12,
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#EBF1FC',
        borderWidth: 1,
        borderRadius: 8,
        // backgroundColor:'gray'

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