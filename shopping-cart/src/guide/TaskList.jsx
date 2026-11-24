import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function addTask() {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input.trim() }]);
    setInput('');
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;