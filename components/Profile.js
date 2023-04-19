import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CreateUserScreen from './CreateUserScreen';
import LoginScreen from './LoginScreen';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleLoginSuccess = async (userData) => {
    console.log('userData:', userData);
    setIsLoggedIn(true);
    setShowModal(false);
    setUser(userData);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalType('');
    handleLogout();
  };

  const handleLoginClick = () => {
    setModalType('login');
    setShowModal(true);
  };

  const handleRegisterClick = () => {
    setModalType('register');
    setShowModal(true);
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
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLoginClick} />
            <Button title="Register" onPress={handleRegisterClick} />
          </View>
        )}
        {isLoggedIn && (
          <View style={styles.profileContainer}>
            {user && (
              <>
                <Text style={styles.welcomeMessage}>
                  Welcome, {user.first_name} {user.last_name}!
                </Text>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileText}>Email: {user.email}</Text>
                  <Text style={styles.profileText}>
                    Phone: {user.contact_number}
                  </Text>
                  <Text style={styles.profileText}>Address: {user.email}</Text>
                  <Text style={styles.profileText}>Gender: {user.gender}</Text>
                  <Text style={styles.profileText}>
                    Birthday: {user.birthdate}
                  </Text>
                </View>
                <Button
                  title="Logout"
                  onPress={handleLogout}
                  style={styles.logoutButton}
                />
              </>
            )}
          </View>
        )}
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {modalType === 'login' ? (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          ) : modalType === 'register' ? (
            <CreateUserScreen onClose={handleModalClose} />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 20,
  //   width: '100%',
  //   paddingHorizontal: 20,
  // },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },

  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  profileContainer: {
    backgroundColor: '#212121',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeMessage: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileDetails: {
    marginBottom: 10,
  },
  profileText: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#fff',
    color: '#212121',
  },
});

export default ProfileScreen;
