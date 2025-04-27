import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Create from './pages/Create'
import Post from './pages/Post'
import Edit from './pages/Edit'
import Header from './components/Header'

function App() {
  const [searchText, setSearchText] = useState('')

  return (
    <BrowserRouter>
      <Header setSearchText={setSearchText} />
      <Routes>
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
