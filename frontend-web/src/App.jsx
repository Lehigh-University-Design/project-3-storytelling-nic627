import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { chatFlow } from "./data/script";
import ChatBox from "./components/ChatBox";
import ChoiceButtons from "./components/ChoiceButtons";
import Awareness from "./components/Awareness";
import FriendAi from "./pages/FriendAi";
import RealSupport from "./pages/RealSupport";


import "./App.css";

export default function App() {
  //   WORLD STATE
  const [scene, setScene] = useState("chat"); // "chat" | "awareness" | "friend"

  //   CHAT STATE
  const [chatStep, setChatStep] = useState("start");

  //   LOCK BUTTONS WHILE TYPING
  const [canClick, setCanClick] = useState(false);

  //   SWITCH BACKGROUND WHEN STORY ENDS
  useEffect(() => {
    if (chatStep === "end") {
      document.body.classList.remove("bg-normal");
      document.body.classList.add("bg-hue");
    } else {
      document.body.classList.remove("bg-hue");
      document.body.classList.add("bg-normal");
    }
  }, [chatStep]);

  useEffect(() => {
    document.body.classList.add("bg-normal");
  }, []);

  const stepData = chatFlow[chatStep];

  //   AUTO-ADVANCE — ONLY WHEN IN CHAT WORLD
  useEffect(() => {
    if (scene !== "chat") return;
    if (!stepData?.autoNext) return;

    const timer = setTimeout(() => {
      setChatStep(stepData.autoNext);
    }, stepData.delay || 1500);

    return () => clearTimeout(timer);
  }, [chatStep, stepData, scene]);

  if (!stepData && scene === "chat") {
    return <div>ERROR: Invalid chat step.</div>;
  }

  return (
    <div className="app">

  {/*   DEV TOGGLE — OUTSIDE AnimatePresence */}
  <div className="dev-toggle">
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={scene === "awareness"}
        onChange={(e) => {
          setScene(e.target.checked ? "awareness" : "chat");
        }}
      />
      <span className="slider" />
    </label>
  </div>

  {/*   ONLY SCENES HERE */}
  <AnimatePresence>

    {scene === "chat" && (
      <motion.div
        key="chat"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
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
                if (next === "awareness") {
                  setScene("awareness");
                } else {
                  setChatStep(next);
                }
              }}
            />
          )}
        </div>
      </motion.div>
    )}

    {scene === "awareness" && (
      <motion.div
        key="awareness"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Awareness
          onGoFriend={() => {
            setTimeout(() => {
              setScene("friend");
            });
          }}
        />
      </motion.div>
    )}

    {scene === "friend" && (
      <motion.div
        key="friend"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FriendAi onGoSupport={() => setScene("support")} />
      </motion.div>
    )}

    {scene === "support" && (
      <motion.div
        key="support"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <RealSupport onBack={() => setScene("friend")} />
      </motion.div>
    )}


  </AnimatePresence>
</div>

  );
}
