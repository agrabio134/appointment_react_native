import { StyleSheet } from "react-native";



const AppointmentStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#222'
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff'
    },
    input: {
      width: '97%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      color: '#fff',
  
    },
    calendar: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      width: 350,
      height: 370,
    }
    
  });

  export default AppointmentStyles;