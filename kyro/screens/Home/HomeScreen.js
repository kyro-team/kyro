/**
 * HomeScreen
 *
 * GOAL: Display the main dashboard after login with personalized greeting and recent activities.
 * Shows the user's name, time-based greeting, and a summary of recent events/memories.
 * Provides quick access to start a reflection session.
 *
 * Key Features:
 * - Personalized greeting ("Hello Gabriella")
 * - Time-aware message (e.g., "pretty calm morning today")
 * - Recent activities/events list (Breakfast at Juliet, Farmers market, etc.)
 * - "Do you want to reflect on your week?" prompt
 * - "Let's talk" CTA button to start reflection
 * - Bottom navigation (Reflect, Chat, Share icons)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hello Gabriella,</Text>
        <Text style={styles.subtitle}>Looks like you have a pretty calm morning today.</Text>

        {/* Recent Activities */}
        <View style={styles.activitiesContainer}>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Breakfast at Juliet</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Don't need to stop with the Farmers market</Text>
          </View>
        </View>

        {/* Reflection Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Do you want to reflect on your week?</Text>
          <TouchableOpacity
            style={styles.talkButton}
            onPress={() => navigation.navigate('SinceLastSpoke')}
          >
            <Text style={styles.talkButtonText}>Let's talk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📤</Text>
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
  content: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 24,
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  talkButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  talkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
  navIcon: {
    fontSize: 24,
  },
});
