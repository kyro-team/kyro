/**
 * Kyro App Reusable Components
 *
 * Pre-styled components following the design system
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  COLORS,
  GRADIENTS,
  TEXT_STYLES,
  COMPONENT_STYLES,
  SPACING,
  LAYOUT,
  TEXTURE,
} from "./theme";

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

/**
 * PaperBackground - Standard app background with texture and gradient
 *
 * @param {ReactNode} children - Content to render
 * @param {string} textureSource - Optional paper texture image
 */
export function PaperBackground({ children, textureSource }) {
  const BackgroundWrapper = textureSource ? ImageBackground : View;
  const bgProps = textureSource
    ? { source: textureSource, resizeMode: "cover" }
    : {};

  return (
    <View style={{ flex: 1 }}>
      <BackgroundWrapper style={styles.backgroundContainer} {...bgProps}>
        <LinearGradient
          colors={GRADIENTS.primary.colors}
          locations={GRADIENTS.primary.locations}
          style={styles.backgroundContainer}
        >
          <View style={[StyleSheet.absoluteFillObject, TEXTURE.grain]} />
          {children}
        </LinearGradient>
      </BackgroundWrapper>
    </View>
  );
}

/**
 * ScreenContainer - Scrollable screen wrapper
 *
 * @param {ReactNode} children - Screen content
 * @param {boolean} showNav - Show bottom navigation
 */
export function ScreenContainer({ children, showNav = true }) {
  return (
    <View style={styles.backgroundContainer}>
      {children}
    </View>
  );
}

// ============================================================================
// CARD COMPONENTS
// ============================================================================

/**
 * PaperCard - Standard paper-textured card
 *
 * @param {ReactNode} children - Card content
 * @param {object} style - Additional styles
 */
export function PaperCard({ children, style }) {
  return (
    <View style={[COMPONENT_STYLES.card, style]}>
      {children}
    </View>
  );
}

/**
 * ReflectionCard - Large rounded card for prompts
 *
 * @param {string} text - Main question/prompt text
 * @param {string} buttonText - Button label
 * @param {function} onPress - Button press handler
 */
export function ReflectionCard({ text, buttonText, onPress, style }) {
  return (
    <View style={[COMPONENT_STYLES.reflectionCard, style]}>
      <Text style={styles.reflectionText}>{text}</Text>
      <PrimaryButton title={buttonText} onPress={onPress} />
    </View>
  );
}

/**
 * EventCard - Timeline event card
 *
 * @param {string} title - Event title
 * @param {string} time - Event time
 * @param {string} location - Optional location
 */
export function EventCard({ title, time, location, style }) {
  return (
    <View style={[COMPONENT_STYLES.eventCard, style]}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventTime}>{time}</Text>
      {location ? <Text style={styles.eventLocation}>{location}</Text> : null}
    </View>
  );
}

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

/**
 * PrimaryButton - Main teal button with border
 *
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {object} style - Additional styles
 */
export function PrimaryButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity
      style={[COMPONENT_STYLES.primaryButton, style]}
      onPress={onPress}
    >
      <Text style={[TEXT_STYLES.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

/**
 * SecondaryButton - Outlined button
 *
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 */
export function SecondaryButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity
      style={[COMPONENT_STYLES.secondaryButton, style]}
      onPress={onPress}
    >
      <Text style={[TEXT_STYLES.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

/**
 * IconButton - Circular icon button
 *
 * @param {ReactNode} icon - Icon component or text
 * @param {function} onPress - Press handler
 */
export function IconButton({ icon, onPress, style }) {
  return (
    <TouchableOpacity
      style={[COMPONENT_STYLES.iconButton, style]}
      onPress={onPress}
    >
      {typeof icon === "string" ? (
        <Text style={styles.iconButtonText}>{icon}</Text>
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
}

// ============================================================================
// TEXT COMPONENTS
// ============================================================================

/**
 * PageHeader - Large page title
 *
 * @param {string} children - Header text
 */
export function PageHeader({ children, style }) {
  return <Text style={[TEXT_STYLES.display, style]}>{children}</Text>;
}

/**
 * SectionHeader - Section heading
 *
 * @param {string} children - Header text
 */
export function SectionHeader({ children, style }) {
  return <Text style={[TEXT_STYLES.heading3, style]}>{children}</Text>;
}

/**
 * BodyText - Standard paragraph text
 *
 * @param {string} children - Body text
 */
export function BodyText({ children, style }) {
  return <Text style={[TEXT_STYLES.body, style]}>{children}</Text>;
}

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

/**
 * BottomNavItem - Navigation tab item
 *
 * @param {ReactNode} icon - Icon component
 * @param {string} label - Nav label
 * @param {function} onPress - Press handler
 */
export function BottomNavItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      {icon}
      <Text style={TEXT_STYLES.navLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },

  reflectionText: {
    ...TEXT_STYLES.heading3,
    textAlign: "center",
    marginBottom: 22,
  },

  eventTitle: {
    ...TEXT_STYLES.bodyBold,
    marginBottom: 4,
  },

  eventTime: {
    ...TEXT_STYLES.caption,
  },

  eventLocation: {
    ...TEXT_STYLES.caption,
    marginTop: 4,
  },

  iconButtonText: {
    fontSize: 24,
    color: COLORS.darkBrown,
    fontWeight: "600",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
