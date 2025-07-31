import { useState, useEffect } from 'react'

export const useComments = () => {
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch comments and posts on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/comments'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ])
        
        const commentsData = await commentsResponse.json()
        const postsData = await postsResponse.json()
        
        setComments(commentsData)
        setPosts(postsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get post title by postId
  const getPostTitle = (postId) => {
    const post = posts.find(p => p.id === postId)
    return post ? post.title : 'Unknown Post'
  }

  return {
    comments,
    posts,
    loading,
    getPostTitle
  }
} 