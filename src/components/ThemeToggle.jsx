export default function ThemeToggle({ isLightMode, setIsLightMode }) {
  return (
    <button className="mode-toggle" onClick={() => setIsLightMode((p) => !p)}>
      {isLightMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
