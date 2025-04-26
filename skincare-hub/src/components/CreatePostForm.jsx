import { useState } from 'react'
import { supabase } from '../api/supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../styles/CreatePostForm.css'

function CreatePostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      alert('Title is required!')
      return
    }

    const { data, error } = await supabase.from('posts').insert([
      {
        title: title,
        content: content,
        image_url: imageUrl,
      },
    ])

    if (error) {
      console.error('Error creating post:', error)
      alert('Something went wrong!')
    } else {
      console.log('Post created:', data)
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">
        Create Post
      </button>
    </form>
  )
}

export default CreatePostForm
