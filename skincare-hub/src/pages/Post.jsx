import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'
import '../styles/Post.css'

function Post() {
  const { id } = useParams()
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

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>

      {post.image_url && (
        <img className="post-image" src={post.image_url} alt="Post" />
      )}

      {post.content && <p className="post-content">{post.content}</p>}

      <div className="upvote-section">
        <button onClick={handleUpvote} className="upvote-button">
          Upvote ({post.upvotes})
        </button>
      </div>

      <hr className="divider" />

      <h2>Comments</h2>

      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
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
    </div>
  )
}

export default Post
