/**
 * Wizard-of-Oz Service
 *
 * Simulates voice-to-text transcription for user testing.
 * NO real speech recognition - all responses are pre-scripted.
 */

const FAKE_TRANSCRIPTS = [
  "Today was kind of overwhelming, but I pushed through.",
  "I've been feeling really tired lately, like I need a proper break.",
  "This morning was stressful but I handled it pretty well.",
  "I had a meaningful conversation with Jamie that made me feel better.",
  "Work has been exhausting, but I'm trying to stay positive.",
  "I realized I need to set better boundaries with people.",
  "Sometimes I feel like I'm doing too much at once.",
  "I'm proud of how I managed that difficult situation today.",
];

/**
 * Get a random simulated transcript
 * @param {string} override - Optional override for testing
 * @returns {string} Simulated voice transcript
 */
export function getSimulatedTranscript(override = null) {
  if (override && typeof override === 'string') {
    return override;
  }

  const randomIndex = Math.floor(Math.random() * FAKE_TRANSCRIPTS.length);
  return FAKE_TRANSCRIPTS[randomIndex];
}

/**
 * Simulate processing delay (like LLM thinking)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export function simulateProcessingDelay(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wizard-of-Oz Configuration
 */
export const WOZ_CONFIG = {
  LISTENING_DURATION: 3000,  // How long "listening" animation plays (ms)
  PROCESSING_DURATION: 2000, // How long "processing" screen shows (ms)
  DEBUG_MODE: false,         // Set to true to see console logs
};
