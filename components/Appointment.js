import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

import AppointmentStyles from "./Styles/AppointmentStyles";



const AppointmentScreen = () => {
  const [name, setName] = useState( 'Harvs Agrabio ');
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setMarkedDates({ [day.dateString]: { selected: true } });
  };

  const handleSubmit = () => {
    if (name && selectedDate) {
      const data = new FormData();
      data.append('name', name);
      data.append('date', selectedDate);
  
      fetch('/api/bookAppointment', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert(`Appointment booked for ${name} on ${selectedDate}`);
          } else {
            alert('An error occurred. Please try again.');
          }
        })
        .catch((error) => {
          alert('An error occurred. Please try again.');
          console.error(error);
        });
    }
  };
  

  return (
    <View style={AppointmentStyles.container}>
      <Text style={AppointmentStyles.heading}>Book an Appointment</Text>
      <TextInput
        style={AppointmentStyles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#c4c4c4"
      />
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={AppointmentStyles.calendar}
        theme={{
          calendarBackground: '#222',
          textSectionTitleColor: '#fff',
          textSectionTitleDisabledColor: '#ccc',
          selectedDayBackgroundColor: '#E06C75',
          selectedDayTextColor: '#fff',
          todayTextColor: '#E06C75',
          dayTextColor: '#fff',
          textDisabledColor: '#ccc',
          dotColor: '#E06C75',
          selectedDotColor: '#fff',
          arrowColor: '#E06C75',
          disabledArrowColor: '#ccc',
          monthTextColor: '#fff',
          indicatorColor: '#E06C75',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '400',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
      <Button
        title="Book Appointment"
        onPress={handleSubmit}
        disabled={!selectedDate}
        color="#E06C75"
      />
    </View>
  );
};

export default AppointmentScreen;
