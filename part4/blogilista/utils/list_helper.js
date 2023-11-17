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
    
}
  
  
module.exports = {
    totalLikes, dummy, favoriteBlog
}