import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../Screens/Main'
import Purchase from '../Screens/Purchase'
import Invoice from '../Screens/Invoice'
import Sell from '../Screens/Sell'
import AddItem from '../Screens/AddItem'
import InvoicePreview from '../Screens/InvoicePreview'
import Bill from '../Screens/Bill'
import CustomerRegistration from '../Screens/CustomerRegistration'
import CustomerDeatils from '../Screens/CustomerDeatils'
import GeneratePdf from '../Screens/GeneratePdf'
import InvoicesFilter from '../Screens/InvoicesFilter'
import Premium from '../Screens/Premium'


const MainNavigator = ({ navigation }) => {

  const Stack = new createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName={{ name: "Main" }}>

      <Stack.Screen component={Main} name="Main" />

      <Stack.Screen component={Invoice} name="Purchase" options={{
        title: 'Purchase Details'
      }} />

      <Stack.Screen component={Bill} name="Sell" options={{
        title: "Add Items",
      }} />

      <Stack.Screen component={CustomerDeatils} name="CustomerDetails" options={{
        title: 'Customer'
      }} />

      <Stack.Screen component={CustomerRegistration} name="CustomerRegistration"
        options={{
          title: 'Customer Details'
        }} />

      <Stack.Screen component={InvoicePreview} name="InvoicePreview" options={{
        title: 'Invoice'
      }} />

      <Stack.Screen component={AddItem} name="AddItem"
        options={{
          title: "Add Item"
        }} />

      <Stack.Screen component={Premium} name="Premium" />
      <Stack.Screen component={GeneratePdf} name="GeneratePdf" />
      <Stack.Screen component={InvoicesFilter} name="InvoiceFilter" />

    </Stack.Navigator>

  )
}

export default MainNavigator

