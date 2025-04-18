import { Link } from "react-router-dom";
import { FaTasks, FaStickyNote, FaClock, FaHome } from "react-icons/fa";

const navItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Tasks", icon: <FaTasks />, path: "/tasks" },
  { name: "Notes", icon: <FaStickyNote />, path: "/notes" },
  { name: "Pomodoro", icon: <FaClock />, path: "/pomodoro" },
];

export default function Sidebar() {
  return (
    <div className="w-60 bg-white dark:bg-gray-800 p-4 shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className="flex items-center space-x-3 hover:text-blue-500">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
