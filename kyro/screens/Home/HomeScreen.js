import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../src/contexts/AuthContext";
import { getFormattedCalendarEvents } from "../../src/services/calendarService";

// Placeholder events for demo purposes
const PLACEHOLDER_EVENTS = [
  {
    id: "placeholder-1",
    title: "Breakfast w/ Jamie",
    timeFormatted: "10:00 - 11:00",
    location: null,
  },
  {
    id: "placeholder-2",
    title: "San Francisco Art's Festival",
    timeFormatted: "10:30am - 1:00pm",
    location: null,
  },
];

export default function HomeScreen({ navigation }) {
  const { user, accessToken } = useAuth();
  const [events, setEvents] = useState(PLACEHOLDER_EVENTS);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  const firstName = user?.displayName?.split(" ")[0] || "Gabriella";

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  useEffect(() => {
    async function loadEvents() {
      if (!accessToken) return;
      setLoadingEvents(true);
      setEventsError(null);

      try {
        const calendarEvents = await getFormattedCalendarEvents(accessToken, 5);
        // Use real calendar events if available, otherwise keep placeholder events
        if (calendarEvents && calendarEvents.length > 0) {
          setEvents(calendarEvents);
        }
      } catch (error) {
        console.error("Failed to fetch calendar events:", error);
        setEventsError(error.message);
        // Keep placeholder events on error
      } finally {
        setLoadingEvents(false);
      }
    }

    loadEvents();
  }, [accessToken]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/textures/paper-texture.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(232, 220, 200, 0.95)",
            "rgba(90, 155, 147, 0.7)",
            "rgba(90, 155, 147, 0.85)",
          ]}
          locations={[0, 0.6, 1]}
          style={styles.container}
        >
          {/* Grain overlay for texture effect */}
          <View style={styles.grainOverlay} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Text style={styles.greeting}>Hello {firstName},</Text>
        <Text style={styles.subtitle}>
          Looks like you have a pretty{" "}
          <Text style={styles.calmText}>calm</Text>
          {"\n"}
          {getTimeGreeting()} today.
        </Text>

        {/* Calendar Events with Timeline */}
        <View style={styles.eventsCard}>
          <View style={styles.eventsTopSection}>
            <View style={styles.timelineDot} />
          </View>
          <View style={styles.timelineDivider} />
          <View style={styles.eventsMainSection}>
            <View style={styles.timelineBar} />
            <View style={styles.eventsContent}>
              {loadingEvents ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#5F9B94" />
                  <Text style={styles.loadingText}>
                    Loading your calendar...
                  </Text>
                </View>
              ) : eventsError ? (
                <Text style={styles.eventTitle}>Unable to load calendar</Text>
              ) : events.length === 0 ? (
                <Text style={styles.eventTitle}>No upcoming events</Text>
              ) : (
                <>
                  <View style={styles.eventCard1}>
                    <Text style={styles.eventTitle}>{events[0].title}</Text>
                    <Text style={styles.eventTime}>
                      {events[0].timeFormatted}
                    </Text>
                  </View>
                  {events.length > 1 && (
                    <View style={styles.eventCard2}>
                      <Text style={styles.eventTitle}>{events[1].title}</Text>
                      <Text style={styles.eventTime}>
                        {events[1].timeFormatted}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </View>

        {/* Back Button X */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Text style={styles.backX}>×</Text>
        </TouchableOpacity>

        {/* Reflection Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>
            Do you want to reflect on your week?
          </Text>
          <TouchableOpacity
            style={styles.talkButton}
            onPress={() => navigation.navigate("SinceLastSpoke")}
          >
            <Text style={styles.talkButtonText}>Let's Talk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    opacity: 0.5,
    pointerEvents: "none",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 200,
    minHeight: 1000,
  },
  // HEADER
  greeting: {
    fontSize: 34,
    fontWeight: "900",
    color: "#3D2817",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#3D2817",
    marginBottom: 24,
    lineHeight: 22,
  },
  calmText: {
    color: "#5A9B93",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  // EVENTS CARD
  eventsCard: {
    backgroundColor: "#5F9B94",
    borderRadius: 28,
    marginBottom: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  eventsTopSection: {
    backgroundColor: "#E8DCC8",
    height: 40,
    paddingLeft: 20,
    justifyContent: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5F9B94",
  },
  timelineDivider: {
    height: 4,
    backgroundColor: "#D4553B",
  },
  eventsMainSection: {
    flexDirection: "row",
    padding: 20,
    minHeight: 180,
  },
  timelineBar: {
    width: 6,
    backgroundColor: "#E8DCC8",
    borderRadius: 3,
    marginRight: 16,
  },
  eventsContent: {
    flex: 1,
    position: "relative",
  },
  // EVENT CARDS
  eventCard1: {
    position: "absolute",
    top: 8,
    left: 0,
    backgroundColor: "#E8DCC8",
    borderRadius: 16,
    padding: 14,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventCard2: {
    position: "absolute",
    bottom: 8,
    right: 0,
    backgroundColor: "#E8DCC8",
    borderRadius: 16,
    padding: 14,
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3D2817",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: "#3D2817",
    opacity: 0.6,
  },
  eventLocation: {
    fontSize: 12,
    color: "#3D2817",
    opacity: 0.6,
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    color: "#3D2817",
    fontSize: 14,
    marginLeft: 8,
  },
  // X BUTTON
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 24,
    marginTop: -20,
    marginBottom: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5A9B93",
    borderWidth: 2.5,
    borderColor: "#3D2817",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  backX: {
    fontSize: 24,
    color: "#3D2817",
    fontWeight: "600",
    marginTop: -2,
  },
  // REFLECTION CARD
  promptContainer: {
    backgroundColor: "#E8DCC8",
    paddingVertical: 36,
    paddingHorizontal: 32,
    borderRadius: 42,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  promptText: {
    color: "#3D2817",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 22,
    textAlign: "center",
    fontWeight: "600",
  },
  talkButton: {
    backgroundColor: "#5A9B93",
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 46,
    borderWidth: 2.5,
    borderColor: "#3D2817",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  talkButtonText: {
    color: "#3D2817",
    fontSize: 16,
    fontWeight: "700",
  },
});
