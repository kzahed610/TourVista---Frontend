import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="content-container">
      <Header />
      {/* FIX: The App component now defines the application's pages using the <Routes> and <Route> components. */}
      {/* WHY: <Routes> is a container that ensures only one route is rendered at a time. Each <Route> acts as a rule that maps a URL path to a specific component. */}
      {/* For example, when the URL is "/", the <HomePage /> component is rendered. When it's "/login", <LoginPage /> is rendered. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
