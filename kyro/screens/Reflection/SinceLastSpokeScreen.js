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
 * - Mic button to start recording
 * - Navigation to start recording
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SinceLastSpokeScreen({ navigation }) {
  const recentEvents = [
    'You went to the park with Jamie.',
    'You finished your major design critique.',
    "You went to Sam's spoken word performance.",
    'You started listening to Lizzy McAlpine.',
  ];

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

      <Text style={styles.title}>Since we last spoke,</Text>

      <ScrollView style={styles.eventsList}>
        {recentEvents.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <View style={styles.eventDot} />
            <Text style={styles.eventText}>{event}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Recording Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => navigation.navigate('ReadyToTalk')}
        >
          <Text style={styles.micIcon}>🎤</Text>
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
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
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