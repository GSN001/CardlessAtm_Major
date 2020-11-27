import React from 'react'
import 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ImageBackground,
    TextInput,
    Button,
    TouchableOpacity,
    TouchableOpacityBase
  } from "react-native";

const Landing = ({navigation}) => {
    return (
        <ImageBackground
        style={styles.container}
        source={require("../assets/logo.png")
      }
      >
        <View style={{flex:1, justifyContent:"flex-end"}}>
        <Text style={styles.textStyle1}>Already registered? Continue to QR Code scan</Text>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("qrCode")}>
         
            <Text style={styles.textStyle}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>
        </View>

      </ImageBackground>
    )
}

export default Landing;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        resizeMode:"cover"
    },
    button1: {
        backgroundColor: "#56cfe1",
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      },
      button2: {
        backgroundColor: "#80ffdb",
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      },
      textStyle:{
          fontSize:28,
          fontWeight: "bold"
      },
      textStyle1:{
        fontSize:18,
        fontWeight: "bold",
        color:"#AAAFB4",
        alignSelf:"center"
    }
    
});