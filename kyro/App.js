import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/contexts/AuthContext";

// Auth Flow
import WelcomeScreen from "./screens/Auth/WelcomeScreen";

// Home Flow
import HomeScreen from "./screens/Home/HomeScreen";

// Reflection Flow (Voice-based)
import SinceLastSpokeScreen from "./screens/Reflection/SinceLastSpokeScreen";
import ReadyToTalkScreen from "./screens/Reflection/ReadyToTalkScreen";
import ListeningScreen from "./screens/Reflection/ListeningScreen";
import ProcessingScreen from "./screens/Reflection/ProcessingScreen";
import ConfirmationScreen from "./screens/Reflection/ConfirmationScreen";

// Chat Flow (Text-based)
import ChatInitialScreen from "./screens/Chat/ChatInitialScreen";
import ChatConversationScreen from "./screens/Chat/ChatConversationScreen";
import ChatSummaryScreen from "./screens/Chat/ChatSummaryScreen";

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

          {/* Home Flow */}
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Reflection Flow */}
          <Stack.Screen name="SinceLastSpoke" component={SinceLastSpokeScreen} />
          <Stack.Screen name="ReadyToTalk" component={ReadyToTalkScreen} />
          <Stack.Screen name="Listening" component={ListeningScreen} />
          <Stack.Screen name="Processing" component={ProcessingScreen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />

          {/* Chat Flow */}
          <Stack.Screen name="ChatInitial" component={ChatInitialScreen} />
          <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
          <Stack.Screen name="ChatSummary" component={ChatSummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
