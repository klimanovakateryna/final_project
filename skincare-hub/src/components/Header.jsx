import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/Header.css'

function Header({ setSearchText }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setSearchText(e.target.value)
  }

  // Clear search bar if navigating to non-home pages
  useEffect(() => {
    if (location.pathname !== '/') {
      setSearch('')
      setSearchText('')
    }
  }, [location.pathname, setSearchText])

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => navigate('/')}>SkincareHub</h1>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={handleSearch}
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
