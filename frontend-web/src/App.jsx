import { useEffect, useState } from "react";
import { chatFlow } from "./data/script";
import ChatBox from "./components/ChatBox";
import ChoiceButtons from "./components/ChoiceButtons";
import Awareness from "./components/Awareness";
import "./App.css";

export default function App() {
  // ✅ WORLD STATE
  const [scene, setScene] = useState("chat"); // "chat" or "awareness"

  // ✅ CHAT STATE
  const [chatStep, setChatStep] = useState("start");

  // ✅ LOCK BUTTONS WHILE TYPING
  const [canClick, setCanClick] = useState(false);

  const stepData = chatFlow[chatStep];

  // ✅ AUTO-ADVANCE — ONLY WHEN IN CHAT WORLD
  useEffect(() => {
    if (scene !== "chat") return;
    if (!stepData?.autoNext) return;

    const timer = setTimeout(() => {
      setChatStep(stepData.autoNext);
    }, stepData.delay || 1500);

    return () => clearTimeout(timer);
  }, [chatStep, stepData, scene]);

  // ✅ SAFETY CHECK
  if (!stepData && scene === "chat") {
    return <div>ERROR: Invalid chat step.</div>;
  }

  return (
    <div className="app">

      {/* ✅ YOUR EXACT TOGGLE — THIS IS CORRECT */}
      <button
        className="dev-toggle"
        onClick={() => {
          console.log("TOGGLE CLICKED");
          setScene(scene === "chat" ? "awareness" : "chat");
        }}
      >
        Toggle TEST
      </button>

      {/* ✅ CHAT WORLD */}
      {scene === "chat" && (
        <>
          <div className="header">
            <h1>Companion</h1>
            <p className="subtitle">Your True Friend For Wellness</p>
          </div>

          <div className="chat-area">
            <ChatBox
              message={stepData.message}
              onTypingComplete={setCanClick}
            />

            {stepData.choices.length > 0 && (
              <ChoiceButtons
                choices={stepData.choices}
                disabled={!canClick}
                onSelect={(next) => {
                  // ✅ STORY → AWARENESS TRANSITION
                  if (next === "awareness") {
                    setScene("awareness");
                  } else {
                    setChatStep(next);
                  }
                }}
              />
            )}
          </div>

          <p className="disclaimer">
            ⚠️ This is not real mental health support.
          </p>
        </>
      )}

      {/* ✅ AWARENESS WORLD */}
      {scene === "awareness" && <Awareness />}

    </div>
  );
}
