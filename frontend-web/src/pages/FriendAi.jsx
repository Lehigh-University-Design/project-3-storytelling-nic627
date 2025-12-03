import { useEffect, useState } from "react";
import "./FriendAi.css";

export default function FriendAi({ onGoSupport }) {

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.classList.remove("bg-hue");
    document.body.classList.add("bg-normal");
  }, []);

  return (
    <div className="friend-container">
      <div
        className={`friend-gallery ${hovered ? "hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/*  PHOTOS*/}
        <img className="floating-photo fp-1" src="/images/friend2.jpg" />
        <img className="floating-photo fp-2" src="/images/friend3.avif" />
        <img className="floating-photo fp-3" src="/images/friend4.jpeg" />

        {/*   MAIN IMAGE */}
        <img
          src="/images/friend1.webp"
          className="friend-main"
        />

        {/*   RIGHT SIDE TEXT */}
        <div className="friend-info">
          <h1>What is Friend AI?</h1>
          <p><b>Friend AI</b> is a controversial AI chatbot. It creates the illusion of real emotional connection
             without any true awareness or genuine care. These marketing posters where seen 
             in the New York City Subway station. Lots of people were upset and vandalized the posters
             due to the company profitting off of people's mental health. People can become emotionally attached to 
             it and begin to rely on it instead of building real human relationships. This can be 
             especially harmful for users who are already lonely or struggling with mental health. 
             There are also serious privacy concerns, since deeply personal conversations are stored,
             analyzed, and potentially used for profit. The core danger is that Friend AI feels 
             supportive and understanding, while in reality it is just following programmed responses.</p>
             <button onClick={onGoSupport}>
                Get Real Support
            </button>

        </div>
      </div>
    </div>
  );
}
