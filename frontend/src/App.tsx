import {useEffect, useState} from 'react'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QuestList} from './views/QuestList'
import {GameQuest} from './views/GameQuest'
import {SocialQuest} from './views/SocialQuest'
import {apiRequestor} from './utils/axiosInstanceHelper'

function App() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiRequestor
      .get<{message: string}>('/test')
      .then(response => setMessage(response.data.message))
      .catch(err => setError(err.message))
  }, [])

  return (
    <Router basename='/ultra-quest'>
      <Routes>
        <Route path='/' element={<QuestList />} />
        <Route path='/quest/social' element={<SocialQuest />} />
        <Route path='/quest/game' element={<GameQuest />} />
      </Routes>
    </Router>
  )
}

export default App
