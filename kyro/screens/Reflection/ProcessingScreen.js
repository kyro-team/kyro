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
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function ProcessingScreen({ navigation }) {
  useEffect(() => {
    // Simulate processing time, then navigate to confirmation
    const timer = setTimeout(() => {
      navigation.navigate('Confirmation');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Interesting...</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CB342',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  loader: {
    marginTop: 16,
  },
});
