import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const AppointmentLogsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const userEmail = user.email;

    const appointmentRef = db
      .collection("appointment")
      .where("email", "==", userEmail);
    appointmentRef.onSnapshot((querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        appointments.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          selectedDate: data.selectedDate,
          status: data.status,
          time: data.time,
        });
      });
      console.log(userEmail);
      console.log(appointments);
      setAppointments(appointments);
    });
  }, []);

  const renderAppointment = ({ item }) => {
    return (
      <View>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            {/* <Text style={styles.data}>{item.name}</Text> */}
            {/* <Text style={styles.data}>{item.email}</Text> */}
            {/* <Text style={styles.data}>{item.contactNumber}</Text> */}
            <Text style={styles.data}>{item.time}</Text>
            <Text style={styles.data}>{item.selectedDate}</Text>
            <Text style={styles.data}>{item.status}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
          color: "white",
        }}
      >
        Appointment Logs
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingVertical: 5,
        }}
      >
        {/* <Text style={styles.header}>Name</Text> */}
        {/* <Text style={styles.header}>Email</Text> */}
        {/* <Text style={styles.header}>Contact Number</Text> */}
        <Text style={styles.header}>Time</Text>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>Status</Text>
      </View>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
  },
  data: {
    flex: 1,
    color: "white",
  },
});

export default AppointmentLogsScreen;
