import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Report from './Report'
import { PC } from '../Components/Colors'

import { MainNavigator, CutomerNavigator, ProductNavigator } from '../Navigators'
import Profile from './Profile'
import ReportNavigator from '../Navigators/ReportNavigator'

const Tab = new createBottomTabNavigator()

const Home = () => {
    return (
        <Tab.Navigator

            screenOptions={{
                headerShown:false,
                headerTitleAlign: 'center',
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

            }}

        >
            <Tab.Screen component={MainNavigator} name="MainNavigator" options={{
                tabBarLabel: 'Home',
                title: 'Narayani Jwellers',

                tabBarActiveTintColor: PC,
                tabBarIcon: ({ color, size }) => (

                    <Image source={require('../Icons/home.png')}
                        style={{ width: 24, height: 24, tintColor: color }} />
                ),
                // tabBarBadge: 3,

            }} />

            <Tab.Screen component={ProductNavigator} name="ProductsTab" options={{
                tabBarLabel: 'Products',
                title: 'Products',
                tabBarActiveTintColor: PC,
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../Icons/cube.png')} style={{ width: 24, height: 24, tintColor: color }} />
                ),
                //   tabBarBadge: 3,
            }} />

            <Tab.Screen component={CutomerNavigator} name="CustomerTab" options={{
                tabBarLabel: 'Customer',
                title: 'Customer',
                
                tabBarActiveTintColor: PC,
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../Icons/account-multiple.png')}
                        style={{ width: 24, height: 24, tintColor: color }} />
                ),
                //   tabBarBadge: 3,
            }} />
            <Tab.Screen component={ReportNavigator} name="reportNavigator" options={{
                tabBarLabel: 'Report',
                tabBarActiveTintColor: PC,
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../Icons/file-chart.png')}
                        style={{ width: 24, height: 24, tintColor: color }} />
                ),
                //   tabBarBadge: 3,
            }} />
            
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarLabel: 'Profile',
                tabBarActiveTintColor: PC,
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../Icons/user.png')}
                        style={{ width: 24, height: 24, tintColor: color }} />
                ),
           
            }} />





      

        </Tab.Navigator>
    )
}

export default Home

const styles = StyleSheet.create({})