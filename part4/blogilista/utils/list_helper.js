const lodash = require('lodash')
const User = require('../models/user')


const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let totalLikes = blogs.reduce((total, blog) => total + blog.likes, 0)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    return blogs.reduce((mostLikedBlog, blog) => {
      return blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog
    }, blogs[0])
    }

const mostBlogs = (blogs) => {

    const groupByAuthor = lodash.groupBy(blogs, 'author')

    const authorWithMostBlogs = lodash.maxBy(lodash.keys(groupByAuthor), author => 
      groupByAuthor[author].length)

    const mostBlogsCount = groupByAuthor[authorWithMostBlogs].length

    const returnValue = { 
      author: authorWithMostBlogs, 
      blogs: mostBlogsCount
    }

    return returnValue
}

const mostLikes = (blogs) => {

  const groupByAuthor = lodash.groupBy(blogs, 'author')

  const authorWithMostLikes = lodash.maxBy(lodash.keys(groupByAuthor), author => 
    lodash.sumBy(groupByAuthor[author], 'likes')
  )

  const mostLikesCount = lodash.sumBy(groupByAuthor[authorWithMostLikes], 'likes')

  const returnValue = { 
    author: authorWithMostLikes, 
    likes: mostLikesCount
  }

  return returnValue
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
module.exports = {
    totalLikes,
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb,
}