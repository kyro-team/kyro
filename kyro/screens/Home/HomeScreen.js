/**
 * HomeScreen
 *
 * GOAL: Display the main dashboard after login with personalized greeting and recent activities.
 * Shows the user's name, time-based greeting, and a summary of recent events/memories.
 * Provides quick access to start a reflection session.
 *
 * Key Features:
 * - Personalized greeting ("Hello Gabriella")
 * - Time-aware message (e.g., "pretty calm morning today")
 * - Recent activities/events list from Google Calendar
 * - "Do you want to reflect on your week?" prompt
 * - "Let's talk" CTA button to start reflection
 * - Bottom navigation (Reflect, Chat, Share icons)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { getFormattedCalendarEvents } from '../../src/services/calendarService';

export default function HomeScreen({ navigation }) {
  const { user, accessToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  // Get user's first name
  const firstName = user?.displayName?.split(' ')[0] || 'there';

  // Get time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  // Fetch calendar events
  useEffect(() => {
    async function loadEvents() {
      if (!accessToken) return;

      setLoadingEvents(true);
      setEventsError(null);

      try {
        const calendarEvents = await getFormattedCalendarEvents(accessToken, 5);
        setEvents(calendarEvents);
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
        setEventsError(error.message);
      } finally {
        setLoadingEvents(false);
      }
    }

    loadEvents();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hello {firstName},</Text>
        <Text style={styles.subtitle}>
          {events.length === 0
            ? `Looks like you have a pretty calm ${getTimeGreeting()} today.`
            : `Here's what's coming up this ${getTimeGreeting()}.`}
        </Text>

        {/* Calendar Events */}
        <View style={styles.activitiesContainer}>
          {loadingEvents ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.loadingText}>Loading your calendar...</Text>
            </View>
          ) : eventsError ? (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>Unable to load calendar</Text>
            </View>
          ) : events.length === 0 ? (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>No upcoming events</Text>
            </View>
          ) : (
            events.map((event) => (
              <View key={event.id} style={styles.activityItem}>
                <Text style={styles.eventTime}>{event.timeFormatted}</Text>
                <Text style={styles.activityText}>{event.title}</Text>
                {event.location ? (
                  <Text style={styles.eventLocation}>{event.location}</Text>
                ) : null}
              </View>
            ))
          )}
        </View>

        {/* Reflection Prompt */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Do you want to reflect on your week?</Text>
          <TouchableOpacity
            style={styles.talkButton}
            onPress={() => navigation.navigate('SinceLastSpoke')}
          >
            <Text style={styles.talkButtonText}>Let's talk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CB342',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 24,
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  eventTime: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  eventLocation: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.9,
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  talkButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  talkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
  },
});
