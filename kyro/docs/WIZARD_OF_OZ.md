# Wizard-of-Oz Implementation

This document explains the simulated features in Kyro and why they are implemented as "Wizard-of-Oz" (WoZ) prototypes.

---

## What is Wizard-of-Oz?

Wizard-of-Oz is a prototyping technique where the system appears to function fully, but certain features are actually **simulated** or **manually controlled** behind the scenes. This allows us to test user experience and interaction patterns **before** investing in complex technical implementation.

---

## Why We Use WoZ in Kyro

### 1. **Voice Transcription Simulation**

**What We're Simulating:**
- Speech-to-text conversion
- Real-time voice recording
- Audio waveform visualization tied to actual sound input

**How It Works:**
- User taps the microphone button
- `WoZListeningScreen` displays an animated waveform (not connected to real audio)
- After 3 seconds, a **pre-written transcript** is automatically selected from a list
- The transcript is displayed on `UserSaidScreen` as if the app "heard" the user

**Why This Approach:**
1. **Technical Constraints**: `expo-speech-recognition` requires a native development build, not available in Expo Go (our primary testing environment)
2. **User Testing Focus**: For CS147, we need to validate the **reflection flow UX**, not the accuracy of speech recognition
3. **Consistency**: Pre-scripted transcripts ensure all testers see similar content, making feedback comparable
4. **Rapid Iteration**: We can test UI/UX patterns without waiting for API integrations

**Code Reference:**
```javascript
// src/services/wizardOfOz.js
export function getSimulatedTranscript(override = null) {
  const FAKE_TRANSCRIPTS = [
    "Today was kind of overwhelming, but I pushed through.",
    "I've been feeling really tired lately...",
    // ... more transcripts
  ];
  return FAKE_TRANSCRIPTS[Math.floor(Math.random() * FAKE_TRANSCRIPTS.length)];
}
```

---

### 2. **Hardcoded Transcripts**

**What We're Simulating:**
- AI-generated reflection summaries
- Personalized insights

**Why:**
- LLM API integration (Gemini/Claude) is not yet connected
- Processing delay is simulated with `setTimeout()`
- Allows us to test how users respond to seeing their reflections formatted and displayed

**Transition Plan:**
Once we have:
- Gemini API keys configured
- Backend endpoint for transcript processing
- Real voice input working

We can replace `getSimulatedTranscript()` with actual API calls.

---

### 3. **Fake "I'm Listening..." Animation**

**What We're Simulating:**
- Audio level detection
- Waveform bars that pulse with voice volume

**Why:**
- Real audio visualization requires native APIs (`expo-av`)
- The visual feedback is what we're testing, not the actual audio processing
- Users understand they are "speaking" even if no actual recording happens

**User Experience:**
- Users see animated waveform bars
- Screen auto-advances after 3 seconds
- Feels like the app is "listening"

---

### 4. **Processing Delay Simulation**

**What We're Simulating:**
- LLM "thinking" time
- Server processing latency

**How It Works:**
```javascript
// ProcessingScreen.js
useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate('Summary', { transcript });
  }, 2000); // 2-second delay
}, []);
```

**Why:**
- Tests user patience during wait states
- Validates whether 2 seconds feels too long/short
- Helps us design appropriate loading UI

---

## What This Lets Us Test

Even with WoZ, we can validate:

✅ **Navigation Flow** - Does the sequence feel logical?
✅ **Emotional Response** - How do users feel when they see their reflection?
✅ **Comprehension** - Do users understand what the app "heard"?
✅ **Engagement** - Do users want to add more reflections?
✅ **UI Clarity** - Are buttons and prompts clear?

❌ We **cannot** test:
- Actual speech recognition accuracy
- Real-time transcription quality
- LLM summary relevance

---

## Justification for CS147

This approach is **pedagogically sound** for CS147 because:

1. **User-Centered Design Focus**: The class emphasizes understanding user needs, not building production systems
2. **Rapid Prototyping**: WoZ lets us test 10x faster than waiting for full implementation
3. **Comparable to Industry Practice**: Companies like Google and Apple use WoZ for early-stage voice assistant testing
4. **Clear Transition Path**: All WoZ elements have documented replacement strategies

---

## How to Enable/Disable WoZ

### Debug Mode
Set `DEBUG_MODE: true` in `src/services/wizardOfOz.js` to see console logs:
```javascript
export const WOZ_CONFIG = {
  LISTENING_DURATION: 3000,
  PROCESSING_DURATION: 2000,
  DEBUG_MODE: true, // ← Enable logging
};
```

### Override Transcript (for testing specific content)
```javascript
const customTranscript = "I want to test this specific message.";
const transcript = getSimulatedTranscript(customTranscript);
```

---

## Transition Roadmap

| WoZ Element | Replacement Strategy | Timeline |
|-------------|---------------------|----------|
| Fake transcripts | Real `expo-speech-recognition` with dev build | Week 8 |
| Hardcoded summaries | Gemini API integration | Week 9 |
| Processing delay | Actual API response time | Week 9 |
| Waveform animation | Real audio levels from mic | Week 10 |

---

## Ethical Considerations

- **Transparency**: Users in testing sessions are informed that voice recognition is simulated
- **No Deception**: This is a prototype, not a production feature
- **Data Privacy**: No real audio is recorded or stored

---

*Last Updated: November 2024*
*For CS147 - Human-Computer Interaction Design*
