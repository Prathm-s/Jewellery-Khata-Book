import { StyleSheet, Text, View, ScrollView, Pressable, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper'
import { COLORS, FONTS, SIZES } from '../constants'
import PrimaryButton from '../Components/PrimaryButton'
import ProductTab from '../Components/ProductTab'
import Input from '../Components/Input'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { serverUrl } from '../constants/apiData'
import TokenContext from '../Context/TokenContext'
import { PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';







const InvoicePreview = ({ navigation, route }) => {

    const data = route.params.data
    const userDetails = route.params.userDetails
    const total = route.params.total
    const invoiceObj = route.params.inst
    console.log("From Invoice Preview:",invoiceObj)
    const [invoiceId, setInvoiceId] = useState(null)




    const { token } = useContext(TokenContext)

    const [modal, setModal] = useState(false)

    const [paymentData, setPaymentData] = useState({
        total: 0,
        discount: 0,
        tax: 0,
        gst: 0,
        paidAmount: 0

    })
    useEffect(() => {
        getInvoiceId()
        navigation.getParent()?.setOptions({
            title: 'Invoice',
            tabBarStyle: {
                display: "none"
            }
        });



    }, [navigation]);


    const getInvoiceId = () => {
        if (route.params.invoiceId !== undefined) setInvoiceId(route.params.invoiceId)
    }
    const handlePaymentDetails = (text, fieldName) => {
        setPaymentData(prev => {
            return {
                ...prev, [fieldName]: text
            }
        })
    }

    const storeInvoice = () => {

        if (invoiceId !== null) {
            console.log(invoiceObj,invoiceId)
            axios.patch(serverUrl.url+'/api/app/sell/invoice/?invice_no='+invoiceId,{
                "paid_amount":invoiceObj.paid_amount
            },{
                headers:{
                    Authorization:'Token '+token.access
                }
            }).then(res=>{
                alert("Invoice Updated Successfully!!")
                console.log(res)
            }).catch(error=>alert(error))

        } else {

            // let date = new Date()
            // let dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
            // invoiceObj.created_at = dateString
            invoiceObj.customer_name = userDetails.full_name

            // navigation.navigate('GeneratePdf', { party: invoiceObj, items: items })

            axios.post(serverUrl.url + '/api/app/sell/', invoiceObj, {
                headers: {
                    "Authorization": 'Token ' + token.access
                }
            }).then((res) => {
                alert("Invoice Saved!")


            }).catch((error) => console.log(error))
        }


    }

    const displayProducts = data.map((item, index) =>
        <View style={styles.itemStyle}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text>{index + 1}. </Text>
                <Text style={{ fontWeight: 'bold' }}>{item.itemName}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                <Text>{item.qty}</Text>
                <Text>{item.itemPrice}</Text>
            </View>
        </View>
    )

    const showDiscountModal = (
        <Modal
            visible={modal}
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View >
                        <Text style={styles.Head}>Payment Details</Text>
                        <Input
                            label='Discount'
                            onChangeText={(text) => {
                                handlePaymentDetails(text, 'discount')
                            }}
                        />


                        <Input
                            label='Tax'
                            onChangeText={(text) => {
                                handlePaymentDetails(text, 'tax')
                            }}
                        />
                        <Input
                            label='GST'
                            onChangeText={(text) => {
                                handlePaymentDetails(text, 'gst')
                            }}
                        />
                        <Input
                            label='Paid Amount'
                            onChangeText={(text) => {
                                handlePaymentDetails(text, 'paidAmount')
                            }}
                        />


                        <PrimaryButton
                            title={"Apply"}
                            onPress={() => {
                                setModal(!modal)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )


    //Export Pdf 

    const party = userDetails
    const items = data
    let string = ""
    items.map((item) => {
        string += "<tr><td>" + item.itemName + "</td><td>" + item.itemDesc + "</td><td>" + item.itemPrice + "</td><td>" + item.qty + "</td><td>" + parseFloat(item.itemPrice * item.qty).toFixed(2) + "</td></tr>"
    })
    const d = {
        name: party.full_name,
        address: party.address,
        phone: party.phone_no,
        company: 'Xyz Company',
        amount: paymentData.total,
        amt: paymentData.paidAmount,
    }
    
    const htmlContent = `
          <html>
            <head>
              <meta charset="utf-8">
              <title>Invoice</title>
              <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
              <style>
                ${htmlStyles}
              </style>
            </head>
            <body>
              <header>
                <h1>Invoice</h1>
                <address>
               
                </address>
              </header>
              <article>
                <h1>Recipient</h1>
                <address>
                 
                  <address class="customer" >
                  <p class="name">${d.name}</p>
                  <p>${d.address}</p>
                  <p>${d.phone}</p>
                </address>
                </address>
                <table class="meta">
                  <tr>
                    <th><span>Invoice #</span></th>
                    <td><span>${invoiceId}</span></td>
                  </tr>
                  <tr>
                    <th><span>Date</span></th>
                    <td><span>${invoiceObj.created_at}</span></td>
                  </tr>
                  <tr>
                    <th><span>Amount Due</span></th>
                    <td><span id="prefix">₹</span><span>${parseFloat(total)-parseFloat(invoiceObj.paid_amount)}</span></td>
                  </tr>
                </table>
                <table class="inventory">
                  <thead>
                    <tr>
                      <th><span>Item</span></th>
                      <th><span>Description</span></th>
                      <th><span>Rate</span></th>
                      <th><span>Quantity</span></th>
                      <th><span>Price</span></th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    ${string}
                  </tbody>
                </table>
                <table class="balance">
                  <tr>
                    <th><span>Total</span></th>
                    <td><span data-prefix>₹</span><span>${total}</span></td>
                  </tr>
                  <tr>
                    <th><span>Amount Paid</span></th>
                    <td><span data-prefix>₹</span><span>${invoiceObj.paid_amount}</span></td>
                  </tr>
                  <tr>
                    <th><span>Balance Due</span></th>
                    <td><span data-prefix>₹</span><span>${parseFloat(total)-parseFloat(invoiceObj.paid_amount)}</span></td>
                  </tr>
                </table>
              </article>
            
            </body>
          </html>
        `;
    const askPermission = () => {
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Pdf creator needs External Storage Write Permission',
                        message:
                            'Pdf creator needs access to Storage data in your SD Card',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            createPDF();
        }
    }
    const createPDF = async () => {
        let options = {
            //Content to print
            html: htmlContent,
            //File Name
            fileName: 'my-test',
            //File directory
            directory: 'Download',

            base64: true
        };

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open', onPress: () => openFile(file.filePath) }
        ], { cancelable: true });

    }

    const openFile = (filepath) => {
        const path = filepath;// absolute-path-to-my-local-file.
        FileViewer.open(path)
            .then(() => {
                // success
            })
            .catch(error => {
                // error
            });
    }


    //End of export pdf 
    return (
        <ScrollView style={styles.container}>
            {showDiscountModal}
            <Text style={styles.Header}>Items</Text>
            <View style={{ marginHorizontal: 16, borderColor: 'gray' }}>
                {displayProducts}
            </View>

            <View style={styles.cardStyle}>
                <Text style={styles.CardHead}>Shipping Details</Text>
                <View style={styles.cardInner}>
                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Invoice No.</Text>
                        <Text>12345</Text>
                    </View>
                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Client Name</Text>
                        <Text>{userDetails.full_name}</Text>
                    </View>
                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Address</Text>
                        <Text>{userDetails.address}</Text>
                    </View>
                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Contact</Text>
                        <Text>+91 {userDetails.phone_no}</Text>
                    </View>


                </View>

            </View>

            <View style={styles.cardStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.CardHead}>Payment Details</Text>
                    <Pressable
                        onPress={() => {
                            // setModal(true)
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Edit</Text>
                    </Pressable>
                </View>
                <View style={styles.cardInner}>
                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Subtotal</Text>
                        <Text>
                            {total !== undefined ? total : 0}

                        </Text>
                    </View>

                    <View style={styles.InnerText}>
                        <Text style={{ color: COLORS.naturelGrey }}>Paid Amount</Text>
                        <Text>
                            {invoiceObj !== undefined ? invoiceObj.paid_amount : 0}
                        </Text>
                    </View>

                    <View style={{ borderTopColor: COLORS.naturelLight, borderTopWidth: 1, paddingTop: 8, borderStyle: 'dashed', ...styles.InnerText }}>
                        <Text style={{ fontWeight: 'bold' }}>Total</Text>
                        <Text style={{ fontWeight: 'bold' }}>{total !== undefined ? total : 0}</Text>
                    </View>


                </View>

            </View>

            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16 }}>
                <Pressable
                    onPress={() => {
                        alert("Generating Pdf")
                        askPermission()
                    }}
                    style={{ borderRadius: 8, backgroundColor: 'red', flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 10, paddingRight: 10 }}>
                    <AntDesign color="white" name="pdffile1" size={24} style={{ padding: 10 }} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }} >PDF</Text>
                </Pressable>
                <Pressable style={{ flex: 1, borderRadius: 8, backgroundColor: '#3CB371', flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                    <FontAwesome color="white" name="whatsapp" size={24} style={{ padding: 10 }} />

                    <Text style={{ color: 'white', fontWeight: 'bold' }} >Whatsapp</Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 20, margin: 16 }}>
                <PrimaryButton
                    onPress={() => storeInvoice()}
                    title={"Print"}
                />
            </View>
        </ScrollView>
    )
}

export default InvoicePreview


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: 'white',
    },
    Header: {
        margin: 16,
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },
    table: {

    },
    CardHead: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,

    },
    cardStyle: {
        padding: 16
    },
    cardInner: {
        marginTop: 16,
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.naturelLight
    },
    InnerText: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',

    },
    Head: {
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        marginBottom: 8,
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
    itemStyle: {
        padding: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.naturelLight,

    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#123',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
    },
    ImageStyle: {
        height: 150,
        width: 150,
        resizeMode: 'center',
    },

});



const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 {  }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */
.name{ font-weight: bold; ;padding-bottom:10px;}
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size:14px ;font-weight: bold; }

.customer{ font-size: 12px; padding-top: 10px; font-weight: normal; }
/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;