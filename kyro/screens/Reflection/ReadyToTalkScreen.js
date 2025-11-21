/**
 * ReadyToTalkScreen
 *
 * Entry point for voice reflection. Shows mic button to start recording
 * and "Can't talk now" option for typing instead.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';

export default function ReadyToTalkScreen({ navigation }) {
  const handleStartRecording = () => {
    navigation.navigate('Listening');
  };

  const handleCantTalk = () => {
    // Navigate to typing screen (same as ListeningScreen which now supports typing)
    navigation.navigate('Listening', { typingMode: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/textures/paper-texture.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={GRADIENTS.primary.colors}
          locations={GRADIENTS.primary.locations}
          style={styles.gradient}
        >
          {/* Grain overlay */}
          <View style={styles.grainOverlay} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Main content */}
          <View style={styles.content}>
            <Text style={styles.title}>I'm ready to talk</Text>
            <Text style={styles.subtitle}>Tap the mic when you're ready</Text>

            {/* Microphone button */}
            <TouchableOpacity
              style={styles.micButton}
              onPress={handleStartRecording}
              activeOpacity={0.8}
            >
              <Text style={styles.micIcon}>🎤</Text>
            </TouchableOpacity>
          </View>

          {/* Can't talk now button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.cantTalkButton}
              onPress={handleCantTalk}
              activeOpacity={0.8}
            >
              <Text style={styles.cantTalkText}>Can't talk now</Text>
            </TouchableOpacity>
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
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: SPACING.lg,
    zIndex: 10,
  },
  backArrow: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.darkBrown,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.darkBrown,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.text.muted,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryTeal,
    borderWidth: 3,
    borderColor: COLORS.darkBrown,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  micIcon: {
    fontSize: 48,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  cantTalkButton: {
    backgroundColor: COLORS.paperBeige,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.darkBrown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cantTalkText: {
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    color: COLORS.darkBrown,
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingBottom: 20,
    backgroundColor: COLORS.sandTan,
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
