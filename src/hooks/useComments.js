import { useState, useEffect } from 'react'

export const useComments = () => {
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch data from API when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch both comments and posts in parallel for better performance
        const [commentsResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/comments'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ])
        
        const commentsData = await commentsResponse.json()
        const postsData = await postsResponse.json()
        
        // Check if we have any saved comments in localStorage
        const savedCommentsJson = localStorage.getItem('comments')
        if (savedCommentsJson) {
          const savedCommentsData = JSON.parse(savedCommentsJson)
          
          // Merge saved edits with fresh API data
          const mergedComments = commentsData.map(comment => {
            const savedComment = savedCommentsData.find(saved => saved.id === comment.id)
            if (savedComment) {
              // Only use saved data if it's different from the original
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
          // No saved data, use fresh API data
          setComments(commentsData)
        }
        
        setPosts(postsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Helper function to get post title by post ID
  const getPostTitle = (postId) => {
    const post = posts.find(p => p.id === postId)
    return post ? post.title : 'Unknown Post'
  }

  // Function to update a comment and save to localStorage
  const updateComment = (commentId, updates) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, ...updates }
        : comment
    )
    
    setComments(updatedComments)
    // Persist changes to localStorage
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