/**
 * ConfirmationScreen
 *
 * GOAL: Display the speech-to-text transcription for user confirmation.
 * Shows "You said..." followed by the transcribed text, allowing the user
 * to confirm the accuracy or indicate they want to add more.
 *
 * Key Features:
 * - "You said..." header
 * - User avatar/profile image
 * - Transcribed speech text display
 * - "Anything else you want to talk about?" prompt
 * - YES button - navigate to continue adding more
 * - NO button - finalize and go to Home (done)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PaperBackground } from '../../theme/components';
import { COLORS, SPACING, FONT_SIZES } from '../../theme';

export default function ConfirmationScreen({ navigation, route }) {
  // Get transcript from navigation params
  const transcript = route?.params?.transcript || 'No transcript available.';

  return (
    <PaperBackground>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>You said...</Text>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* User Avatar Placeholder */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>

            {/* Transcribed Text */}
            <View style={styles.transcriptContainer}>
              <Text style={styles.transcriptText}>
                "{transcript}"
              </Text>
            </View>
          </View>

        {/* Confirmation Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>
            Anything else you want to talk about?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => navigation.navigate('ReadyToTalk')}
            >
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
          </View>
          {/* Optional: Add text option */}
          <TouchableOpacity
            style={styles.typeOptionButton}
            onPress={() => navigation.navigate('ChatInitial')}
          >
            <Text style={styles.typeOptionText}>Or add more by typing</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>

    </PaperBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  scrollContent: {
    flex: 1,
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
    marginBottom: SPACING.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarText: {
    fontSize: 48,
  },
  transcriptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: SPACING.md,
    borderRadius: 12,
    width: '100%',
  },
  transcriptText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.small,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  promptContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  promptText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.body,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  yesButton: {
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md - 4,
    borderRadius: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.darkBrown,
  },
  noButton: {
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md - 4,
    borderRadius: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.darkBrown,
  },
  buttonText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
  },
  typeOptionButton: {
    marginTop: SPACING.md - 4,
    paddingVertical: SPACING.sm,
  },
  typeOptionText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.small,
    opacity: 0.7,
    textDecorationLine: 'underline',
  },
});