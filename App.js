import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import HomeScreen from './components/Home';
import AppointmentScreen from './components/Appointment';
import AboutScreen from './components/About';
import ProfileScreen from './components/Profile';
// import AuthNavigator from './navigation/AuthNavigator';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Add this line


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import the functions you need from the SDKs you need


// const analytics = getAnalytics(app);

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000',
    text: '#fff',
    card: '#121212',
    border: '#928b97',
    
  },
};

const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyBZvgTJK1oQfqzx8m-RD7rLQPx_i__Z6X4",
    authDomain: "tattoo-appointment-254ae.firebaseapp.com",
    databaseURL: "https://tattoo-appointment-254ae-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tattoo-appointment-254ae",
    storageBucket: "tattoo-appointment-254ae.appspot.com",
    messagingSenderId: "279786016572",
    appId: "1:279786016572:web:70c722e708588793a25839",
    measurementId: "G-3CM6F9ZHXL"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); // Initialize the firestore module


const iconColor = "#ddd9ce";

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={iconColor}
                />
              );
            } else if (route.name === 'Appointment') {
              return (
                <Ionicons
                  name={focused ? 'calendar' : 'calendar-outline'}
                  size={size}
                  color={iconColor}
                />
              );
            } else if (route.name === 'About') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={iconColor}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <Ionicons
                  name={focused ? 'person-circle' : 'person-circle-outline'}
                  size={size}
                  color={iconColor}
                />
              );
            } else if (route.name === 'Register') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={iconColor}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Appointment" component={AppointmentScreen}
        


        />

        {/* <Tab.Screen name="Auth" component={AuthNavigator} /> */}
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
