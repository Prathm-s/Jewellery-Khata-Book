import React, { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import PurchaseT from './Screens/PurchaseT'
import SellT from './Screens/SellT'
import ShopRegister from './Screens/ShopRegister';
import { AppProvider } from './Context/TokenContext';
import Forgot from './Screens/Forgot';
import TrailPeroid from './Screens/TrailPeroid';




const Stack = new createNativeStackNavigator();

export default function App() {

  return (
    <AppProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false, navigationOptions: {
            headerShown: false,
          }
        }}>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
          <Stack.Screen component={ShopRegister} name="ShopRegister" />
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={Forgot} name="Forgot" />
          <Stack.Screen component={PurchaseT} name="Purchase" />
          <Stack.Screen component={SellT} name="Sell" />
          <Stack.Screen component={TrailPeroid} name="TrailPeriod" />



        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>

  );
}




// {
//   gold: [],
//     silver: []
// }
