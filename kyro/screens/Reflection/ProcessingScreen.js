/**
 * ProcessingScreen
 *
 * GOAL: Show a thinking/processing state while the app analyzes the user's input.
 * Displays "Interesting..." to indicate the AI is considering and processing
 * what the user said before generating a response.
 *
 * Key Features:
 * - "Interesting..." message
 * - Loading/thinking animation
 * - Auto-transitions to ConfirmationScreen when processing complete
 * - Calming background to reduce anxiety during wait
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PaperBackground } from '../../theme/components';
import { COLORS, SPACING, FONT_SIZES } from '../../theme';

export default function ProcessingScreen({ navigation }) {
  useEffect(() => {
    // Simulate processing time, then navigate to confirmation
    const timer = setTimeout(() => {
      navigation.navigate('Confirmation');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <PaperBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Interesting...</Text>
          <ActivityIndicator size="large" color={COLORS.primaryTeal} style={styles.loader} />
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
    marginBottom: SPACING.xl,
  },
  loader: {
    marginTop: SPACING.md,
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