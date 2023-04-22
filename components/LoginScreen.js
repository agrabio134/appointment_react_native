import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {
      // login user
      const auth = firebase.auth();
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      onLoginSuccess(userCredential.user);
      
      

       
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    }
  };
  return (
    <View style={styles.logContainer}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
backgroundColor: "#fff",
},
heading: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 16,
},
input: {
borderWidth: 1,
borderColor: "#ccc",
padding: 8,
marginBottom: 16,
},
});

export default LoginScreen;
