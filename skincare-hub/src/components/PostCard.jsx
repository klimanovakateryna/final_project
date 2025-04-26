import { useNavigate } from 'react-router-dom'
import '../styles/PostCard.css'

function PostCard({ post }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  return (
    <div className="post-card" onClick={handleClick}>
      <p className="post-time">Posted {new Date(post.created_at).toLocaleDateString()}</p>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-upvotes">{post.upvotes} upvotes</p>
    </div>
  )
}

export default PostCard
