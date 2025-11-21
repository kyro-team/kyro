/**
 * SummaryScreen (You said...)
 *
 * Displays the user's reflection with face icons and
 * asks if they want to add more or finish.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';

// Simple face icon component (abstract organic shape)
const FaceIcon = ({ style }) => (
  <View style={[styles.faceIcon, style]}>
    <View style={styles.faceInner} />
  </View>
);

export default function SummaryScreen({ navigation, route }) {
  const transcript = route?.params?.transcript || '';

  // Split transcript into reflection points (by sentence or period)
  const reflections = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const handleYes = () => {
    // User wants to add more - go back to listening
    navigation.navigate('Listening');
  };

  const handleNo = () => {
    // User is done - go home
    navigation.navigate('Home');
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

          {/* Title */}
          <Text style={styles.title}>You said...</Text>

          {/* Reflections list */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {reflections.length > 0 ? (
              reflections.map((reflection, index) => (
                <View key={index} style={styles.reflectionBubble}>
                  <FaceIcon style={styles.facePosition} />
                  <View style={styles.bubbleContent}>
                    <Text style={styles.reflectionText}>{reflection}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.reflectionBubble}>
                <FaceIcon style={styles.facePosition} />
                <View style={styles.bubbleContent}>
                  <Text style={styles.reflectionText}>{transcript}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Question and buttons */}
          <View style={styles.promptSection}>
            <Text style={styles.promptText}>
              Anything else you want to talk about?
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.answerButton}
                onPress={handleYes}
                activeOpacity={0.8}
              >
                <Text style={styles.answerButtonText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.answerButton, styles.noButton]}
                onPress={handleNo}
                activeOpacity={0.8}
              >
                <Text style={styles.answerButtonText}>NO</Text>
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.darkBrown,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: SPACING.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  // Reflection bubble with face
  reflectionBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  facePosition: {
    marginRight: SPACING.md,
    marginTop: 4,
  },
  faceIcon: {
    width: 40,
    height: 48,
    backgroundColor: '#FDFADB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faceInner: {
    width: 20,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  bubbleContent: {
    flex: 1,
    backgroundColor: COLORS.paperBeige,
    borderRadius: 20,
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  reflectionText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    lineHeight: 24,
  },
  // Prompt section
  promptSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  promptText: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '600',
    color: COLORS.darkBrown,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  answerButton: {
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  noButton: {
    backgroundColor: COLORS.paperBeige,
  },
  answerButtonText: {
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
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
