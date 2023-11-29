const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    } 
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

    response.json(blogs)
        
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        if (!blog.title || !blog.url) {
            response.status(400).json({ error: 'Title and URL are required fields.' });
            return
        }

        if (typeof blog.likes === 'undefined') {
            blog.likes = 0
        }

        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result)
    } catch (error) {
        response.status(500).json({ error: 'Could not save the blog.' })
    }
})


blogsRouter.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id

        const deletedBlog = await Blog.findByIdAndDelete(id)

        if (deletedBlog) {
            response.status(204).end()
        } else {
            response.status(404).json({ error: 'Blog not found' })
        }
    } catch (error) {
        response.status(500).json({ error: 'Could not delete blog.' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try{
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    } catch(error) {
        response.status(500).json({ error: 'Could not modify blog.' })
    }
})


module.exports = blogsRouter