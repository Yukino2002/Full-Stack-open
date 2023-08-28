import { useState } from 'react'

import blogService from '../services/blogs'

const BlogForm = ({ user, blogs, setBlogs }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [show, setShow] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await blogService.create(blog)
      const newBlog = blog
      newBlog.likes = 0
      newBlog.user = user
      setBlog({
        title: '',
        author: '',
        url: ''
      })
      setBlogs(blogs.concat(newBlog))
      setShow(!show)
      alert(`A new blog ${newBlog.title} by ${newBlog.author} was added!`)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  const handleChange = e => setBlog({ ...blog, [e.target.name]: e.target.value })

  const handleShow = () => setShow(!show)

  return (
    <div>
      {show ?
        <div>
          <h2>create new</h2>
          <form onSubmit={e => handleSubmit(e)}>
            title: <input type='text' name='title' value={blog.title} onChange={e => handleChange(e)} />
            <br />
            author: <input type='text' name='author' value={blog.author} onChange={e => handleChange(e)} />
            <br />
            url: <input type='text' name='url' value={blog.url} onChange={e => handleChange(e)} />
            <br />
            <button type='submit'>create</button>
            <br />
            <button onClick={handleShow}>cancel</button>
          </form>
        </div> :
        <button onClick={handleShow}>new blog</button>}
    </div>
  )
}

export default BlogForm