import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Notes from "./Pages/Notes";
import Pomodoro from "./Pages/Pomodoro";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Persist dark mode setting in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("darkMode", "true");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("darkMode", "false");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Layout>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold">AI Productivity Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </Layout>
  );
}

export default App;
