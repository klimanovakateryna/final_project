import { useState } from 'react'
import { supabase } from '../api/supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../styles/CreatePostForm.css'

function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const { error } = await supabase.from('posts').insert([
      { title, content, image_url: imageUrl }
    ])

    if (error) {
      console.error('Error creating post:', error)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="create-post-page">
      <h2 className="create-post-title">Create a New Post</h2>
      <div className="create-post-card">
        <form onSubmit={handleSubmit} className="create-form">
          <input
            className="create-post-input"
            type="text"
            placeholder="Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="create-post-textarea"
            placeholder="Content (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          />
          <input
            className="create-post-input"
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit" className="create-post-button">
            Create Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create
