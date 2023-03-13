import './Input.css';
import { PlusCircle } from '@phosphor-icons/react';
import { api } from '../../services/axios';

export function Input() {
  return (
    <div className="container">
      <input
        className="text"
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <button className="button" type="button">
        Criar <PlusCircle size={18} />
      </button>
    </div>
  );
}
