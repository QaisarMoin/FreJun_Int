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
        
        // Load saved comments from localStorage and merge with fresh data
        const savedComments = localStorage.getItem('comments')
        if (savedComments) {
          const savedCommentsData = JSON.parse(savedComments)
          // Merge saved edits with fresh data
          const mergedComments = commentsData.map(comment => {
            const savedComment = savedCommentsData.find(saved => saved.id === comment.id)
            if (savedComment) {
              return {
                ...comment,
                name: savedComment.name !== comment.name ? savedComment.name : comment.name,
                body: savedComment.body !== comment.body ? savedComment.body : comment.body
              }
            }
            return comment
          })
          setComments(mergedComments)
        } else {
          setComments(commentsData)
        }
        
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

  // Update comment
  const updateComment = (commentId, updates) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, ...updates }
        : comment
    )
    
    setComments(updatedComments)
    localStorage.setItem('comments', JSON.stringify(updatedComments))
  }

  return {
    comments,
    posts,
    loading,
    getPostTitle,
    updateComment
  }
} 