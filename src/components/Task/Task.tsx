import './Task.css';
import { Trash } from '@phosphor-icons/react';

import { api } from '../../services/axios';
import { ITask } from '../../interfaces/ITask';

import { useState, useEffect } from 'react';

interface TaskProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export function Task({ tasks, setTasks }: TaskProps) {
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    api.get('/tasks').then((res) => {
      setTasks(res.data);
    });
  }, [setTasks]);

  const deleteTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      {tasks ? (
        tasks.map((task) => (
          <div className="container-task" key={task.id}>
            <input type="radio" />
            <input
              className="task-area"
              value={task.description}
              onChange={(event) => setTaskDescription(event.target.value)}
            />
            <Trash className="trash" onClick={() => deleteTask(task.id)} />
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}
