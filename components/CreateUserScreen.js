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
    const data = {
      fname: firstName,
      lname: lastName,
      contact_number: contactNumber,
      gender,
      birthdate,
      email,
      password,
    };

    console.log(JSON.stringify(data));


    try {
      const response = await fetch(
        'https://tattoobookingsystem.000webhostapp.com/appointment_api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);

      setMessage('User created successfully');
      setFirstName('');
      setLastName('');
      setContactNumber('');
      setGender('');
      setBirthdate('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      swal({
        title: 'Error',
        text: 'There was a problem creating the user',
        icon: 'error',
      });
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
           <DatePicker
  style={[styles.date, { zIndex: 100 }]}
  date={birthdate}
  mode="date"
  format="MM/DD/YYYY"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  onDateChange={date => setBirthdate(date)}
/>

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
