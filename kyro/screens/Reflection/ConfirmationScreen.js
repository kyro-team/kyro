/**
 * ConfirmationScreen
 *
 * GOAL: Display the speech-to-text transcription for user confirmation.
 * Shows "You said..." followed by the transcribed text, allowing the user
 * to confirm the accuracy or indicate they want to add more.
 *
 * Key Features:
 * - "You said..." header
 * - User avatar/profile image
 * - Transcribed speech text display
 * - "Anything else you want to talk about?" prompt
 * - YES button - navigate to continue adding more
 * - NO button - finalize and go to Home (done)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConfirmationScreen({ navigation }) {
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

      <Text style={styles.title}>You said...</Text>

      <View style={styles.content}>
        {/* User Avatar Placeholder */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        {/* Transcribed Text Placeholder */}
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptText}>
            [Transcribed speech will appear here]
          </Text>
        </View>
      </View>

      {/* Confirmation Prompt */}
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>
          Anything else you want to talk about?
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.yesButton}
            onPress={() => navigation.navigate('ReadyToTalk')}
          >
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
        {/* Optional: Add text option */}
        <TouchableOpacity
          style={styles.typeOptionButton}
          onPress={() => navigation.navigate('ChatInitial')}
        >
          <Text style={styles.typeOptionText}>Or add more by typing</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 48,
  },
  transcriptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  transcriptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  promptContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  yesButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  noButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  typeOptionButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  typeOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.7,
    textDecorationLine: 'underline',
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