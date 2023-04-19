import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password', [{ text: 'OK' }]);
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post('https://tattoobookingsystem.000webhostapp.com/appointment_api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = response.data;

      if (responseData.status.remarks === 'success') {
        Alert.alert('Success', 'Login Successfully', [{ text: 'OK' }]);
        setEmail('');
        setPassword('');

        console.log(responseData.payload);
        onLoginSuccess(responseData.payload);
      } else {
        Alert.alert('Error', 'Invalid email and password', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      Alert.alert('Error', 'Please enter email and password', [{ text: 'OK' }]);
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