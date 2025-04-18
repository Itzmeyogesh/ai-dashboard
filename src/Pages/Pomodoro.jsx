import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [goalPomodoros, setGoalPomodoros] = useState(4);
  const [sortOption, setSortOption] = useState("Priority");

  // Sound files
  const workAlarmSound = new Audio("/sounds/work-alarm.mp3");
  const breakAlarmSound = new Audio("/sounds/break-alarm.mp3");
  const extendedBreakSound = new Audio("/sounds/extended-break.mp3");

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Calculate progress percentage
  const totalTime = 25 * 60;
  const timeRemaining = minutes * 60 + seconds;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  // Start or stop the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset the timer
  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
  };

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = { 
        name: newTask, 
        pomodoros: 0, 
        completed: false, 
        goal: goalPomodoros, // Store goalPomodoros for each task
        priority: "Medium" // Default priority
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  // Update task Pomodoro count
  const updateTaskPomodoros = (taskIndex) => {
    const updatedTasks = [...tasks];
    if (!updatedTasks[taskIndex].completed) {
      updatedTasks[taskIndex].pomodoros += 1;
    }
    if (updatedTasks[taskIndex].pomodoros >= updatedTasks[taskIndex].goal) {
      updatedTasks[taskIndex].completed = true;
    }
    setTasks(updatedTasks);
  };

  // Timer logic
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);

            // Check if it's a work session or break session
            if (isBreak) {
              if (pomodoroCount === 4) {
                extendedBreakSound.play();
                alert("Extended break session completed! Start another Pomodoro.");
                resetTimer();
                setPomodoroCount(0);
              } else {
                breakAlarmSound.play();
                alert("Break session completed! Start another Pomodoro.");
                setIsBreak(false);
                setMinutes(25);
                setSeconds(0);
              }
            } else {
              workAlarmSound.play();
              setIsBreak(true);
              if (pomodoroCount === 3) {
                setMinutes(15); // Extended break after 4 Pomodoros
                setSeconds(0);
              } else {
                setMinutes(5); // Regular break
                setSeconds(0);
              }
              setPomodoroCount(pomodoroCount + 1);
              if (selectedTaskIndex !== null) {
                updateTaskPomodoros(selectedTaskIndex);
              }
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak, pomodoroCount, tasks, selectedTaskIndex]);

  // Handle change in task goal
  const handleGoalChange = (index, goal) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].goal = goal;
    setTasks(updatedTasks);
  };

  // Handle change in task priority
  const handlePriorityChange = (index, priority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = priority;
    setTasks(updatedTasks);
  };

  // Sort tasks by the selected option
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "Priority") {
      const priorities = { High: 3, Medium: 2, Low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    } else if (sortOption === "Pomodoros") {
      return b.pomodoros - a.pomodoros;
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-6 px-4 sm:px-8 md:px-12 lg:px-16">
      <h2 className="text-3xl font-bold mb-4">
        {isBreak ? (pomodoroCount === 4 ? "Extended Break Time" : "Break Time") : "Pomodoro Timer"}
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          style={{ width: `${progress}%` }}
          className="bg-green-600 h-4 rounded-full"
        ></div>
      </div>

      {/* Timer Display */}
      <div className="text-6xl font-semibold mt-4">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      {/* Buttons */}
      <div className="space-x-4 mt-4">
        <button
          onClick={toggleTimer}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500"
        >
          Reset
        </button>
      </div>

      {/* Task Management */}
      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-2xl font-semibold mb-4">Your Tasks</h3>

        {/* Sort Tasks */}
        <div className="flex justify-between mb-4">
          <select
            className="px-4 py-2 border rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Priority">Sort by Priority</option>
            <option value="Pomodoros">Sort by Pomodoros Completed</option>
          </select>
        </div>

        {/* Task Input */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {sortedTasks.map((task, index) => (
            <li key={index} className={`flex justify-between items-center ${task.completed ? 'bg-gray-300' : ''}`}>
              <div className="text-xl">{task.name}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-gray-500 ${task.completed ? 'line-through' : ''}`}>Pomodoros: {task.pomodoros}</span>

                {/* Priority Dropdown */}
                <select
                  className="px-3 py-1 rounded-md"
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                {/* Goal Input */}
                <input
                  type="number"
                  value={task.goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  className="px-3 py-1 w-16 border rounded-md"
                  min="1"
                />

                <button
                  onClick={() => {
                    setSelectedTaskIndex(index);
                    setMinutes(25);
                    setSeconds(0);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Work on Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
