require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  if (!newBlog.likes) {
    newBlog.likes = 0
  }
  
  const users = await User.find({})
  newBlog.user = users[0].id

  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()

  users[0].blogs = users[0].blogs.concat(savedBlog._id)
  await users[0].save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  newBlog._id = request.params.id
  const blog = new Blog(newBlog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter