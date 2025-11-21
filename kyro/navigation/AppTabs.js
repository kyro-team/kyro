/**
 * AppTabs - Bottom Tab Navigator
 *
 * Uses custom BottomNav component with paper texture and hand-drawn icons.
 * Each tab contains a nested stack navigator for its respective flow.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Custom Tab Bar
import BottomNav from '../components/BottomNav';

// Home/Reflect Flow Screens
import HomeScreen from '../screens/Home/HomeScreen';
import SinceLastSpokeScreen from '../screens/Reflection/SinceLastSpokeScreen';
import ReadyToTalkScreen from '../screens/Reflection/ReadyToTalkScreen';
import ListeningScreen from '../screens/Reflection/ListeningScreen';
import WoZListeningScreen from '../screens/Reflection/WoZListeningScreen';
import UserSaidScreen from '../screens/Reflection/UserSaidScreen';
import ProcessingScreen from '../screens/Reflection/ProcessingScreen';
import ConfirmationScreen from '../screens/Reflection/ConfirmationScreen';
import SummaryScreen from '../screens/Reflection/SummaryScreen';

// Chat Flow Screens
import ChatInitialScreen from '../screens/Chat/ChatInitialScreen';
import ChatConversationScreen from '../screens/Chat/ChatConversationScreen';
import ChatSummaryScreen from '../screens/Chat/ChatSummaryScreen';

// Plan Flow Screens
import PlanHomeScreen from '../screens/Plan/PlanHomeScreen';

// Learn Flow Screens
import LearnHomeScreen from '../screens/Learn/LearnHomeScreen';

const Tab = createBottomTabNavigator();
const ReflectStack = createNativeStackNavigator();
const PlanStack = createNativeStackNavigator();
const LearnStack = createNativeStackNavigator();

// ============================================================================
// STACK NAVIGATORS FOR EACH TAB
// ============================================================================

// Reflect Tab Stack - Contains Home and Reflection flow
function ReflectStackNavigator() {
  return (
    <ReflectStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'default',
      }}
    >
      <ReflectStack.Screen name="Home" component={HomeScreen} />
      <ReflectStack.Screen name="SinceLastSpoke" component={SinceLastSpokeScreen} />
      <ReflectStack.Screen name="ReadyToTalk" component={ReadyToTalkScreen} />
      <ReflectStack.Screen name="Listening" component={ListeningScreen} />
      {/* Wizard-of-Oz Voice Flow */}
      <ReflectStack.Screen name="WoZListening" component={WoZListeningScreen} />
      <ReflectStack.Screen name="UserSaid" component={UserSaidScreen} />
      <ReflectStack.Screen name="Processing" component={ProcessingScreen} />
      <ReflectStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <ReflectStack.Screen name="Summary" component={SummaryScreen} />
      {/* Chat Flow */}
      <ReflectStack.Screen name="ChatInitial" component={ChatInitialScreen} />
      <ReflectStack.Screen name="ChatConversation" component={ChatConversationScreen} />
      <ReflectStack.Screen name="ChatSummary" component={ChatSummaryScreen} />
    </ReflectStack.Navigator>
  );
}

// Plan Tab Stack
function PlanStackNavigator() {
  return (
    <PlanStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'default',
      }}
    >
      <PlanStack.Screen name="PlanHome" component={PlanHomeScreen} />
    </PlanStack.Navigator>
  );
}

// Learn Tab Stack
function LearnStackNavigator() {
  return (
    <LearnStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'default',
      }}
    >
      <LearnStack.Screen name="LearnHome" component={LearnHomeScreen} />
    </LearnStack.Navigator>
  );
}

// ============================================================================
// MAIN TAB NAVIGATOR
// ============================================================================

export default function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ReflectTab"
        component={ReflectStackNavigator}
        options={{ title: 'Reflect' }}
      />
      <Tab.Screen
        name="PlanTab"
        component={PlanStackNavigator}
        options={{ title: 'Plan' }}
      />
      <Tab.Screen
        name="LearnTab"
        component={LearnStackNavigator}
        options={{ title: 'Learn' }}
      />
    </Tab.Navigator>
  );
}
