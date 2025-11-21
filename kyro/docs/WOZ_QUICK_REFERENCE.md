# WoZ Voice Flow - Quick Reference

## 🎯 Complete Navigation Flow

```
ReadyToTalk
    ↓ (tap mic)
WoZListening (3 sec animation)
    ↓ (auto)
UserSaid (shows transcript)
    ↓ (tap Continue)
Processing (2 sec delay)
    ↓ (auto)
Summary (final display)
```

---

## 📁 New Files

| File | Purpose |
|------|---------|
| `src/services/wizardOfOz.js` | Fake transcript generator |
| `screens/Reflection/WoZListeningScreen.js` | Animated "listening" screen |
| `screens/Reflection/UserSaidScreen.js` | Shows simulated transcript |
| `docs/WIZARD_OF_OZ.md` | Full justification document |
| `docs/WOZ_VOICE_FLOW.md` | Implementation guide |

---

## 🔧 Modified Files

| File | Change |
|------|--------|
| `ReadyToTalkScreen.js` | Mic button → `WoZListening` |
| `ProcessingScreen.js` | Passes `transcript` to Summary |
| `navigation/AppTabs.js` | Added 2 new routes |

---

## 💡 Key Functions

### Get Random Transcript
```javascript
import { getSimulatedTranscript } from '../src/services/wizardOfOz';
const transcript = getSimulatedTranscript();
```

### Navigate with Transcript
```javascript
navigation.navigate('UserSaid', { transcript: "Your text here" });
```

### Access Transcript in Next Screen
```javascript
const transcript = route?.params?.transcript || '';
```

---

## ⏱️ Timing Configuration

```javascript
// src/services/wizardOfOz.js
export const WOZ_CONFIG = {
  LISTENING_DURATION: 3000,  // WoZListening screen
  PROCESSING_DURATION: 2000, // Processing screen
};
```

---

## 🎨 Design Tokens Used

All screens use:
- `COLORS.primaryTeal` (#5A9B93)
- `COLORS.darkBrown` (#3D2817)
- `COLORS.paperBeige` (#E8DCC8)
- `GRADIENTS.primary`
- Paper texture background

---

## 🧪 Testing Checklist

- [ ] Tap mic button on ReadyToTalk
- [ ] See animated waveform on WoZListening
- [ ] Auto-navigate after 3 seconds
- [ ] See transcript on UserSaid
- [ ] Tap "Continue" button
- [ ] See "Interesting..." on Processing
- [ ] See summary with transcript

---

## 🐛 Common Issues

**Metro bundler error?**
```bash
npx expo start --clear
```

**Transcript not showing?**
- Check `console.log(route?.params?.transcript)` in each screen

**Navigation stuck?**
- Verify all routes added to `AppTabs.js`

---

## 📝 Demo Script

> "When I tap the microphone, the app starts listening. You'll see the waveform animating—this simulates real-time voice capture. After a few seconds, it processes what I said and shows me a summary. Right now, it's using pre-written transcripts, but the flow is exactly how it will work with real voice input."

---

## 🚀 Next Steps

1. Test the flow end-to-end
2. Get user feedback on timing (3 sec too long?)
3. Test with different fake transcripts
4. Replace with real speech recognition when dev build is ready

---

*For questions, see `WOZ_VOICE_FLOW.md` or `WIZARD_OF_OZ.md`*
