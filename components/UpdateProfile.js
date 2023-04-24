import React, { useState, useEffect } from "react";
import { View, Alert, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const UpdateProfile = ({ user, setShowModal }) => {
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    gender: "",
    birthdate: "",

  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userId = user.uid;
        const db = firebase.firestore();
        const userRef = db.collection("users").doc(userId);

        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              setUpdatedUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                contactNumber: data.contactNumber,
                gender: data.gender,
                birthdate: data.birthdate,
              });
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        // No user is signed in.
        // You may want to redirect to a login page or handle this in some other way
      }
    });
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      const userId = user.uid;
      const userRef = db.collection("users").doc(userId);

      await userRef.update(updatedUser);
      console.log("User profile updated successfully.");
      Alert.alert("User profile updated successfully.", "", [
        {
          text: "OK",
          onPress: () => {
            setShowModal(false);
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // You may want to show an error message to the user here
    }
  };

  return (
    <View style={styles.container}>
       <Image
          source={require("../assets/images/createAcc.png")}
          resizeMode="contain"
          style={styles.profile}
        />
         <Text style={styles.heading}>Update User</Text>
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={updatedUser.firstName}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, firstName: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={updatedUser.lastName}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, lastName: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={updatedUser.email}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, email: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={updatedUser.contactNumber}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, contactNumber: text })
          }
        />
        {/* 
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={updatedUser.address}
        onChangeText={(text) =>
          setUpdatedUser({ ...updatedUser, address: text })
        }
      /> */}

        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={updatedUser.gender}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, gender: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Birthdate"
          value={updatedUser.birthdate}
          onChangeText={(text) =>
            setUpdatedUser({ ...updatedUser, birthdate: text })
          }
        />
          <View style={styles.buttonUpdate}>

        <Button
          title="Update Profile"
          onPress={handleUpdateProfile}
          color="#b82c49"
        />
        </View>
      </View>
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
  buttonUpdate: {
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

export default UpdateProfile;
