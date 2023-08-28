import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(!show)
  const handleLike = async () => {
    let newBlog = blog;
    newBlog.likes = blog.likes + 1;

    await blogService.update(newBlog)
    setBlogs(blogs.filter(oldBlog => oldBlog.id === blog.id ? newBlog : oldBlog))
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(oldBlog => oldBlog.id !== blog.id))
    }
  }

  return (
    <div>
      <span data-testid='title'>{blog.title}</span>
      <span>by</span>
      <span data-testid='author'>{blog.author}</span>
      <button onClick={handleShow}>{show ? 'hide' : 'view'}</button>
      {show ?
        <div>
          <p data-testid='url'>{blog.url}</p>
          <p data-testid='likes'>{blog.likes} <button onClick={handleLike}>like</button></p>
          <p>user: {blog.user.username}</p>
          {user.username === blog.user.username ?
            <button onClick={handleDelete}>remove</button> :
            ""}
        </div> :
        ""}
    </div>
  )
}

export default Blog