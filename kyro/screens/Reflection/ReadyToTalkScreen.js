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
import { PaperBackground } from '../../theme/components';
import { COLORS, SPACING, FONT_SIZES } from '../../theme';

export default function ReadyToTalkScreen({ navigation }) {
  return (
    <PaperBackground>
      <View style={styles.container}>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.darkBrown,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  typeButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 20,
  },
  typeButtonText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.small,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryTeal,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIcon: {
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