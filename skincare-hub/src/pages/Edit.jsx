import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'
import '../styles/CreatePostForm.css'

function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
    } else {
      setTitle(data.title)
      setContent(data.content || '')
      setImageUrl(data.image_url || '')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        image_url: imageUrl
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating post:', error)
    } else {
      navigate(`/post/${id}`)
    }
  }

  return (
    <div className="form-page">
      <form onSubmit={handleUpdate} className="post-form">
        <h2>Edit Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
        ></textarea>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-button">Update Post</button>
      </form>
    </div>
  )
}

export default Edit
