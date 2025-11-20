/**
 * ReadyToTalkScreen
 *
 * GOAL: Prepare the user to begin their voice reflection session.
 * Shows a ready state with the message "I'm ready to talk" indicating
 * the app is prepared to listen to the user's thoughts.
 *
 * Key Features:
 * - "I'm ready to talk" message
 * - Calming gradient background
 * - Option to type instead of speak
 * - Mic button to start recording
 * - Tap to begin recording and transition to Listening state
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReadyToTalkScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#D4C5A9", "#6BA3A0", "#7CB342"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>I'm ready to talk</Text>
        
        {/* Option to type instead */}
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate('ChatInitial')}
        >
          <Text style={styles.typeButtonText}>Or type instead</Text>
        </TouchableOpacity>
      </View>

      {/* Recording Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => navigation.navigate('Listening')}
        >
          <Text style={styles.recordIcon}>🎤</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SinceLastSpoke')}
        >
          <Text style={styles.navText}>Reflect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  typeButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  typeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    padding: 8,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});