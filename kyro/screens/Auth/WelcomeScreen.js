/**
 * WelcomeScreen
 *
 * GOAL: Display the initial splash/welcome screen when users open the app.
 * Shows the KYRO branding with a gradient background and welcomes returning users.
 * This is the entry point of the app that transitions to the Home screen.
 *
 * Key Features:
 * - KYRO logo/branding display
 * - "Welcome back to KYRO" greeting
 * - Gradient background (green to teal)
 * - Auto-transition or tap to continue to Home
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back to</Text>
      <Text style={styles.logo}>KYRO</Text>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CB342', // Placeholder - should be gradient
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  continueButton: {
    marginTop: 40,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
