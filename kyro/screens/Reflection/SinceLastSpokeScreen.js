/**
 * SinceLastSpokeScreen
 *
 * Shows a summary of events since the user's last reflection session
 * with cards and Talk buttons.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';

export default function SinceLastSpokeScreen({ navigation }) {
  const recentEvents = [
    'You went to the park with Jamie.',
    'You finished your major design critique.',
    "You went to Sam's spoken word performance.",
    'You started listening to Lizzy McAlpine.',
  ];

  const handleTalk = (event) => {
    navigation.navigate('ReadyToTalk', { topic: event });
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

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Since we last{'\n'}spoke,</Text>

            <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
              {recentEvents.map((event, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>{event}</Text>
                  <TouchableOpacity
                    style={styles.talkButton}
                    onPress={() => handleTalk(event)}
                  >
                    <Text style={styles.talkButtonText}>Talk</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
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
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: SPACING.lg,
  },
  backArrow: {
    fontSize: 28,
    color: COLORS.darkBrown,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.darkBrown,
    marginBottom: SPACING.xl,
    lineHeight: 42,
  },
  eventsList: {
    flex: 1,
  },
  // Card styles
  card: {
    backgroundColor: COLORS.paperBeige,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  talkButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  talkButtonText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.darkBrown,
  },
});