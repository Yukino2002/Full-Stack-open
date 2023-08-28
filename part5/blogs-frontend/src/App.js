import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken = null
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(allBlogs => {
      let sortedBlogs = allBlogs
      sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
      blogService.setToken(JSON.parse(loggedInUser).token)
    }
  }, [])

  return (
    <>
      {user ?
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <br />
          <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} />
          <br />
          {blogs.map(blog =>
            <div key={blog.id} style={{
              padding: 4
            }}>
              <Blog user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
            </div>
          )}
        </div> :
        <LoginForm setUser={setUser} />
      }
    </>
  )
}

export default App