/**
 * UserSaidScreen (Wizard-of-Oz)
 *
 * Displays the simulated voice transcript before processing.
 * This screen shows what the "AI heard" (actually a fake transcript).
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';

export default function UserSaidScreen({ navigation, route }) {
  const transcript = route?.params?.transcript || 'No transcript available.';

  const handleContinue = () => {
    // Pass transcript to Processing, then Summary
    navigation.navigate('Processing', { transcript });
  };

  const handleBack = () => {
    navigation.goBack();
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
          <View style={styles.grainOverlay} />

          {/* Back button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Main content */}
          <View style={styles.content}>
            <Text style={styles.title}>You said...</Text>

            {/* Transcript Display */}
            <View style={styles.transcriptCard}>
              <Text style={styles.transcriptText}>"{transcript}"</Text>
            </View>

            <Text style={styles.subtitle}>Is this right?</Text>
          </View>

          {/* Continue button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.darkBrown,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  transcriptCard: {
    backgroundColor: COLORS.paperBeige,
    borderRadius: 24,
    padding: SPACING.xl,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: SPACING.lg,
  },
  transcriptText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text.muted,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  continueButton: {
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    color: COLORS.darkBrown,
  },
});
