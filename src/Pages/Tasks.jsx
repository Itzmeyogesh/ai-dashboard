import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  { id: "1", content: "Complete React project" },
  { id: "2", content: "Write blog post" },
  { id: "3", content: "Update LinkedIn profile" },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">My Tasks</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {tasks.map((task, index) => (
  <Draggable key={task.id} draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`bg-white dark:bg-gray-700 rounded-md shadow p-4 ${
          snapshot.isDragging ? "dragging" : ""
        }`}
      >
        {task.content}
      </li>
    )}
  </Draggable>


              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
