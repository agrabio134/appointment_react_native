import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import CreateUserScreen from "./CreateUserScreen";
import LoginScreen from "./LoginScreen";
import UpdateProfile from "./UpdateProfile";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    // address: "",
    gender: "",
    birthdate: "",
  });

  const handleLoginSuccess = async (userData) => {
    try {
      const db = firebase.firestore();
      const userRef = db.collection("users").doc(userData.uid);
      const userDoc = await userRef.get();
      const user = userDoc.data();
      setUser(user);
      setIsLoggedIn(true);
      setShowModal(false);
      console.log("userData:", user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalType("");
    // handleLogout();
  };

  const handleLoginClick = () => {
    setModalType("login");
    setShowModal(true);
  };

  const handleRegisterClick = () => {
    setModalType("register");
    setShowModal(true);
  };

  const handleUpdateClick = () => {
    setModalType("updateProfile");
    setShowModal(true);
    console.log("update");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {!isLoggedIn && (
          <View style={styles.ProfileFirstContainer}>
            <Image
              source={require("../assets/images/tattoo.png")}
              resizeMode="contain"
              style={styles.profileImage1}
            />
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeMessage}>
                Premier App for Tattoo Enthusiasts!
              </Text>
              <Text style={styles.welcomeSub}>
                Sign in or sign up to schedule appointments with your favorite
                tattoo artist. Our easy-to-use platform makes booking your next
                tattoo session a breeze.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={handleRegisterClick}
              >
                <Text style={styles.buttonRegisterText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={handleLoginClick}
              >
                <Text style={styles.buttonLoginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isLoggedIn && (
          <View style={styles.profileContainer}>
            {user && (
              <>
                          <ScrollView style={styles.scrollView}>

                <Text style={styles.welcomeMessage}>
                <View style={styles.ProfileSecondContainer}>
            <Image
              source={require("../assets/images/logo-icon.png")}
              // resizeMode="contain"
              style={styles.profileImage}
            />
            </View>
                  Welcome, <Text style={styles.fullName}>
                  {user.firstName} {user.lastName}!
                  </Text>
                </Text>
                <TouchableOpacity
                  
                  onPress={handleUpdateClick} 
                >
                  <Text style={styles.updateText}>Edit Profile</Text>
                </TouchableOpacity>


                <View style={styles.profileDetails}>
                  <View style={styles.profileCardContainer}>
                    <Ionicons
                      style={styles.profileCardItem}
                      name={"mail-outline"}
                      size={24}
                      color="#e3c1b4"
                    />
                    <View style={styles.profileCardItem}>
                      <Text style={styles.profileText}>{user.email}</Text>
                    </View>
                  </View>

                  <View style={styles.profileCardContainer}>
                    <Ionicons
                      style={styles.profileCardItem}
                      name={"call-outline"}
                      size={24}
                      color="#e3c1b4"
                    />
                    <View style={styles.profileCardItem}>
                      <Text style={styles.profileText}>
                       {user.contactNumber}
                      </Text>
                    </View>
                  </View>

                 

                  <View style={styles.profileCardContainer}>
                    <Ionicons
                      style={styles.profileCardItem}
                      name={"calendar-outline"}
                      size={24}
                      color="#e3c1b4"
                    />
                    <View style={styles.profileCardItem}>
                  <Text style={styles.profileText}>
                     {user.birthdate}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
                  
                  onPress={handleLogout} 
                >
                  <Text style={styles.LogoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

              </>
            )}
          </View>
        )}
      </View>
      {/* Update */}

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {modalType === "login" ? (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          ) : modalType === "register" ? (
            
            <CreateUserScreen
              onClose={handleModalClose}
              setShowModal={setShowModal}
            />
          ) : modalType === "updateProfile" ? (
            <UpdateProfile
              onClose={handleModalClose}
              setShowModal={setShowModal}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212121",
    width: "100%",
  },

  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },

  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  profileContainer: {
    backgroundColor: "#212121",
    padding: 9,
    // borderRadius: 10,
    // marginBottom: 20,
    // borderWidth: 1,
    // borderColor: "#555",
  },
  // scrollView: {
  //   padding: 10,
   
  // },
  
  ProfileFirstContainer: {
    alignItems: "center",
    width: 300,
  },
  ProfileSecondContainer: {
    alignItems: "center",
    width: 300,
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  
  profileImage1: {
    // marginBottom: 20,
    // width: 100,
  },
  welcomeText: {
    alignItems: "center",
    marginBottom: 60,
    width: 270,
  },
  welcomeMessage: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  fullName: {
    color: "#e3c1b4",
  },
  welcomeSub: {
    color: "#ddd9ce",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  profileDetails: {
    marginBottom: 20,
  },
  profileText: {
    color: "#efece9",
    fontSize: 16,
    // marginBottom: 10,
    // make row
  },
  updateText:{
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    // borderWidth: 3,
    // borderColor: "#853042",
    backgroundColor: "#ac9c8d",
    borderRadius: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 20,
    shadowColor: "#e0e0e0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  LogoutText:{
    color: "#ac9c8d",
    fontSize: 18,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ac9c8d",
    // backgroundColor: "#b82c49",
    borderRadius: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 20,
   
   

  },
  profileCardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 0.5,
    borderColor: "#e3c1b4",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  profileCardItem: {
    // borderWidth: 1,
    // borderColor: "#b82c49",
    marginHorizontal: 15,
    padding: 2,

  },

  logoutButton: {
    backgroundColor: "#fff",
    color: "#212121",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
    marginHorizontal: 20,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00be67",
  },
  registerButton: {
    backgroundColor: "white",
  },
  buttonRegisterText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonLoginText: {
    color: "#e5e5e5",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
