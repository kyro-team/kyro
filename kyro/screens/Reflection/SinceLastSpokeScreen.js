/**
 * SinceLastSpokeScreen
 *
 * GOAL: Show a timeline summary of events since the user's last reflection session.
 * Provides context for the upcoming conversation by reminding the user of recent
 * activities and experiences that could be discussed.
 *
 * Key Features:
 * - "Since we last spoke," header
 * - Chronological list of recent events/activities:
 *   - "You went to the park with Jamie"
 *   - "You finished your major design critique"
 *   - "You went to Sam's spoken word performance"
 *   - "You started listening to Lizzy McAlpine"
 * - Media playback controls (play, pause, skip)
 * - Navigation to start recording
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SinceLastSpokeScreen({ navigation }) {
  const recentEvents = [
    'You went to the park with Jamie.',
    'You finished your major design critique.',
    "You went to Sam's spoken word performance.",
    'You started listening to Lizzy McAlpine.',
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Since we last spoke,</Text>

      <ScrollView style={styles.eventsList}>
        {recentEvents.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <View style={styles.eventDot} />
            <Text style={styles.eventText}>{event}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Playback Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('ReadyToTalk')}
        >
          <Text style={styles.playIcon}>▶</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    marginTop: 6,
  },
  eventText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
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
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  playIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
