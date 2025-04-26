import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../api/supabaseClient'

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
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt="Post" style={{ maxWidth: '100%', margin: '1rem 0' }} />}
      {post.content && <p>{post.content}</p>}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleUpvote} style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px' }}>
          Upvote ({post.upvotes})
        </button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Comments</h2>

      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Post</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}>
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post
