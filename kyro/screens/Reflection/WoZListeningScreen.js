/**
 * WoZListeningScreen (Wizard-of-Oz)
 *
 * Simulates "listening" for voice input.
 * NO real speech recognition - auto-navigates after delay.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';
import { getSimulatedTranscript, WOZ_CONFIG } from '../../src/services/wizardOfOz';

export default function WoZListeningScreen({ navigation }) {
  const [isListening, setIsListening] = useState(true);

  // Animation for waveform
  const waveAnims = useRef([
    new Animated.Value(20),
    new Animated.Value(35),
    new Animated.Value(25),
    new Animated.Value(40),
    new Animated.Value(30),
    new Animated.Value(45),
    new Animated.Value(25),
  ]).current;

  // Auto-navigate after delay (Wizard-of-Oz simulation)
  useEffect(() => {
    const timer = setTimeout(() => {
      const fakeTranscript = getSimulatedTranscript();
      setIsListening(false);
      navigation.navigate('UserSaid', { transcript: fakeTranscript });
    }, WOZ_CONFIG.LISTENING_DURATION);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Animate waveform
  useEffect(() => {
    if (isListening) {
      const animations = waveAnims.map((anim) => {
        const toValue = 20 + Math.random() * 40;
        const duration = 200 + Math.random() * 300;
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue,
              duration,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 20,
              duration,
              useNativeDriver: false,
            }),
          ])
        );
      });

      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    }
  }, [isListening]);

  const handleCancel = () => {
    setIsListening(false);
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
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Main content */}
          <View style={styles.content}>
            <Text style={styles.title}>I'm listening...</Text>

            {/* Fake waveform animation */}
            <View style={styles.waveformContainer}>
              {waveAnims.map((anim, i) => (
                <Animated.View
                  key={i}
                  style={[styles.waveBar, { height: anim }]}
                />
              ))}
            </View>

            <Text style={styles.subtitle}>Speak naturally</Text>
          </View>

          {/* Cancel button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    marginBottom: SPACING.xl,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    gap: 12,
    marginBottom: SPACING.lg,
  },
  waveBar: {
    width: 10,
    backgroundColor: COLORS.primaryTeal,
    borderRadius: 5,
    shadowColor: COLORS.primaryTeal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text.muted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: SPACING.xxl,
  },
  cancelButton: {
    backgroundColor: COLORS.paperBeige,
    paddingHorizontal: 40,
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
  cancelButtonText: {
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    color: COLORS.darkBrown,
  },
});
