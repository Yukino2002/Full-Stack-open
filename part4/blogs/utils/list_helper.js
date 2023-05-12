const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach(blog => {
    totalLikes += blog.likes
  })

  return totalLikes
}

const favoriteBlog = (blogs) => {
  let mostLikes = -1
  blogs.find(blog)
}

module.exports = {
  dummy, totalLikes
}