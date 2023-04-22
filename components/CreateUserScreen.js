import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  // Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import auth from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import firebase from "firebase/compat/app";

import 'firebase/firestore';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBZvgTJK1oQfqzx8m-RD7rLQPx_i__Z6X4",
  authDomain: "tattoo-appointment-254ae.firebaseapp.com",
  databaseURL: "https://tattoo-appointment-254ae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tattoo-appointment-254ae",
  storageBucket: "tattoo-appointment-254ae.appspot.com",
  messagingSenderId: "279786016572",
  appId: "1:279786016572:web:70c722e708588793a25839",
  measurementId: "G-3CM6F9ZHXL"

 
});

// Access the Firestore database
// const db = firebase.firestore();
const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const CreateUserScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  
  const handleCreateUser = async () => {

    // add form validation
    if (!firstName || !lastName || !contactNumber || !email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }

    try {

      const auth = firebase.auth();

      const db = getFirestore();
      // insert data into firestore
      const docRef = await setDoc(doc(db, "users", auth.currentUser.uid
      ), {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        gender: gender,
        contactNumber: contactNumber
        
      });
      // create user





      


      
     
      const user = await auth.createUserWithEmailAndPassword(email, password);
      

      setMessage('User account created successfully!');

      
     
      


      console.log('User account created successfully!');
    } catch (error) {
      setMessage(error.message);
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create User</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Select Gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>
          {/* <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            style={styles.input}>
            <Picker.Item label="Select Gender" value="" />
            {genders.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker> */}
        </View>
        <View style={styles.column}>
          <View style={styles.column}>
            <TextInput style={styles.input} placeholder="Birthdate" value={birthdate} onChangeText={setBirthdate} />

           
          </View>
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <Button title="Create User" onPress={handleCreateUser} />
      {message !== '' && <Text>{message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {},
  column: {},

  date:{
     marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 60,
    paddingTop: 8,
    paddingBottom: 8,
    
    marginBottom: 10,
  },
});

export default CreateUserScreen;
