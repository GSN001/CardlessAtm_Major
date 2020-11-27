import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Register from './components/Register';

import ScanScreen from './components/ScanScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            title: 'Cardless ATM',
            headerStyle: {
              backgroundColor: '#4ea8de',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="qrCode"
          component={ScanScreen}
          options={{
            title: 'QR Code Scan',
            headerStyle: {
              backgroundColor: '#4ea8de',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#4ea8de',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        {/* <Stack.Screen name="fingerprint" component={BiometricPopup} /> */}

        {/* <Stack.Screen name="wifi" component={WifiTest} /> */}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Withdrawal',
            headerStyle: {
              backgroundColor: '#4ea8de',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
