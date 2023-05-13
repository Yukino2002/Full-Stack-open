require('express-async-errors')
const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
  const newBlog = request.body
  if (!newBlog.likes) {
    newBlog.likes = 0
  }
  const blog = new Blog(newBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

notesRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  newBlog._id = request.params.id
  const blog = new Blog(newBlog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})

module.exports = notesRouter