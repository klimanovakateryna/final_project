import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'
import '../styles/Post.css'

function Post() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('')

  useEffect(() => {
    fetchPost()
    fetchComments()
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
      setPost(data)
      setEditTitle(data.title)
      setEditContent(data.content || '')
      setEditImageUrl(data.image_url || '')
    }
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error)
    } else {
      setComments(data)
    }
  }

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error upvoting:', error)
    } else {
      setPost(data)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()

    if (!newComment.trim()) {
      return
    }

    const { data, error } = await supabase.from('comments').insert([
      {
        post_id: id,
        content: newComment.trim(),
      },
    ])

    if (error) {
      console.error('Error adding comment:', error)
    } else {
      setNewComment('')
      fetchComments()
    }
  }

  const handleEditSave = async () => {
    const { error } = await supabase
      .from('posts')
      .update({
        title: editTitle,
        content: editContent,
        image_url: editImageUrl,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating post:', error)
    } else {
      setIsEditing(false)
      fetchPost()
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
    } else {
      navigate('/')
    }
  }

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div className="post-page">
      <div className="post-card">
        {isEditing ? (
          <div className="edit-form">
            <input
              className="edit-input"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="edit-textarea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <input
              className="edit-input"
              type="text"
              placeholder="Image URL"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
            />
            <button onClick={handleEditSave} className="update-button">Update Post</button>
          </div>
        ) : (
          <>
            <div className="post-top">
              <h2>{post.title}</h2>
              <div className="post-actions">
                <button onClick={() => setIsEditing(!isEditing)} className="icon-button">✏️</button>
                <button onClick={handleDelete} className="icon-button">🗑️</button>
              </div>
            </div>

            {post.content && <p className="post-content">{post.content}</p>}
            {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}

            <div className="upvote-section">
              <button onClick={handleUpvote} className="upvote-button">
                👍 {post.upvotes} upvotes
              </button>
            </div>

            <hr className="divider" />

            <form onSubmit={handleAddComment} className="comment-form">
              <input
                type="text"
                placeholder="Leave a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button type="submit" className="comment-submit">Post</button>
            </form>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  {comment.content}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Post
