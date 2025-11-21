/**
 * ListeningScreen
 *
 * Active recording/typing state for capturing user reflections.
 * Supports both voice input (when available) and typing mode.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, GRADIENTS } from '../../theme';

// Check if we're in development build with native modules
let SpeechRecognition = null;
try {
  SpeechRecognition = require('expo-speech-recognition');
} catch (e) {
  console.log('Speech recognition not available');
}

export default function ListeningScreen({ navigation, route }) {
  const typingMode = route?.params?.typingMode || !SpeechRecognition;

  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(typingMode);

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

  // Start listening on mount if not in typing mode
  useEffect(() => {
    if (!isTyping) {
      startListening();
    }
    return () => {
      if (SpeechRecognition?.ExpoSpeechRecognitionModule) {
        try {
          SpeechRecognition.ExpoSpeechRecognitionModule.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Animate waveform
  useEffect(() => {
    if (isListening) {
      const animations = waveAnims.map((anim, i) => {
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

      animations.forEach(a => a.start());
      return () => animations.forEach(a => a.stop());
    }
  }, [isListening]);

  // Speech recognition event handlers
  useEffect(() => {
    if (!SpeechRecognition?.useSpeechRecognitionEvent) return;

    const unsubResult = SpeechRecognition.useSpeechRecognitionEvent('result', (event) => {
      const result = event.results[event.resultIndex];
      if (result) {
        setTranscript(result.transcript);
      }
    });

    const unsubStart = SpeechRecognition.useSpeechRecognitionEvent('start', () => {
      setIsListening(true);
    });

    const unsubEnd = SpeechRecognition.useSpeechRecognitionEvent('end', () => {
      setIsListening(false);
    });

    return () => {
      unsubResult?.();
      unsubStart?.();
      unsubEnd?.();
    };
  }, []);

  const startListening = async () => {
    if (!SpeechRecognition?.ExpoSpeechRecognitionModule) {
      // Fallback to typing mode
      setIsTyping(true);
      return;
    }

    try {
      const { granted } = await SpeechRecognition.ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        setIsTyping(true);
        return;
      }

      SpeechRecognition.ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        continuous: true,
        addsPunctuation: true,
      });
      setIsListening(true);
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsTyping(true);
    }
  };

  const handleStop = () => {
    if (SpeechRecognition?.ExpoSpeechRecognitionModule && isListening) {
      try {
        SpeechRecognition.ExpoSpeechRecognitionModule.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const handleConfirm = () => {
    if (!transcript.trim()) return;

    handleStop();
    navigation.navigate('Summary', {
      transcript: transcript.trim(),
    });
  };

  const handleBack = () => {
    handleStop();
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

          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Main content */}
            <View style={styles.content}>
              <Text style={styles.title}>
                {isTyping ? "What's on your mind?" : "I'm listening"}
              </Text>

              {isTyping ? (
                // Typing mode
                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Share your thoughts..."
                    placeholderTextColor={COLORS.text.muted}
                    value={transcript}
                    onChangeText={setTranscript}
                    multiline
                    textAlignVertical="top"
                    autoFocus
                  />
                </View>
              ) : (
                // Voice mode with waveform
                <>
                  {transcript ? (
                    <View style={styles.transcriptPreview}>
                      <Text style={styles.transcriptText} numberOfLines={4}>
                        "{transcript}"
                      </Text>
                    </View>
                  ) : null}

                  <View style={styles.waveformContainer}>
                    {waveAnims.map((anim, i) => (
                      <Animated.View
                        key={i}
                        style={[styles.waveBar, { height: anim }]}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>

            {/* Control buttons */}
            <View style={styles.controlsContainer}>
              <View style={styles.controls}>
                {/* Stop button */}
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleStop}
                >
                  <View style={styles.stopIcon} />
                </TouchableOpacity>

                {/* Confirm button */}
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    styles.confirmButton,
                    !transcript && styles.buttonDisabled,
                  ]}
                  onPress={handleConfirm}
                  disabled={!transcript}
                >
                  <Text style={styles.checkIcon}>✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

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
  // Typing mode styles
  inputCard: {
    backgroundColor: COLORS.paperBeige,
    borderRadius: 24,
    padding: SPACING.lg,
    width: '100%',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  textInput: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    lineHeight: 26,
    minHeight: 160,
  },
  // Voice mode styles
  transcriptPreview: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    maxWidth: '90%',
  },
  transcriptText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    gap: 8,
  },
  waveBar: {
    width: 8,
    backgroundColor: COLORS.primaryTeal,
    borderRadius: 4,
  },
  // Control buttons
  controlsContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  controls: {
    flexDirection: 'row',
    gap: 24,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.paperBeige,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButton: {
    backgroundColor: COLORS.primaryTeal,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  stopIcon: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.darkBrown,
    borderRadius: 3,
  },
  checkIcon: {
    fontSize: 28,
    color: COLORS.darkBrown,
    fontWeight: '700',
  },
});
