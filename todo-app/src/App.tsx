import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/views/TodoList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
