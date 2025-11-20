/**
 * ListeningScreen
 *
 * GOAL: Active recording state that captures the user's voice input.
 * Displays "I'm listening" to indicate the app is actively recording
 * and processing the user's speech in real-time.
 *
 * Key Features:
 * - "I'm listening" message
 * - Audio waveform visualization (animated)
 * - Real-time voice recording
 * - Stop button to end recording
 * - Transitions to Processing screen when stopped
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ListeningScreen({ navigation }) {
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
        <Text style={styles.title}>I'm listening</Text>

        {/* Waveform Visualization Placeholder */}
        <View style={styles.waveformContainer}>
          <View style={styles.waveBar} />
          <View style={[styles.waveBar, styles.waveBarTall]} />
          <View style={styles.waveBar} />
          <View style={[styles.waveBar, styles.waveBarTall]} />
          <View style={styles.waveBar} />
        </View>
      </View>

      {/* Recording Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => navigation.navigate('Processing')}
        >
          <Text style={styles.stopIcon}>⏹</Text>
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
    marginBottom: 48,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  waveBar: {
    width: 4,
    height: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  waveBarTall: {
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  stopButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});