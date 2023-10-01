import PostList from './components/PostList'
import CreatePost from './components/CreatePost'

const Blog = () => {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default Blog
