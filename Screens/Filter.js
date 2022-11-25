import { Pressable, StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'





const Filter = () => {

  const [activeIndex, setActiveIndex] = useState(-1)

  const [field, setField] = useState({
    Price: 34,
    Name: "Demo"
  })

  const ref = useRef()
  useEffect(() => {
    console.log(field)
  }, [field])


  const data = [
    { name: "Head" },
    { name: "Body" },
   
  ]


  const validator = true
  const CurItem = data.map((item, index) =>
    <Pressable onPress={() => {

      setActiveIndex(index)

    }}>
      <View style={styles.CurMainItem} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 20 }}>{item.name}</Text>

          <Pressable onPress={() => setActiveIndex(-1)}>
            <Image source={require('../Icons/X.png')} style={{ height: 20, width: 20, tintColor: 'black' }} />
          </Pressable>
          {/* <Button title='Close' onPress={() => setActiveIndex(-1)} /> */}

        </View>
        {index === activeIndex && (
          <View>

            <Text>Hello world</Text>
            <Text>Hello world</Text>
            <TextInput placeholder='Enter your data' />
          </View>
        )}
      </View>
    </Pressable>
  )

  return (
    <View>
     T
      <Pressable style={{backgroundColor:'lightgray',padding:16,margin:16,borderRadius:8}} onPress={() =>
        setField((f) => ({ ...f, Name: 'Prathmesh' }))
      }>
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  CurMainItem: {
    flexGrow: 1,

    borderBottomWidth:1,
    borderColor:'lightgray',
    padding: 16,
  
  }
})