# Wizard-of-Oz Voice Flow - Implementation Guide

## Navigation Flow

```
ReadyToTalk → WoZListening → UserSaid → Processing → Summary
```

---

## Files Created

### 1. `/src/services/wizardOfOz.js`
Fake transcript generator and WoZ configuration.

**Usage:**
```javascript
import { getSimulatedTranscript, WOZ_CONFIG } from '../src/services/wizardOfOz';

const transcript = getSimulatedTranscript();
// Returns: "Today was kind of overwhelming, but I pushed through."
```

---

### 2. `/screens/Reflection/WoZListeningScreen.js`
Simulated listening screen with animated waveform.

**Features:**
- Auto-navigates after 3 seconds
- Animated waveform bars
- Back button to cancel

**Navigation:**
```javascript
navigation.navigate('WoZListening');
```

---

### 3. `/screens/Reflection/UserSaidScreen.js`
Displays the simulated transcript.

**Features:**
- Shows "You said..." with transcript
- "Continue" button → ProcessingScreen

**Receives:**
```javascript
route.params.transcript
```

**Passes to:**
```javascript
navigation.navigate('Processing', { transcript });
```

---

## Files Modified

### 1. `/screens/Reflection/ReadyToTalkScreen.js`

**Change:**
```javascript
const handleStartRecording = () => {
  navigation.navigate('WoZListening'); // ← Changed from 'Listening'
};
```

---

### 2. `/screens/Reflection/ProcessingScreen.js`

**Change:**
```javascript
export default function ProcessingScreen({ navigation, route }) {
  const transcript = route?.params?.transcript || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Summary', { transcript }); // ← Passes transcript
    }, 2000);
  }, [navigation, transcript]);
}
```

---

### 3. `/navigation/AppTabs.js`

**Added:**
```javascript
import WoZListeningScreen from '../screens/Reflection/WoZListeningScreen';
import UserSaidScreen from '../screens/Reflection/UserSaidScreen';

// Inside ReflectStackNavigator:
<ReflectStack.Screen name="WoZListening" component={WoZListeningScreen} />
<ReflectStack.Screen name="UserSaid" component={UserSaidScreen} />
```

---

## Testing the Flow

### 1. Start from HomeScreen
```
Tap "Let's Talk" → SinceLastSpoke → Tap "Talk" → ReadyToTalk
```

### 2. Start Voice Flow
```
Tap microphone button → WoZListening (animated waveform)
```

### 3. Auto-Navigate
```
After 3 seconds → UserSaid (shows fake transcript)
```

### 4. Continue
```
Tap "Continue" → Processing (2 sec delay) → Summary
```

---

## Customization

### Change Listening Duration
```javascript
// src/services/wizardOfOz.js
export const WOZ_CONFIG = {
  LISTENING_DURATION: 5000, // 5 seconds instead of 3
  PROCESSING_DURATION: 2000,
};
```

### Add More Fake Transcripts
```javascript
// src/services/wizardOfOz.js
const FAKE_TRANSCRIPTS = [
  "Today was kind of overwhelming, but I pushed through.",
  "YOUR NEW TRANSCRIPT HERE",
];
```

### Use Custom Transcript (for demos)
```javascript
const customTranscript = "This is a demo message.";
const transcript = getSimulatedTranscript(customTranscript);
```

---

## Debug Mode

Enable logging:
```javascript
// src/services/wizardOfOz.js
export const WOZ_CONFIG = {
  DEBUG_MODE: true,
};
```

Console will show:
```
[WoZ] Generated transcript: "Today was kind of overwhelming..."
[WoZ] Navigating to UserSaid
```

---

## Troubleshooting

### "Cannot find module 'WoZListeningScreen'"
- Make sure you added the import in `AppTabs.js`
- Restart Metro bundler: `npx expo start --clear`

### Waveform Not Animating
- Check that `isListening` state is `true`
- Verify animations are starting in `useEffect`

### Transcript Not Passing
- Check route params: `console.log(route?.params?.transcript)`
- Verify ProcessingScreen passes it to Summary

---

## Next Steps

To replace WoZ with real implementation:

1. **Create Expo dev build**: `npx expo run:ios`
2. **Install speech recognition**: Already installed (`expo-speech-recognition`)
3. **Replace WoZListeningScreen** with real mic input
4. **Remove fake transcripts** and use actual speech-to-text

---

*Ready to test!*
