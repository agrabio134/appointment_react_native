import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZvgTJK1oQfqzx8m-RD7rLQPx_i__Z6X4",
  authDomain: "tattoo-appointment-254ae.firebaseapp.com",
  databaseURL:
    "https://tattoo-appointment-254ae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tattoo-appointment-254ae",
  storageBucket: "tattoo-appointment-254ae.appspot.com",
  messagingSenderId: "279786016572",
  appId: "1:279786016572:web:70c722e708588793a25839",
  measurementId: "G-3CM6F9ZHXL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // login user
      const auth = firebase.auth();
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      onLoginSuccess(userCredential.user);
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    }
  };
  return (
    <View style={styles.logContainer}>
      <Image
        source={require("../assets/images/logo-icon.png")}
        resizeMode="contain"
        style={styles.profile}
      />
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#a3a3a3"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#a3a3a3"
      />
      {/* remember me button */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
      

        <View style={{ flex: 1 }}> 
          <Text style={{ color: "#fff", textAlign: "right" }} >Forgot password?</Text>
        </View>
      </View>
     
     <View style={styles.buttonLogin}>
      <Button title="Login" onPress={handleLogin}
      color="#00be67"
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  input: {
    color: "#fff",
    height: 40,
    width: 230,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  profile: {
    width: 200,
    height: 300,
    alignSelf: "center",
  },
  buttonLogin: {
    width: 230,
    height: 40,
    alignSelf: "center",
    marginTop: 16,
  },
});

export default LoginScreen;
