import { useState, useEffect } from 'react'
import { supabase } from '../api/supabaseClient'
import PostList from '../components/PostList'
import '../styles/Home.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState('created_at')

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

  return (
    <div className="home-container">
      <h1>SkincareHub 🧴✨</h1>

      <div className="sort-bar">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <PostList posts={posts} />
    </div>
  )
}

export default Home
