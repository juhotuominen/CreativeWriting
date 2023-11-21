const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
        
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)

        if (!blog.title || !blog.url) {
            response.status(400).json({ error: 'Title and URL are required fields.' });
            return
        }

        if (typeof blog.likes === 'undefined') {
            blog.likes = 0
        }

        const result = await blog.save()
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