import { useEffect, useState } from "react";
import "./Awareness.css";


function TypewriterWord({ text, speed = 80, size = "80px", color = "black" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div
      className="typeword"
      style={{
        fontSize: size,
        color: color
      }}
    >
      {displayed}
    </div>
  );
}

export default function Awareness() {
  return (
    <div className="awareness-wrapper">
      <section className="danger-panel words-layout">

        <TypewriterWord
          text="AI"
          speed={90}
          size="140px"
          color="black"
        />

        <TypewriterWord
          text="IS"
          speed={90}
          size="70px"
          color="black"
        />

        <TypewriterWord
          text="NOT"
          speed={90}
          size="120px"
          color="#0047ff"   // blue emphasis
        />

        <TypewriterWord
          text="YOUR"
          speed={90}
          size="60px"
          color="black"
        />

        <TypewriterWord
          text="FRIEND"
          speed={90}
          size="120px"
          color="black"
        />

      </section>
    </div>
  );
}
