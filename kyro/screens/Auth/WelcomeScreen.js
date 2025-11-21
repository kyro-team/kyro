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

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import { useAuth } from "../../src/contexts/AuthContext";
import { PaperBackground, PrimaryButton, SecondaryButton } from "../../theme/components";
import { COLORS, SPACING, TEXT_STYLES, COMPONENT_STYLES, FONT_SIZES, RADII } from "../../theme";

export default function WelcomeScreen({ navigation }) {
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Navigate to Home when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("MainApp");
    }
  }, [isAuthenticated, navigation]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <PaperBackground>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.darkBrown} />
        </View>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground>
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

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace("MainApp")}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </PaperBackground>
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
    paddingHorizontal: SPACING.xl,
  },
  welcomeText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkBrown,
    marginBottom: SPACING.xs,
    fontFamily: "DMSans_400Regular",
  },
  logo: {
    fontSize: 52,
    color: COLORS.darkBrown,
    letterSpacing: 6,
    fontFamily: "DMSans_700Bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg + 4,
    borderRadius: RADII.lg,
    marginTop: SPACING.xxl + 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md - 4,
  },
  googleIcon: {
    color: "#4285F4",
    fontSize: FONT_SIZES.body,
    fontFamily: "DMSans_700Bold",
  },
  googleButtonText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.bodySmall,
    fontFamily: "DMSans_500Medium",
  },
  skipButton: {
    marginTop: SPACING.lg - 4,
    paddingVertical: SPACING.md - 4,
    paddingHorizontal: SPACING.lg,
  },
  skipButtonText: {
    color: COLORS.darkBrown,
    fontSize: FONT_SIZES.small,
    fontFamily: "DMSans_400Regular",
    opacity: 0.7,
  },
});
