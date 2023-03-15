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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks').then((res) => {
      setTasks(res.data);
    });
  }, [setTasks]);

  const handleTaskComplete = async (taskId: string, isCompleted: boolean) => {
    if (isCompleted) {
      await api.patch(`/tasks/${taskId}`, { completed: true });
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: true };
          }
          return task;
        })
      );
    } else {
      await api.patch(`/tasks/${taskId}`, { completed: false });
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: false };
          }
          return task;
        })
      );
    }
  };

  const deleteTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      {tasks ? (
        tasks.map((task) => (
          <div
            className={`container-task ${
              task.completed ? 'task-completed' : ''
            }`}
            key={task.id}
          >
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskComplete(task.id, !task.completed)}
              />
            </label>

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
