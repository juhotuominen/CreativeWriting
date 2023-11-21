const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    
    if(!blog.title || !blog.url){
        response.status(400).json({error: 'Title and url are requested fields.'})
        return
    }

    if (typeof blog.likes === 'undefined') {
        blog.likes = 0;
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            response.status(500).json({ error: 'Could not save the blog.'})
        })
})

module.exports = blogsRouter