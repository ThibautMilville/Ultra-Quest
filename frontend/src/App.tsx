import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import QuestList from './views/QuestList'
import GameQuest from './views/GameQuest'
import SocialQuest from './views/SocialQuest'
import QuestDetail from './components/QuestDetail'
import AshesQuestCategory from './views/AshesQuestCategory'
import UltraQuestCategory from './views/UltraQuestCategory'
import ChampionQuestCategory from './views/ChampionQuestCategory'
import QuestManager from './views/QuestManager'
import CategoryManager from './views/CategoryManager'
import AdminCategoryList from './views/AdminCategoryList'
import QuestEditor from './views/QuestEditor'
import QuestCreator from './views/QuestCreator'

function App() {
  return (
    <Router basename="/ultra-quest">
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestList />} />
          <Route path="/game/:gameId" element={<GameQuest />} />
          <Route path="/quest/:questId" element={<QuestDetail />} />
          <Route path="/quest/detail" element={<QuestDetail />} />
          <Route path="/social" element={<SocialQuest />} />
          <Route path="/category/ashes" element={<AshesQuestCategory />} />
          <Route path="/category/ultra" element={<UltraQuestCategory />} />
          <Route path="/category/champion" element={<ChampionQuestCategory />} />
          <Route path="/admin/quest-manager" element={<QuestManager />} />
          <Route path="/admin/category/:category" element={<CategoryManager />} />
          <Route path="/admin/category-list/:category" element={<AdminCategoryList />} />
          <Route path="/admin/quest-editor/:step" element={<QuestEditor />} />
          <Route path="/admin/quest-creator" element={<QuestCreator />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
