export default function ChoiceButtons({ choices, onSelect, disabled }) {
  return (
    <div className="choices">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(choice.next)}
          disabled={disabled}
          style={{
            pointerEvents: disabled ? "none" : "auto",
            opacity: disabled ? 0.5 : 1
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
