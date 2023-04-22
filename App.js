import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import HomeScreen from './components/Home';
import AppointmentScreen from './components/Appointment';
import AboutScreen from './components/About';
import ProfileScreen from './components/Profile';
// import AuthNavigator from './navigation/AuthNavigator';


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
                  color={color}
                />
              );
            } else if (route.name === 'Appointment') {
              return (
                <Ionicons
                  name={focused ? 'calendar' : 'calendar-outline'}
                  size={size}
                  color={color}
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
                  color={color}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <Ionicons
                  name={focused ? 'person-circle' : 'person-circle-outline'}
                  size={size}
                  color={color}
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
                  color={color}
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
        <Tab.Screen name="Appointment" component={AppointmentScreen} />

        {/* <Tab.Screen name="Auth" component={AuthNavigator} /> */}
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
