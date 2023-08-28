import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setCredentials({
        username: '',
        password: ''
      })
      blogService.setToken = user.token
    } catch (e) {
      console.log(e)
      alert('Wrong credentials!')
    }
  }

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={e => {
        handleSubmit(e)
      }}>
        username <input type='text' name='username' value={credentials.username} onChange={e => {
          handleChange(e)
        }} />
        <br />
        password <input type='password' name='password' value={credentials.password} onChange={e => {
          handleChange(e)
        }} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm