import PostCard from './PostCard'

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>No posts yet. Create one!</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
