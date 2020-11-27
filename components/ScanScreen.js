import React, {Component} from 'react';
import wifi from 'react-native-android-wifi';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default function ScanScreen({navigation}) {
  const onSuccess = (e) => {
    let res = e.data.toString();
    res = res.split(',');
    console.log(typeof res[0]);
    wifi.setEnabled(true);
    wifi.findAndConnect(res[0], res[1], found => {
        console.log(found)
    //   this.setState({ssidExist:found});
    });
    navigation.navigate('Login');
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
           <Text style={styles.textBold}>Scan the QR_code </Text>
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Wait for the feedback</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
