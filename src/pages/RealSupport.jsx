import { FiAlertCircle, FiHeart, FiMessageCircle, FiGlobe } from "react-icons/fi";
import { FaRibbon } from "react-icons/fa";

import "./RealSupport.css";

export default function RealSupport({ onBack }) {
  return (
    <div className="support-page">
      <div className="support-wrapper">

        <h1 className="support-title">
        <FaRibbon className="ribbon-icon" />
        Real People. Real Support.
        </h1>

        <p className="support-subtitle">
        AI can simulate care, but it cannot replace real human connection.
        These resources connect you with trained people who listen, care,
        and are ready to help you right now.
        </p>


        <div className="support-grid">

          {/* 🚨 CRISIS */}
          <div className="support-card urgent">
            <FiAlertCircle className="support-icon" />
            <h2>Immediate Crisis</h2>
            <p>If you're in danger or feel overwhelmed right now.</p>
            <a href="https://988lifeline.org" target="_blank" rel="noreferrer">
              <b>Call or Text 988</b>
            </a>
          </div>

          {/* 🧠 NAMI */}
          <div className="support-card">
            <FiHeart className="support-icon" />
            <h2>Mental Health Support</h2>
            <p>Community, education, and recovery resources.</p>
            <a href="https://www.nami.org" target="_blank" rel="noreferrer">
              <b>Visit NAMI</b>
            </a>
          </div>

          {/* 💬 COUNSELING */}
          <div className="support-card">
            <FiMessageCircle className="support-icon" />
            <h2>Affordable Counseling</h2>
            <p>Find free or low-cost therapy options near you.</p>
            <a href="https://www.opencounseling.com" target="_blank" rel="noreferrer">
              <b>Find Counseling</b>
            </a>
          </div>

          {/* 🌍 GLOBAL */}
          <div className="support-card">
            <FiGlobe className="support-icon" />
            <h2>Global Resources</h2>
            <p>If you live outside the United States.</p>
            <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
              <b>Find a Helpline</b>
            </a>
          </div>

        </div>

        <button className="support-back" onClick={onBack}>
         Back to Friend AI
        </button>
      </div>
    </div>
  );
}
