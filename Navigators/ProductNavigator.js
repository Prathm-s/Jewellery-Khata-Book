import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Product from '../Screens/Product'
import ProductPre from '../Screens/ProductPre'


const Stack = new createNativeStackNavigator()


const ProductNavigator = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductPre" component={ProductPre} />

    </Stack.Navigator>
  )
}

export default ProductNavigator