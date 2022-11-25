

import React from 'react'
import { View } from 'react-native'

const Loader = ({ visible = false }) => {
    return visible && <View></View>
}

export default Loader