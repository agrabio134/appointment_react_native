import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  // Picker,
} from "react-native";
// import DatePicker from "react-native-datepicker";
import auth from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import firebase from "firebase/compat/app";

import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBZvgTJK1oQfqzx8m-RD7rLQPx_i__Z6X4",
  authDomain: "tattoo-appointment-254ae.firebaseapp.com",
  databaseURL:
    "https://tattoo-appointment-254ae-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tattoo-appointment-254ae",
  storageBucket: "tattoo-appointment-254ae.appspot.com",
  messagingSenderId: "279786016572",
  appId: "1:279786016572:web:70c722e708588793a25839",
  measurementId: "G-3CM6F9ZHXL",
});

// Access the Firestore database
// const db = firebase.firestore();
const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const CreateUserScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleCreateUser = async () => {
    // add form validation
    if (!firstName || !lastName || !contactNumber || !email || !password) {
      setMessage("Please fill in all fields!");
      return;
    }

    try {
      const auth = firebase.auth();

      const db = getFirestore();
      // const user = await auth.createUserWithEmailAndPassword(email, password);
      const user = await auth.createUserWithEmailAndPassword(email, password);

      // insert data into firestore
      const docRef = await setDoc(doc(db, "users", user.user.uid), {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        gender: gender,
        contactNumber: contactNumber,
      });
      // create user

      setMessage("User account created successfully!");
      Alert.alert("User account created successfully", "", [
        {
          text: "OK",
          onPress: () => {
            setShowModal(false);
          },
        },
      ]);

      console.log("User account created successfully!");
      // RESFRESH THE PAGE
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={require("../assets/images/logo-icon.png")}
          resizeMode="contain"
          style={styles.profile}
        />
        <View style={styles.Inputcontainer}>
          <Text style={styles.heading}>Create User</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#a3a3a3"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor="#a3a3a3"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholderTextColor="#a3a3a3"
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
                  placeholderTextColor="#a3a3a3"
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
                <TextInput
                  style={styles.input}
                  placeholder="Birthdate"
                  value={birthdate}
                  onChangeText={setBirthdate}
                  placeholderTextColor="#a3a3a3"
                />
              </View>
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#a3a3a3"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#a3a3a3"
              />
            </View>
          </View>
          <View style={styles.buttonCreate}>
            <Button
              title="Create User"
              onPress={handleCreateUser}
              color="#b82c49"
            />
          </View>
        </View>
        {message !== "" && <Text>{message}</Text>}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Inputcontainer: {
    flex: 1,
    // width: "100%",
    alignItems: "center",
  },
  scrollView: {
    // width: 350,

    paddingHorizontal: 0,
    paddingBottom: 40,
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
    width: 300,
    height: 230,
    alignSelf: "center",

    // borderWidth: 1,
    // borderColor: "#ccc",
  },
  buttonCreate: {
    width: 230,
    height: 40,
    alignSelf: "center",
    marginTop: 16,
  },
  row: {},
  column: {},

  date: {
    marginBottom: 8,
  },
 
});

export default CreateUserScreen;
