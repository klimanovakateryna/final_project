import { useState, useEffect } from 'react'
import { supabase } from '../api/supabaseClient'
import PostList from '../components/PostList'
import '../styles/Home.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [sortBy])

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data)
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="home-container">
      <h1>SkincareHub</h1>

      <div className="sort-bar">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <PostList posts={filteredPosts} />
    </div>
  )
}

export default Home
