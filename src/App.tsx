import { Input } from './components/Input/Input';
import { Task } from './components/Task/Task';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="../src/assets/Logo.svg" />
      </div>
      <Input />
      <Task />
    </div>
  );
}

export default App;
