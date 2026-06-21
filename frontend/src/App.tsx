
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<TaskForm />} />
        <Route path='/update/:id' element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
