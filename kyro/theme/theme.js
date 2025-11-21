/**
 * Kyro App Design System
 *
 * Visual aesthetic: Vintage paper, warm tones, grain texture,
 * teal accents, soft shadows, organic rounded shapes
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Neutrals (Paper Tones)
  paperBeige: "#E8DCC8",
  sandTan: "#D4C5A9",
  darkBrown: "#3D2817",
  darkerBrown: "#3d2f24",

  // Accents
  primaryTeal: "#5A9B93",
  secondaryTeal: "#5F9B94",
  accentRed: "#D4553B",

  // Semantic
  text: {
    primary: "#3D2817",
    secondary: "#3D2817",
    muted: "rgba(61, 40, 23, 0.6)",
  },

  background: {
    primary: "#E8DCC8",
    secondary: "#D4C5A9",
    teal: "#5F9B94",
  },

  border: {
    default: "#3D2817",
    light: "rgba(61, 40, 23, 0.2)",
  },

  // Overlays & Effects
  grain: "rgba(0, 0, 0, 0.02)",
  shadow: "#000",
};

// ============================================================================
// GRADIENTS
// ============================================================================

export const GRADIENTS = {
  primary: {
    colors: [
      "rgba(232, 220, 200, 0.95)",
      "rgba(90, 155, 147, 0.7)",
      "rgba(90, 155, 147, 0.85)",
    ],
    locations: [0, 0.6, 1],
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONT_SIZES = {
  display: 34,
  h1: 28,
  h2: 24,
  h3: 18,
  body: 16,
  bodySmall: 15,
  small: 14,
  caption: 12,
  tiny: 9,
};

export const FONT_WEIGHTS = {
  black: "900",
  bold: "700",
  semiBold: "600",
  medium: "500",
  regular: "400",
};

export const LINE_HEIGHTS = {
  tight: 22,
  normal: 24,
  relaxed: 26,
};

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.3,
};

// Typography Presets
export const TEXT_STYLES = {
  display: {
    fontSize: FONT_SIZES.display,
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.darkBrown,
    letterSpacing: LETTER_SPACING.tight,
  },

  heading1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.darkBrown,
  },

  heading2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.darkBrown,
  },

  heading3: {
    fontSize: FONT_SIZES.h3,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.darkBrown,
    lineHeight: LINE_HEIGHTS.relaxed,
  },

  body: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.darkBrown,
    lineHeight: LINE_HEIGHTS.normal,
  },

  bodyBold: {
    fontSize: FONT_SIZES.bodySmall,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.darkBrown,
  },

  button: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.darkBrown,
  },

  caption: {
    fontSize: FONT_SIZES.caption,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.text.muted,
  },

  navLabel: {
    fontSize: FONT_SIZES.tiny,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.darkBrown,
    letterSpacing: LETTER_SPACING.wide,
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 42,
  xxxl: 60,
};

// Common padding/margin patterns
export const SPACING_PATTERNS = {
  screenHorizontal: SPACING.lg,
  screenTop: SPACING.xxxl,
  cardPadding: SPACING.md,
  cardPaddingLarge: SPACING.xl,
  sectionGap: SPACING.lg,
};

// ============================================================================
// BORDER RADII
// ============================================================================

export const RADII = {
  xs: 2,
  sm: 6,
  md: 16,
  lg: 28,
  xl: 42,
  pill: 46,
  round: 999, // For perfect circles
};

// Component-specific radii
export const COMPONENT_RADII = {
  eventCard: RADII.md,
  largeCard: RADII.lg,
  reflectionCard: RADII.xl,
  button: RADII.pill,
  icon: RADII.round,
  navIconSquare: RADII.xs,
};

// ============================================================================
// SHADOWS
// ============================================================================

export const SHADOWS = {
  none: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  low: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  high: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  highest: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
};

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const COMPONENT_STYLES = {
  // Paper Card
  card: {
    backgroundColor: COLORS.paperBeige,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    ...SHADOWS.high,
  },

  // Reflection Card (Large)
  reflectionCard: {
    backgroundColor: COLORS.paperBeige,
    paddingVertical: 36,
    paddingHorizontal: 32,
    borderRadius: RADII.xl,
    ...SHADOWS.highest,
  },

  // Event Card
  eventCard: {
    backgroundColor: COLORS.paperBeige,
    borderRadius: RADII.md,
    padding: 14,
    ...SHADOWS.low,
  },

  // Primary Button (Teal with border)
  primaryButton: {
    backgroundColor: COLORS.primaryTeal,
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: RADII.pill,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    ...SHADOWS.medium,
  },

  // Secondary Button (Outlined)
  secondaryButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: RADII.pill,
    borderWidth: 2,
    borderColor: COLORS.darkBrown,
  },

  // Circular Icon Button
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryTeal,
    borderWidth: 2.5,
    borderColor: COLORS.darkBrown,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.medium,
  },
};

// ============================================================================
// LAYOUT
// ============================================================================

export const LAYOUT = {
  screenPadding: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxxl,
    paddingBottom: 200,
  },

  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxxl,
    paddingBottom: 200,
    minHeight: 1000,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingBottom: 20,
    backgroundColor: COLORS.sandTan,
  },
};

// ============================================================================
// TEXTURE & OVERLAY
// ============================================================================

export const TEXTURE = {
  grain: {
    backgroundColor: COLORS.grain,
    opacity: 0.5,
    pointerEvents: "none",
  },
};

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAVIGATION = {
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.darkerBrown,
    marginBottom: 8,
  },

  iconSquare: {
    borderRadius: RADII.xs,
    backgroundColor: "transparent",
    borderWidth: 2.5,
    borderColor: COLORS.darkerBrown,
  },

  label: {
    ...TEXT_STYLES.navLabel,
  },
};
