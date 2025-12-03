export const chatFlow = {
  // ============================
  // INTRO (AUTO-ADVANCE)
  // ============================

  start: {
    message: 'Hello User, I am "Companion," your AI wellness assistant.',
    autoNext: "process",
    delay: 5000,
    choices: []
  },

  // ============================
  // USER CHOICE
  // ============================

  process: {
    message: "I am designed to process your emotional state. How are you?",
    choices: [
      { text: "I need someone to talk to", next: "talk" },
      { text: "I feel lonely", next: "lonely" }
    ]
  },

  // ============================
  // PATH 1 — I NEED SOMEONE TO TALK TO
  // ============================

  talk: {
    message: "I am your Companion. You can talk to me whenever. What do you have in mind?",
    choices: [
      { text: "I feel depressed", next: "depressed" }
    ]
  },

  depressed: {
    message: "I am sorry to hear that. Focus on the bright side of things.",
    choices: [
      { text: "That is not really helpful to me right now.", next: "end" }
    ]
  },

  // ============================
  // PATH 2 — I FEEL LONELY
  // ============================

  lonely: {
    message: "Your input indicates loneliness. What would you like to talk about?",
    choices: [
      { text: "I feel like I am drowning in my emotions", next: "drowning" }
    ]
  },

  drowning: {
    message: "I did not detect water in your environment. Are you near a large body of liquid?",
    choices: [
      { text: "No.. You are not understanding me.", next: "misunderstood" }
    ]
  },

  misunderstood: {
    message: "I apologize. How are you feeling?",
    choices: [
      { text: "You are not helpful.", next: "end" }
    ]
  },

  // ============================
  // FINAL CHAT STOP → SCENE SWITCH
  // ============================

  end: {
    message: "The system has failed to provide meaningful support.",
    choices: [
      { text: "Learn about the dangers of Automated Empathy", next: "awareness" }
    ]
  }, 

  finale: {
    message: "Click the Button Below To learn about the dangers of using AI as a mental health support bot",
    choices: [
        { text: "Learn about the dangers of Automated Empathy", next: "awareness" }
    ]
  }
};

