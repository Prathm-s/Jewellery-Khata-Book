import React from 'react'
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const Test = () => {

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
          share();
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
      share();
    }
  }

  const share = () => {
    RNFetchBlob.fs
      .readFile("file:///storage/emulated/0/Android/Pdf.pdf", 'base64')
      .then(data => console.log(data))
      .catch(error => console.log(error))

  }
  return (
    <View>
      <Pressable

        style={{padding:10,backgroundColor:'gray'}}
        onPress={() => {
          askPermission()
        }}>
        <Text>Share</Text>
      </Pressable>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})