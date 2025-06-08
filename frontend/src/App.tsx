import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { TranslationProvider } from './contexts/TranslationContext'
import LanguageRedirect from './components/LanguageRedirect'
import RouteHandler from './components/RouteHandler'
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
import Contact from './pages/Contact'

function App() {
  return (
    <TranslationProvider>
      <Router>
        <RouteHandler>
          <div className="App">
            <Routes>
            {/* Routes françaises */}
            <Route path="/fr" element={<QuestList />} />
            <Route path="/fr/jeu/:gameId" element={<GameQuest />} />
                          <Route path="/fr/quete/:questId" element={<QuestDetail />} />
            <Route path="/fr/quete/detail" element={<QuestDetail />} />
            <Route path="/fr/social" element={<SocialQuest />} />
            <Route path="/fr/categorie/ashes" element={<AshesQuestCategory />} />
            <Route path="/fr/categorie/ultra" element={<UltraQuestCategory />} />
            <Route path="/fr/categorie/champion" element={<ChampionQuestCategory />} />
            <Route path="/fr/admin/gestion-quetes" element={<QuestManager />} />
            <Route path="/fr/admin/categorie/:category" element={<CategoryManager />} />
            <Route path="/fr/admin/liste-categories/:category" element={<AdminCategoryList />} />
            <Route path="/fr/admin/editeur-quetes/:step" element={<QuestEditor />} />
            <Route path="/fr/admin/editeur-quetes/:questId/:step" element={<QuestEditor />} />
            <Route path="/fr/admin/createur-quetes" element={<QuestCreator />} />
            <Route path="/fr/contact" element={<Contact />} />
            
            <Route path="/en" element={<QuestList />} />
            <Route path="/en/game/:gameId" element={<GameQuest />} />
                          <Route path="/en/quest/:questId" element={<QuestDetail />} />
            <Route path="/en/quest/detail" element={<QuestDetail />} />
            <Route path="/en/social" element={<SocialQuest />} />
            <Route path="/en/category/ashes" element={<AshesQuestCategory />} />
            <Route path="/en/category/ultra" element={<UltraQuestCategory />} />
            <Route path="/en/category/champion" element={<ChampionQuestCategory />} />
            <Route path="/en/admin/quest-manager" element={<QuestManager />} />
            <Route path="/en/admin/category/:category" element={<CategoryManager />} />
            <Route path="/en/admin/category-list/:category" element={<AdminCategoryList />} />
            <Route path="/en/admin/quest-editor/:step" element={<QuestEditor />} />
            <Route path="/en/admin/quest-editor/:questId/:step" element={<QuestEditor />} />
            <Route path="/en/admin/quest-creator" element={<QuestCreator />} />
            <Route path="/en/contact" element={<Contact />} />
            
            <Route path="/de" element={<QuestList />} />
            <Route path="/de/spiel/:gameId" element={<GameQuest />} />
                          <Route path="/de/quest/:questId" element={<QuestDetail />} />
            <Route path="/de/quest/detail" element={<QuestDetail />} />
            <Route path="/de/sozial" element={<SocialQuest />} />
            <Route path="/de/kategorie/ashes" element={<AshesQuestCategory />} />
            <Route path="/de/kategorie/ultra" element={<UltraQuestCategory />} />
            <Route path="/de/kategorie/champion" element={<ChampionQuestCategory />} />
            <Route path="/de/admin/quest-manager" element={<QuestManager />} />
            <Route path="/de/admin/kategorie/:category" element={<CategoryManager />} />
            <Route path="/de/admin/kategorie-liste/:category" element={<AdminCategoryList />} />
            <Route path="/de/admin/quest-editor/:step" element={<QuestEditor />} />
            <Route path="/de/admin/quest-editor/:questId/:step" element={<QuestEditor />} />
            <Route path="/de/admin/quest-ersteller" element={<QuestCreator />} />
            <Route path="/de/kontakt" element={<Contact />} />
            
            {/* Routes sans préfixe pour compatibilité */}
            <Route path="/game/:gameId" element={<LanguageRedirect />} />
                          <Route path="/quest/:questId" element={<LanguageRedirect />} />
            <Route path="/social" element={<LanguageRedirect />} />
            <Route path="/category/ashes" element={<LanguageRedirect />} />
            <Route path="/category/ultra" element={<LanguageRedirect />} />
            <Route path="/category/champion" element={<LanguageRedirect />} />
            <Route path="/admin/quest-manager" element={<LanguageRedirect />} />
            <Route path="/admin/category/:category" element={<LanguageRedirect />} />
            <Route path="/admin/category-list/:category" element={<LanguageRedirect />} />
            <Route path="/admin/quest-editor/:step" element={<LanguageRedirect />} />
            <Route path="/admin/quest-editor/:questId/:step" element={<LanguageRedirect />} />
            <Route path="/admin/quest-creator" element={<LanguageRedirect />} />
            <Route path="/contact" element={<LanguageRedirect />} />
            
            {/* Redirection de la racine vers la langue par défaut */}
            <Route path="/" element={<Navigate to="/fr" replace />} />
          </Routes>
        </div>
        </RouteHandler>
      </Router>
    </TranslationProvider>
  )
}

export default App
