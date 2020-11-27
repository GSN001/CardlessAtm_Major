import React, { Component, useState } from "react";
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";

let passmatch = true;

function Register ({ navigation }) {
  const [name, onChangeName] = useState();
  const [password, onChangeText] = useState();
  const [checkPassword, onChangePass] = useState();

  const handleRegister=()=>{
      if(password!== checkPassword || password == null || checkPassword== null){
          alert("Password Dont Match !!!");
          onChangeText("");
          onChangePass("");

      }else if(name == null || name.length < 3){
        alert("Enter a valid Login ID")
      }else{
        let data = {
            name : name,
            password: password
        }
        console.log(data)
        userdata.users.push(data);
        navigation.navigate("Login")
      }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.loginform}>
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

        <Text style={styles.loginlable}>Confirm Password</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => onChangePass(text)}
          value={checkPassword}
          placeholder=" Re-Enter Password"
          
        />
        <Text style={styles.errorMsg}>Passwords donot Match</Text>
        <Button
          title="Register"
          onPress={handleRegister}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default Register;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    height: 40,
    width: "100%",
    // borderColor: "green",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
    top: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg:{
      display:passmatch ? "none": "flex",
  },
  inputField: {
    backgroundColor: "#fff",
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  loginform: {
    backgroundColor: "white",
    width: "90%",
    height: "30%",
    // marginTop: 300,
    flex: 0.4,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-around",
  },
  loginlable: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontSize: 22,
  },
});