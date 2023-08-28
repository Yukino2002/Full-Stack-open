require('express-async-errors')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const newBlog = request.body
  const user = request.user

  if (!newBlog.likes) {
    newBlog.likes = 0
  }

  newBlog.user = user._id

  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(400)
      .json({ error: 'user invalid' })
      .end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  newBlog._id = request.params.id
  const blog = new Blog(newBlog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter