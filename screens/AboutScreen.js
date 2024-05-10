// AboutScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from './Footer';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.description}>
          This app helps you manage your expenses and budget effectively. Keep track of your spending by
          categorizing your expenses, setting budgets, and visualizing your spending habits.
        </Text>
        <Text style={styles.version}>Version: 1.0.0</Text>
        <Text style={styles.developer}>Developed by [Your Name]</Text>
      </View>
      <Footer selectedTab="About" handleTabPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glassmorphism effect
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  version: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  developer: {
    fontSize: 14,
    color: '#666',
  },
});

export default AboutScreen;
