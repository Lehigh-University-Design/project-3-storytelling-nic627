import "./Informational.css";

export default function Informational() {
  return (
    <>
      <section className="context-section">
        <p>
          AI can respond to words, but it cannot understand the person behind
          them. When someone is struggling, they need connection, care, and
          human presence.
        </p>

        <p>
          An automated system can miss warning signs, misunderstand context, or
          give responses that feel empty and confusing. These small failures can
          matter in serious ways.
        </p>
      </section>

      <section className="cases-section">
        <div className="case-card">
          <h3>Misread Crisis Language</h3>
          <p>AI failed to interpret suicide-prevention language properly.</p>
        </div>

        <div className="case-card">
          <h3>Emotional Dependency</h3>
          <p>Users formed unhealthy emotional attachment to bots.</p>
        </div>

        <div className="case-card">
          <h3>False Reassurance</h3>
          <p>Serious distress met with shallow optimism.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Real support comes from real people.</h2>
        <ul>
          <li>Friends & family</li>
          <li>Campus counseling</li>
          <li>Licensed therapists</li>
          <li>988 Suicide & Crisis Lifeline</li>
        </ul>
      </section>
    </>
  );
}
