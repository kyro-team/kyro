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
 * - Media controls (play/record button to start)
 * - Tap to begin recording and transition to Listening state
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ReadyToTalkScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>I'm ready to talk</Text>
      </View>

      {/* Recording Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => navigation.navigate('Listening')}
        >
          <Text style={styles.recordIcon}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CB342',
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
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  controlButton: {
    padding: 12,
  },
  controlIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  recordIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
