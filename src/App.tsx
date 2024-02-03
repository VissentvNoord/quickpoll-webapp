import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Poll from './routes/Poll';
import NewPoll from './routes/CreatePoll';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/:id" element={<Poll />} />
            <Route path="/" element={<NewPoll />} />
        </Routes>
    </Router>
    );
}

export default App;
