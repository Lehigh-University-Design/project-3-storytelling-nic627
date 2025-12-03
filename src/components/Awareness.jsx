import { useEffect, useState, useMemo } from "react";
import "./Awareness.css";

/*   ORIGINAL ONE-TIME TYPEWRITER (UNCHANGED) */
function TypeWord({ text, delay = 0, className }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    let interval;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisibleText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(interval);
        }
      }, 80);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={`word ${className}`}>{visibleText}</span>;
}

/*   ORIGINAL LOOPING TYPEWRITER WITH DELETING (UNCHANGED) */
function LoopingTypeWord({ words, delay = 0 }) {
  const [visibleText, setVisibleText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout;

    // Initial delay before first word
    if (visibleText === "" && !isDeleting) {
      timeout = setTimeout(() => {
        setVisibleText(currentWord.text.slice(0, 1));
      }, delay);
      return () => clearTimeout(timeout);
    }

    // Typing
    if (!isDeleting && visibleText.length < currentWord.text.length) {
      timeout = setTimeout(() => {
        setVisibleText(
          currentWord.text.slice(0, visibleText.length + 1)
        );
      }, 80);
    }

    // Pause before deleting
    else if (!isDeleting && visibleText.length === currentWord.text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    }

    // Deleting
    else if (isDeleting && visibleText.length > 0) {
      timeout = setTimeout(() => {
        setVisibleText(
          currentWord.text.slice(0, visibleText.length - 1)
        );
      }, 50);
    }

    // Switch to next word
    else if (isDeleting && visibleText.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [visibleText, isDeleting, currentWord, delay, words.length]);

  return (
    <span className={`word ${currentWord.className}`}>
      {visibleText}
    </span>
  );
}

/*   AWARENESS */
export default function Awareness({ onGoFriend }) {
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [showPhoto, setShowPhoto] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  /*   MEMOIZED WORD LIST */
  const loopingWords = useMemo(() => [
    { text: "FRIEND", className: "friend" },
    { text: "THERAPIST", className: "therapist" },
  ], []);

  /*   CAMERA PARALLAX */
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setCamera({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /*   PHOTO APPEARS AFTER 5 SECONDS */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhoto(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="danger-panel">

      {/*   PARALLAX BACKGROUND */}
      <div
        className="awareness-bg"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(1.08)`
        }}
      />

      {/*   PHOTO: DELAY → APPEAR → HOVER GROW → CLICK PORTAL */}
      {showPhoto && (
        <div
          className={`photo-button ${isZooming ? "photo-zoom-in" : ""}`}
          onMouseUp={() => {
            setIsZooming(true);   //   start BIG portal zoom
            onGoFriend();        //   App handles delayed scene switch
          }}
        >
          <img src="/images/friend1.webp" alt="Portal" />
        </div>
      )}

      {/*   FOREGROUND TEXT */}
      <div
        className="words-layout"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`
        }}
      >
        <TypeWord text="AI" delay={0} className="ai" />
        <TypeWord text="is" delay={600} className="is" />
        <TypeWord text="NOT" delay={1100} className="not" />
        <TypeWord text="your" delay={1800} className="your" />

        <LoopingTypeWord
          delay={2500}
          words={loopingWords}
        />
      </div>
    </div>
  );
}
