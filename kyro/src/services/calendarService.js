/**
 * Calendar Service
 *
 * Fetches events from Google Calendar API using the user's access token.
 */

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

/**
 * Fetch upcoming events from the user's primary calendar
 * @param {string} accessToken - Google OAuth access token
 * @param {number} maxResults - Maximum number of events to fetch (default: 10)
 * @returns {Promise<Array>} Array of calendar events
 */
export async function fetchCalendarEvents(accessToken, maxResults = 10) {
  if (!accessToken) {
    throw new Error("No access token provided");
  }

  const now = new Date().toISOString();
  const params = new URLSearchParams({
    timeMin: now,
    maxResults: String(maxResults),
    singleEvents: "true",
    orderBy: "startTime",
  });

  const response = await fetch(
    `${CALENDAR_API_BASE}/calendars/primary/events?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Failed to fetch calendar events");
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Format a calendar event for display
 * @param {Object} event - Google Calendar event object
 * @returns {Object} Formatted event with title, date, time, etc.
 */
export function formatCalendarEvent(event) {
  const start = event.start?.dateTime || event.start?.date;
  const end = event.end?.dateTime || event.end?.date;
  const isAllDay = !event.start?.dateTime;

  const startDate = new Date(start);
  const endDate = new Date(end);

  return {
    id: event.id,
    title: event.summary || "No title",
    description: event.description || "",
    location: event.location || "",
    start: startDate,
    end: endDate,
    isAllDay,
    startFormatted: isAllDay
      ? startDate.toLocaleDateString()
      : startDate.toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
    timeFormatted: isAllDay
      ? "All day"
      : startDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
    color: event.colorId || "default",
  };
}

/**
 * Fetch and format calendar events
 * @param {string} accessToken - Google OAuth access token
 * @param {number} maxResults - Maximum number of events to fetch
 * @returns {Promise<Array>} Array of formatted calendar events
 */
export async function getFormattedCalendarEvents(accessToken, maxResults = 10) {
  const events = await fetchCalendarEvents(accessToken, maxResults);
  return events.map(formatCalendarEvent);
}
