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
    const { data, error } = await supabase
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
    <div className="home-page">
      <div className="home-container">
        <div className="sort-bar">
          <button
            onClick={() => setSortBy('created_at')}
            className={sortBy === 'created_at' ? 'sort-button active' : 'sort-button'}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('upvotes')}
            className={sortBy === 'upvotes' ? 'sort-button active' : 'sort-button'}
          >
            Most Popular
          </button>
        </div>

        <PostList posts={filteredPosts} />
      </div>
    </div>
  )
}

export default Home
