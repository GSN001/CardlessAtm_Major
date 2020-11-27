import 'react-native-gesture-handler';
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Register from "./components/Register";
import WifiTest from "./components/restWifi";
import ScanScreen from './components/ScanScreen';
import Face from './components/Face';
import BiometricPopup from './components/BiometricPopup';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Face">
      <Stack.Screen name="fingerprint" component={BiometricPopup}/>
      <Stack.Screen name="Face" component={Face}/>
      <Stack.Screen name="qrCode" component={ScanScreen} />
      <Stack.Screen name="wifi" component={WifiTest} />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            title: "Cardless ATM",
            headerStyle: {
              backgroundColor: "#4ea8de",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="Login" component={Login} options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#4ea8de",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
