import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joey's Tattooist</Text>
      <Text style={styles.subtitle}>Artist since 90's</Text>
      <Text style={styles.info}>Joey Agrabio is the owner and the shop is located in Barretto, Olongapo City, Del Pilar Street behind Tindahan Ni Juan.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AboutScreen;
