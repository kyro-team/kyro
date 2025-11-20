/**
 * ChatSummaryScreen
 *
 * GOAL: Display a summary of the conversation with action options.
 * Shows the final state of the chat with the AI's concluding response
 * and provides options to save, continue, or end the session.
 *
 * Key Features:
 * - Complete conversation history
 * - AI's summarizing/concluding response
 * - "Yes, let's log this" button to save the reflection
 * - Option to continue conversation
 * - Option to return to home
 * - Timestamp of conversation
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatSummaryScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#D4C5A9", "#6BA3A0", "#7CB342"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <Text style={styles.title}>Let's chat...</Text>

      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {/* AI Question */}
        <View style={[styles.messageBubble, styles.aiBubble]}>
          <Text style={styles.messageText}>How was the park with Jamie?</Text>
        </View>

        {/* User Response */}
        <View style={[styles.messageBubble, styles.userBubble]}>
          <Text style={styles.messageText}>
            I really enjoyed getting to spend one on one time together. We talked forever
            about everything, and I'm just so glad we could explore the city together.
          </Text>
        </View>

        {/* AI Summary Response */}
        <View style={[styles.messageBubble, styles.aiBubble]}>
          <Text style={styles.messageText}>
            That's so lovely to hear! Is there anything else you want to add?
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.logButtonText}>Yes, let's log this</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 24,
    paddingTop: 60,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  aiBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2E7D32',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  actionContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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