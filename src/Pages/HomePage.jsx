import CardGrid from "../components/CardGrid";
import ThemeToggle from "../components/ThemeToggle";
import useTours from "../hooks/useTours";
import useTheme from "../hooks/useTheme";

function HomePage() {
  const [isLightMode, setIsLightMode] = useTheme(false);
  const { status, results, tours } = useTours();

  return (
    <>
      <ThemeToggle isLightMode={isLightMode} setIsLightMode={setIsLightMode} />

      {status === "loading" ? (
        <p className="loading">Loading tours…</p>
      ) : (
        <CardGrid status={status} results={results} tours={tours} />
      )}
    </>
  );
}

export default HomePage
