const _ = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'hemlo',
    likes: 515
  },
  {
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'hemmlo',
    likes: 622
  },
]

describe('retreival of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
  }, 10000)

  test('content type is application/json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('unique identifier id exists', async () => {
    const allBlogs = await api.get('/api/blogs')
    allBlogs.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
  }, 10000)

  test('post a blog', async () => {
    let token = null
    async function getToken() {
      const response = await api
        .post('/api/login')
        .send({
          username: 'root',
          password: 'sekret'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      token = response.body.token
    }

    await getToken()

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(initialBlogs[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body.length).toBe(initialBlogs.length + 1)
  })

  test('likes is set to 0 if missing', async () => {
    let token = null
    async function getToken() {
      const response = await api
        .post('/api/login')
        .send({
          username: 'root',
          password: 'sekret'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      token = response.body.token
    }

    await getToken()

    const blog = initialBlogs[0]
    delete blog.likes

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('not allowing empty title or url', async () => {
    const blog = initialBlogs[0]
    blog.title = ''
    blog.url = ''

    await api.post('/api/blogs')
      .send(blog)
      .expect(400)

    blog.title = 'Harry Potter'
    blog.url = 'hemlo'
  })
})

describe('deletion of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
  }, 10000)

  test('delete a blog', async () => {
    let token = null
    async function getToken() {
      const response = await api
        .post('/api/login')
        .send({
          username: 'root',
          password: 'sekret'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      token = response.body.token
    }

    await getToken()

    const allBlogs = await api.get('/api/blogs')
    const blog = allBlogs.body[0]
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const allBlogsAfterDeletion = await api.get('/api/blogs')
    expect(allBlogsAfterDeletion.body.length).toBe(initialBlogs.length - 1)
    expect(_.map(allBlogsAfterDeletion.body, 'id')).not.toContain(blog.id)
  })
})

describe('updation of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
  }, 10000)

  test('update a blog', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blog = allBlogs.body[0]
    blog.likes = 433
    console.log(blog)
    await api.put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)

    const updatedBlog = await Blog.findById(blog.id)
    expect(updatedBlog.likes).toBe(433)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})