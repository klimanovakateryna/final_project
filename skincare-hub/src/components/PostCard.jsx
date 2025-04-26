import { useNavigate } from 'react-router-dom'
import '../styles/PostCard.css'

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  return (
    <div className="post-card" onClick={handleClick}>
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-time">Created: {new Date(post.created_at).toLocaleString()}</p>
      <p className="post-card-upvotes">Upvotes: {post.upvotes}</p>
    </div>
  )
}

export default PostCard
