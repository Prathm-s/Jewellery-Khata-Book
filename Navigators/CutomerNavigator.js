import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Customer from '../Screens/Customer'
import InvoicePreview from '../Screens/InvoicePreview'
import Filter from '../Screens/Filter'
import CustomerInvoices from '../Screens/CustomerInvoices'
import Bill from '../Screens/Bill'



const Stack = new createNativeStackNavigator()



const CutomerNavigator = () => {


    return (
        <Stack.Navigator initialRouteName={{ name: "Customer" }}>

            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen name="CustomerInvoices" component={CustomerInvoices} options={{
                title: 'Invoices'
            }} />
            <Stack.Screen name="InvoicePreview" component={InvoicePreview} />
            <Stack.Screen name="InvoiceEdit" component={Bill} />
        </Stack.Navigator>
    )
}

export default CutomerNavigator