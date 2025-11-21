/**
 * Custom Bottom Navigation Bar
 *
 * Features:
 * - Paper texture background
 * - Hand-drawn icons (Reflect = circle, Plan = rounded square, Learn = lightbulb)
 * - Active state: teal icons and labels
 * - Inactive state: dark brown icons and labels
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { COLORS } from '../theme';

// Design tokens
const NAV_COLORS = {
  active: '#5A9B93',      // Teal
  inactive: '#3D2817',    // Dark brown
  background: '#D4C5A9',  // Sand tan
};

// ============================================================================
// ICONS - Hand-drawn using View components
// ============================================================================

// Reflect Icon - Filled Circle
const ReflectIcon = ({ active }) => (
  <View
    style={[
      styles.reflectIcon,
      { backgroundColor: active ? NAV_COLORS.active : NAV_COLORS.inactive }
    ]}
  />
);

// Plan Icon - Rounded Square (outline)
const PlanIcon = ({ active }) => (
  <View
    style={[
      styles.planIcon,
      { borderColor: active ? NAV_COLORS.active : NAV_COLORS.inactive }
    ]}
  />
);

// Learn Icon - Lightbulb shape
const LearnIcon = ({ active }) => {
  const color = active ? NAV_COLORS.active : NAV_COLORS.inactive;
  return (
    <View style={styles.learnIconContainer}>
      {/* Bulb head */}
      <View style={[styles.learnBulb, { backgroundColor: color }]} />
      {/* Bulb base/screw */}
      <View style={[styles.learnBase, { backgroundColor: color }]} />
    </View>
  );
};

// ============================================================================
// TAB ITEM COMPONENT
// ============================================================================

const TabItem = ({ label, icon: Icon, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabItem, active && styles.tabItemActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.iconWrapper}>
      <Icon active={active} />
    </View>
    <Text
      style={[
        styles.tabLabel,
        { color: active ? NAV_COLORS.active : NAV_COLORS.inactive },
        !active && styles.tabLabelInactive,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BottomNav({ state, descriptors, navigation }) {
  const tabs = [
    { name: 'ReflectTab', label: 'REFLECT', icon: ReflectIcon },
    { name: 'PlanTab', label: 'PLAN', icon: PlanIcon },
    { name: 'LearnTab', label: 'LEARN', icon: LearnIcon },
  ];

  return (
    <ImageBackground
      source={require('../assets/textures/paper-texture.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name);
            }
          };

          return (
            <TabItem
              key={tab.name}
              label={tab.label}
              icon={tab.icon}
              active={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </ImageBackground>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: NAV_COLORS.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: 'rgba(212, 197, 169, 0.85)', // Semi-transparent sand
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tabItemActive: {
    // Optional: add slight elevation for active state
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tabLabelInactive: {
    opacity: 0.92, // Slight dim for inactive
  },

  // Reflect Icon - Circle
  reflectIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  // Plan Icon - Rounded Square (outline)
  planIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 3,
    backgroundColor: 'transparent',
  },

  // Learn Icon - Lightbulb
  learnIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 28,
  },
  learnBulb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: -4,
  },
  learnBase: {
    width: 10,
    height: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
