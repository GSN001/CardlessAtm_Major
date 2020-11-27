import React, { useState } from "react";
import 'react-native-gesture-handler';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

let code =1;
const Dashboard = () => {
  const [cardNo, onChangeCardNo] = useState(null);
  const [pin, onChangepin] = useState(null);
  const [amount, onChangeamount] = useState(null);
  const [msg, setMsg] = useState("");
  const [process, onChangeprocess] = useState(0);
  // const [code, setCode] = useState(1);

  const getProcess = (process) => {
    switch (process) {
      case 0:
        return (
          <View style={styles.loginform}>
            <Text style={styles.loginlable}>Enter Your 16 digit card no.</Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => onChangeCardNo(text)}
              value={cardNo}
              placeholder="  Card Number"
            />
            <TouchableOpacity style={{ marginBottom: 30 }}>
              <Button
                title="Next"
                onPress={() => {
                  if (cardNo.length < 5 || cardNo.length > 16) {
                    alert("Card no must be of 16 digits");
                    onChangeCardNo(null);
                  } else {
                    onChangeprocess(process + 1);
                  }
                }}
              />
            </TouchableOpacity>
          </View>
        );
        break;
      case 1:
        return (
          <View style={styles.loginform}>
            <Text style={styles.loginlable}>Enter your 4 digit pin </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => onChangepin(text)}
              value={pin}
              placeholder="  Enter Pin"
            />
            <TouchableOpacity style={{ marginBottom: 30 }}>
              <Button
                title="Next"
                onPress={() => {
                    if (pin.length < 4 || pin.length > 4) {
                      alert("Pin no must be of 4 digits");
                      onChangepin(null);
                    } else {
                      onChangeprocess(process + 1);
                    }
                  }}
              />
            </TouchableOpacity>
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.loginform}>
            <Text style={styles.loginlable}>Enter Amount to be withdrawn </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => onChangeamount(text)}
              value={amount}
              placeholder="  Enter Amount"
            />
            <TouchableOpacity style={{ marginBottom: 30 }}>
              <Button
                title="Next"
                onPress={() => onChangeprocess(process + 1)}
              />
            </TouchableOpacity>
          </View>
        );
        break;
      case 3:
        return (
          <View style={styles.loginform}>
            <Text style={styles.loginlable}>Card no. {cardNo}</Text>
            <Text style={styles.loginlable}>Amount : {amount}</Text>
            <Text style={styles.responseMsg} >{msg}  </Text>
            <TouchableOpacity style={{ marginBottom: 30 }}>
              <Button
                title="Confirm"
                onPress={() => sendData()}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 30 }}>
              <Button title="Edit" onPress={() => onChangeprocess(0)} />
            </TouchableOpacity>
       
          </View>
        );
        break;
      default:
        return <Text>Ye kaisa case aa gya {process}</Text>;
    }
  };

  

  const sendData = async () => {
    console.log("PAisa kat iska");
    // setCode(2);
    // code = 3;
    // setMsg("Error msg kaam kar raha hai");
    // alert("success");
  fetch(`http://10.10.10.1/feed?card=${cardNo}&amount=${amount}&pin=${pin}`, {
         method: 'POST'
      }).then((res)=>res.text())
      .then((response) => {
        console.log(response);
        alert(response);
        let code = Number(response.substring(0,1));
        if(code == 1 ){
          setMsg("Transaction Success!!");

        }else if(code ==2 ){
          alert("Available balance :  ",response.substring(2,response.length));
          setMsg("Withdrawal Amount exceed balance. Gareeb sala");

        }else if(code == 3 ){
          setMsg("Invalid Credentials");
          onChangeprocess(0);
        }
      })
      .catch((error) => {
         console.error(error);
      })
  
}  

  return (
    <View style={styles.container}>
      {/* <Text>Dashboard Component {process}</Text> */}
      {/* {console.log(getProcess(process))} */}
      <View>{getProcess(process)}</View>
      {/* <Button title="Click me" onPress={sendData} /> */}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //   alignItems: "center",
    backgroundColor: "#4ea8de",
  },
  inputField: {
    backgroundColor: "#edf6f9",
    height: 40,
    top: 10,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginform: {
    width: "100%",
    height: "30%",
    backgroundColor: "#48bfe3",
    minHeight: 300,
    flex: 0.18,
    top: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    borderRadius: 20,
  },
  loginlable: {
    fontWeight: "bold",
    top: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
  },
  responseMsg:{
    fontWeight: "bold",
    top: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    color: code>1 ? "red" : "green"
  }
});