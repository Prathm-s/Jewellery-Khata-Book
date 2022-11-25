import { Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Report from '../Screens/Report'

const Stack = new createNativeStackNavigator()

const ReportNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Report" >
        <Stack.Screen name='Report' component={Report}/>
    </Stack.Navigator>
  )
}

export default ReportNavigator
