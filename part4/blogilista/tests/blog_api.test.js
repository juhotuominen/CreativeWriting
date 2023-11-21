const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  } 
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for(i in initialBlogs){
    let blogObject = new Blog(initialBlogs[i])
    await blogObject.save()
  }
})

describe('json test', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    test('correct amount of json blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    test('id is found in json body', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(item => {
          expect(item.id).toBeDefined()
        })
    })
})

describe('post method works', () => {
  test('blog list increases and contains correct title', async () => {

    const postBody = {
      title: "posti testi",
      author: "Juhis",
      url: "www.testi.fi/testi",
      likes: 23
    }
    await api
      .post('/api/blogs')
      .send(postBody)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain("posti testi")
  })

  test('empty or undefined "like" value adjusts to 0', async () => {
    testBlog = {
      title: "Zero Likes Test",
      author: "Tester Test",
      url: "http://blog.com/ZeroTest.html",
    }
    testBlog2 = {
      title: "Zero Likes Test",
      author: "Tester Test",
      url: "http://blog.com/ZeroTest.html",
      likes: ''
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)

    await api
      .post('/api/blogs')
      .send(testBlog2)
      .expect(201)
    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)

    expect(likes).not.toBeNull();
    expect(likes).toBeDefined();

  })

  test('empty title or url results in status 400', async () => {
    testBlog = {
      title: "",
      author: "Tester Test",
      url: "http://blog.com/ZeroTest.html",
      likes:  12
    }
    testBlog2 = {
      title: "Test Blog",
      author: "Tester Test",
      url: "",
      likes:  12
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(testBlog2)
      .expect(400)
  })
})

describe('delete method works', () => {
  test('delete request deletes blog with specified id', async () => {

    const id = '5a422bc61b54a676234d17fc'
    await api
      .delete('/api/blogs/' + id)
      .expect(204)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).not.toContain("Type Wars")
  })
})

describe('update method works', () => {
  test('put request updates blog with specified id', async () => {

    const id = '5a422a851b54a676234d17f7'
    testBlog = {
      title: "React Patternas",
      author: "Michale Chan",
      url: "https://reactpatterns.com/",
      likes:  7
    }
    await api
      .put('/api/blogs/' + id)
      .send(testBlog)
      .expect(200)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain("React Patternas")
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})