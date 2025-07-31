import { useState, useEffect } from 'react'

export const useComments = () => {
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load data when component first mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get comments and posts at the same time to speed things up
        const [commentsRes, postsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/comments'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ])
        
        const commentsFromAPI = await commentsRes.json()
        const postsFromAPI = await postsRes.json()
        
        // Check if user has made any edits before
        const savedData = localStorage.getItem('comments')
        if (savedData) {
          const userEdits = JSON.parse(savedData)
          
          // Mix the fresh data with user's saved changes
          const finalComments = commentsFromAPI.map(comment => {
            const editedComment = userEdits.find(saved => saved.id === comment.id)
            
            if (editedComment) {
              // Use user's version if they changed something
              return {
                ...comment,
                name: editedComment.name !== comment.name ? editedComment.name : comment.name,
                body: editedComment.body !== comment.body ? editedComment.body : comment.body
              }
            }

            return comment
          })
          setComments(finalComments)
        } else {
          // First time loading, just use what we got from API
          setComments(commentsFromAPI)
        }
        
        setPosts(postsFromAPI)
        setLoading(false)
      } catch (err) {
        console.error('Something went wrong loading data:', err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Find the post title using the post ID
  const getPostTitle = (postId) => {
    const matchingPost = posts.find(p => p.id === postId)
    return matchingPost ? matchingPost.title : 'Post not found'
  }

  // Update a comment and save to localStorage
  const updateComment = (commentId, changes) => {
    const newComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, ...changes }
        : comment
    )
    
    setComments(newComments)
    // Keep it saved so it doesn't disappear on refresh
    localStorage.setItem('comments', JSON.stringify(newComments))
  }

  return {
    comments,
    posts,
    loading,
    getPostTitle,
    updateComment
  }
} 