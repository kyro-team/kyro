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
    // Navigate to Wizard-of-Oz simulated listening
    navigation.navigate('WoZListening');
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
});
