import './Input.css';
import { PlusCircle } from '@phosphor-icons/react';
import { api } from '../../services/axios';
import { ITask } from '../../interfaces/ITask';

import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';

export function Input() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    api.get('/tasks').then((res) => {
      setTasks(res.data);
      console.log(tasks);
    });
  }, []);

  function handleCreateTask() {
    api.post('/tasks', { description: newTaskDescription }).then((res) => {
      setTasks((tasks) => [...tasks, res.data]);
      setNewTaskDescription('');
    });
  }

  return (
    <div>
      <div className="container">
        <input
          className="text"
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskDescription}
          onChange={(event) => setNewTaskDescription(event.target.value)}
        />
        <button className="button" type="button" onClick={handleCreateTask}>
          Criar <PlusCircle size={18} />
        </button>
      </div>
      <Task tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
