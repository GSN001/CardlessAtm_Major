import React, {useState} from 'react';
import 'react-native-gesture-handler';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
const userdata = require('../users.json');

function Login({navigation}) {
  const [name, onChangeName] = useState();
  const [password, onChangeText] = useState();
  // const { ssid, pass} = route.params;
  const handleLogin = () => {
    let flag = false;
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].name == name && userdata[i].password == password) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      alert('Incorrect Login/Password');
    } else {
      FingerprintScanner.authenticate({
        description: 'For additional security pls scan your fingerprint',
      })
        .then(() => {
          console.log('Authentication Successfull');
          navigation.navigate('Dashboard');
        })
        .catch((error) => {
          console.log('Authentication error is => ', error);
        });
    }
  };
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS == "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View style={{}}>
          <Text style={styles.loginlable}>Login ID</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => onChangeName(text)}
            value={name}
            placeholder="   Login ID"
          />
          <Text style={styles.loginlable}>Password</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => onChangeText(text)}
            value={password}
            placeholder="  Password"
          />
        </View>
        <TouchableOpacity style={{marginBottom: 30}}>
          <Button title="Login" onPress={handleLogin} />
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#4ea8de',
  },
  inputField: {
    backgroundColor: '#edf6f9',
    height: 40,
    top: 10,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  loginform: {
    backgroundColor: 'white',
    width: '90%',
    height: '30%',
    backgroundColor: '#48bfe3',
    minHeight: 300,
    flex: 0.18,
    top: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  loginlable: {
    fontWeight: 'bold',
    top: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
  },
});
