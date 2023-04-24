import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Button,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import AppointmentLogsScreen from "./AppointmentLogScreen";

import AppointmentStyles from "./Styles/AppointmentStyles";

import { TimePicker } from "react-native-simple-time-picker";

// refresh page everytime i click on appointment

const AppointmentScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [isAmpm, setIsAmpm] = useState();

  const handleChange = (value) => {
    // add 00 if minutes is less than 10

    // set toString to add 0 if minutes is less than 10
    // setHours(value.hours.toString());
    // set default minutes to 00
  




    setHours(value.hours.toString());
    setMinutes(value.minutes.toString());

    // auto add 0 if minutes is less than 10
    if (value.minutes < 10) {
      setMinutes("0" + value.minutes.toString());
    }


    setIsAmpm(value.isAm ? "AM" : "PM");

    console.log(value);
  };

  // const [name, setName] = useState( 'Harvs Agrabio ');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({ [day.dateString]: { selected: true } });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userId = user.uid;
        const db = firebase.firestore();
        const userRef = db.collection("users").doc(userId);

        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              setName({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                contactNumber: data.contactNumber,
              });
              setEmail({
                email: data.email,
              });
              setContactNumber({
                contactNumber: data.contactNumber,
              });

              console.log("data:", doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        Alert.alert("Please login first.");
        navigation.navigate("Profile");
      }
    });
  }, [submitted]);

  const handleModalClose = () => {
    setShowModal(false);
    setModalType("");
    // handleLogout();
  };

  const handleAppointmentClick = () => {
    setModalType("Appointment");
    setShowModal(true);
  };

  const handleSubmit = () => {
    // add confirmation if user wants to book appointment
    Alert.alert(
      "Book Appointment",
      "Are you sure you want to book an appointment?",
      [
        { text: "Yes", onPress: () => handleBookAppointment() },
        { text: "No", onPress: () => console.log("No Pressed") },
      ]
    );
  };

  const handleBookAppointment = () => {
    setSubmitted(true);

    try {
      const db = firebase.firestore();

      const uniqueId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      const appointmentRef = doc(db, "appointment", uniqueId);
      setDoc(
        appointmentRef,
        {
          name: name.firstName + " " + name.lastName,
          email: email.email,
          contactNumber: contactNumber.contactNumber,
          selectedDate: selectedDate,
          time: hours + ":" + minutes + " " + isAmpm,
          status: "Pending",
        },
        { merge: true }
      );

      setName("");
      setEmail("");
      setContactNumber("");
      setSelectedDate("");
      setMarkedDates({});
      setHours(0);
      setMinutes(0);

      Alert.alert(
        "Appointment Booked!",
        selectedDate + " " + name.firstName + " " + name.lastName + " Time " + hours + ":" + minutes + " " + isAmpm
      );
      // navigation.navigate("Appointment");
      // refresh page
    } catch (error) {
      console.log(error);
      Alert.alert("Please login first.");
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.AppointmentContainer}>

    <ScrollView style={styles.scrollView}>

    <View style={AppointmentStyles.container}>
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
          {modalType === "Appointment" ? <AppointmentLogsScreen /> : null}
        </View>
      </Modal>

      <Text style={AppointmentStyles.heading}>Book an Appointment</Text>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleAppointmentClick}
      >
        <Text style={styles.buttonAppointmentText}>View Appointment Logs</Text>
      </TouchableOpacity>
      <Text style={AppointmentStyles.input}>
        {name.firstName} {name.lastName}
      </Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={AppointmentStyles.calendar}
        theme={{
          calendarBackground: "#222",
          textSectionTitleColor: "#fff",
          textSectionTitleDisabledColor: "#ccc",
          selectedDayBackgroundColor: "#e3c1b4",
          selectedDayTextColor: "#fff",
          todayTextColor: "#e3c1b4",
          dayTextColor: "#fff",
          textDisabledColor: "#ccc",
          dotColor: "#e3c1b4",
          selectedDotColor: "#e3c1b4",
          arrowColor: "#e3c1b4",
          disabledArrowColor: "#ccc",
          monthTextColor: "#fff",
          indicatorColor: "#e3c1b4",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "400",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "400",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
    
      />
      {/* add time  */}

      <TimePicker
        value={{ hours, minutes }}
        onChange={handleChange}
        isAmpm
        style={styles.timeContainer}
        // color="#610c27"
      />

      <Button
        title="Book Appointment"
        onPress={handleSubmit}
        disabled={!selectedDate}
        color="#610c27"
      />
     
    </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    // backgroundColor: ''

  },
  timeContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
   
  },
  AppointmentContainer:{
    flex: 1,
    backgroundColor: '#222',
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

    backgroundColor: "#212121",
    width: "100%",
    padding: 10,
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
  
  fullName: {
    color: "#efece9",
  },
  welcomeSub: {
    color: "#b7b7b7",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  profileDetails: {
    marginBottom: 20,
  },
  profileText: {
    color: "#fff",
    fontSize: 16,
    // marginBottom: 10,
    // make row
  },
  updateText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    // borderWidth: 3,
    // borderColor: "#853042",
    backgroundColor: "#b82c49",
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

  button: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#610c27",
  },
  
  buttonRegisterText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAppointmentText: {
    color: "#e5e5e5",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppointmentScreen;
