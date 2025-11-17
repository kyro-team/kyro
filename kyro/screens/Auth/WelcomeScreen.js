/**
 * WelcomeScreen
 *
 * GOAL: Display the initial splash/welcome screen when users open the app.
 * Shows the KYRO branding with a gradient background and Google login option.
 * This is the entry point of the app that transitions to the Home screen after authentication.
 *
 * Key Features:
 * - KYRO logo/branding display
 * - "Welcome to KYRO" greeting
 * - Gradient background (beige to teal to green)
 * - Google Sign-In button for authentication
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from "@expo-google-fonts/dm-sans";

export default function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In
    navigation.navigate("Home");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#D4C5A9", "#6BA3A0", "#7CB342"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.logo}>KYRO</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 16,
    color: "#3D3D3D",
    marginBottom: 4,
    fontFamily: "DMSans_400Regular",
  },
  logo: {
    fontSize: 52,
    color: "#3D3D3D",
    letterSpacing: 6,
    fontFamily: "DMSans_700Bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 28,
    marginTop: 48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleIcon: {
    color: "#4285F4",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  googleButtonText: {
    color: "#3D3D3D",
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
});
