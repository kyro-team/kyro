import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/contexts/AuthContext";

// Auth Flow
import WelcomeScreen from "./screens/Auth/WelcomeScreen";

// Main App with Bottom Tabs
import AppTabs from "./navigation/AppTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: "default",
          }}
        >
          {/* Auth Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          {/* Main App with Bottom Tabs */}
          <Stack.Screen name="MainApp" component={AppTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
