import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestList } from './pages/QuestList';
import { GameQuest } from './pages/GameQuest';
import { SocialQuest } from './pages/SocialQuest';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestList />} />
        <Route path="/quest/social" element={<SocialQuest />} />
        <Route path="/quest/game" element={<GameQuest />} />
      </Routes>
    </Router>
  );
}

export default App;