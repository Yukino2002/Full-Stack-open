const _ = require('lodash')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  }, 10000)

  test('creation succeeds with a fresh username', async () => {
    const users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())

    const newUser = {
      username: 'Yukino2002',
      name: 'PJ',
      password: 'PPJJ',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAgain = await User.find({})
    const usersAtEnd = usersAgain.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails when password or username length is less than 3', async () => {
    const newUser = {
      username: 'Yukino2002',
      name: 'PJ',
      password: 'PP',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    newUser.username = 'PP'
    newUser.password = 'PPJJ'

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const users = await User.find({})
    const usersAtStart = users.map(u => u.toJSON())
    expect(usersAtStart.length).toBe(1)
  })
})