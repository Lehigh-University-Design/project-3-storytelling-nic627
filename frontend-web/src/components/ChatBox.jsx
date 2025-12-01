import { useEffect, useState } from "react";

export default function ChatBox({ message, onTypingComplete }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    onTypingComplete(false); // lock buttons while typing

    let index = 0;

    const type = () => {
      setDisplayedText(message.slice(0, index + 1));
      index++;

      if (index < message.length) {
        setTimeout(type, 35);
      } else {
        onTypingComplete(true); // ✅ unlock buttons when done
      }
    };

    type();
  }, [message, onTypingComplete]);

  return (
    <div className="chat-box">
      {displayedText}
      <span className="cursor">|</span>
    </div>
  );
}
