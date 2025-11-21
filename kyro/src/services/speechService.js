/**
 * Speech Recognition Service
 *
 * Handles voice recording and speech-to-text transcription
 */

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

/**
 * Request microphone permissions
 */
export async function requestPermissions() {
  const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  return result.granted;
}

/**
 * Check if speech recognition is available
 */
export async function isAvailable() {
  return ExpoSpeechRecognitionModule.isRecognitionAvailable();
}

/**
 * Start speech recognition
 */
export async function startListening(options = {}) {
  const defaultOptions = {
    lang: 'en-US',
    interimResults: true,
    maxAlternatives: 1,
    continuous: true,
    requiresOnDeviceRecognition: false,
    addsPunctuation: true,
  };

  await ExpoSpeechRecognitionModule.start({
    ...defaultOptions,
    ...options,
  });
}

/**
 * Stop speech recognition
 */
export async function stopListening() {
  await ExpoSpeechRecognitionModule.stop();
}

/**
 * Abort speech recognition
 */
export async function abortListening() {
  await ExpoSpeechRecognitionModule.abort();
}

// Re-export the hook for use in components
export { useSpeechRecognitionEvent };
