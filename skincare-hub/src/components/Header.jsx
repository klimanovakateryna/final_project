import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  )
}

export default Header
