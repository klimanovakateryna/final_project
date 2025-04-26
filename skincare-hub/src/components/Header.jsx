import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Header.css'

function Header({ onSearch }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(search)
  }

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => navigate('/')}>SkincareHub</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </form>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
