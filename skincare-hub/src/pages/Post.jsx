import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'
import '../styles/Post.css'

function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

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
    }
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })

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
      console.error('Error upvoting post:', error)
    } else {
      setPost(data)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const { error } = await supabase
      .from('comments')
      .insert({ post_id: id, content: newComment })

    if (error) {
      console.error('Error adding comment:', error)
    } else {
      setNewComment('')
      fetchComments()
    }
  }

  const handleDelete = async () => {
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

  const handleEdit = () => {
    navigate(`/edit/${id}`)
  }

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div className="post-page">
      <div className="post-container">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-actions">
            <button onClick={handleEdit} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete</button>
          </div>
        </div>

        {post.content && (
          <p className="post-content">{post.content}</p>
        )}

        {post.image_url && (
          <img src={post.image_url} alt="Post visual" className="post-image" />
        )}

        <button onClick={handleUpvote} className="upvote-button">
          {post.upvotes} upvotes
        </button>

        <div className="comments-section">
          <h3>Comments</h3>
          {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              {comment.content}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post
