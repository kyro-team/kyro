/**
 * AuthContext
 *
 * Provides authentication state and methods throughout the app.
 * Handles Google Sign-In using expo-auth-session and Firebase Auth.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithCredential, signOut, GoogleAuthProvider } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../config/firebase";

// Complete auth session for web browser
WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // Configure Google Sign-In (calendar scope added back after testing)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: "https://auth.expo.io/@gilxsilva/kyro",
    scopes: ["openid", "profile", "email"],
  });

  // Debug: Log auth response
  useEffect(() => {
    if (response) {
      console.log("Auth response type:", response.type);
      console.log("Auth response:", JSON.stringify(response, null, 2));
    }
  }, [response]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;

      // Store access token for Google API calls (Calendar, etc.)
      setAccessToken(access_token);

      // Sign in to Firebase with Google credential
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync({ useProxy: true });
      console.log("promptAsync result:", result);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setAccessToken(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    accessToken,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
