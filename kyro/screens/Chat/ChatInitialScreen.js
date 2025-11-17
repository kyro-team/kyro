/**
 * ChatInitialScreen
 *
 * GOAL: Display the initial state of the chat interface before conversation begins.
 * Shows "Let's chat..." with the AI avatar, ready to start a text-based conversation
 * following the voice reflection session.
 *
 * Key Features:
 * - "Let's chat..." header
 * - AI avatar (blue circle with image)
 * - Empty chat area ready for messages
 * - Text input field at bottom
 * - Microphone option for voice input
 * - Auto-starts conversation or waits for user input
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ChatInitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's chat...</Text>

      <View style={styles.chatArea}>
        {/* AI Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
        </View>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's going on?"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          onFocus={() => navigation.navigate('ChatConversation')}
        />
        <TouchableOpacity style={styles.micButton}>
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CB342',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 24,
    paddingTop: 60,
  },
  chatArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  micButton: {
    marginLeft: 12,
    padding: 8,
  },
  micIcon: {
    fontSize: 24,
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
  navIcon: {
    fontSize: 24,
  },
});
