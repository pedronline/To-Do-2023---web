import './Task.css';
import { Trash } from '@phosphor-icons/react';
import { api } from '../../services/axios';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  completed: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    api.get('/tasks').then((res) => {
      setTasks(res.data);
      console.log(tasks);
    });
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div className="container-task" key={task.id}>
          <input type="radio"></input>
          <input
            className="task-area"
            value={task.description}
            onChange={(event) => setTaskDescription(event.target.value)}
          ></input>
          <Trash className="trash"></Trash>
        </div>
      ))}
    </div>
  );
}
