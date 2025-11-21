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
import { PaperBackground } from '../../theme/components';
import { COLORS, SPACING, FONT_SIZES } from '../../theme';

export default function SinceLastSpokeScreen({ navigation }) {
  const recentEvents = [
    'You went to the park with Jamie.',
    'You finished your major design critique.',
    "You went to Sam's spoken word performance.",
    'You started listening to Lizzy McAlpine.',
  ];

  return (
    <PaperBackground>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Since we last spoke,</Text>

        <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
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
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SinceLastSpoke')}
        >
          <View style={styles.navIcon} />
          <Text style={styles.navText}>REFLECT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.navIcon, styles.navIconSquare]} />
          <Text style={styles.navText}>PLAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <View style={styles.navIconHead} />
            <View style={styles.navIconBody} />
          </View>
          <Text style={styles.navText}>LEARN</Text>
        </TouchableOpacity>
      </View>
    </PaperBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  backButton: {
    marginBottom: SPACING.lg,
  },
  backArrow: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.darkBrown,
  },
  title: {
    fontSize: FONT_SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.darkBrown,
    marginBottom: SPACING.xl,
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryTeal,
    marginRight: SPACING.md - 4,
    marginTop: 6,
  },
  eventText: {
    flex: 1,
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    lineHeight: 22,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryTeal,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    fontSize: FONT_SIZES.h2,
  },
  // BOTTOM NAVIGATION
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 20,
    backgroundColor: COLORS.sandTan,
    borderTopWidth: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.darkerBrown,
    marginBottom: 8,
  },
  navIconSquare: {
    borderRadius: 2,
    backgroundColor: 'transparent',
    borderWidth: 2.5,
    borderColor: COLORS.darkerBrown,
  },
  navIconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  navIconHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.darkerBrown,
    marginBottom: 1,
  },
  navIconBody: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.darkerBrown,
  },
  navText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.tiny,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});