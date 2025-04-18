export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-700 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">AI Productivity Dashboard</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Toggle Theme</button>
    </header>
  );
}
