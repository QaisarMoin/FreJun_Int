import { useState, useEffect } from 'react'

export const useSearch = (comments, getPostTitle) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredComments, setFilteredComments] = useState([])

  // Filter comments based on search term
  useEffect(() => {
    const performSearch = () => {
      const filtered = comments.filter(comment => {
        // If no search term, show all comments
        if (!searchTerm.trim()) return true
        
        const searchLower = searchTerm.toLowerCase()
        const email = comment.email.toLowerCase()
        const name = comment.name.toLowerCase()
        const body = comment.body.toLowerCase()
        const postTitle = getPostTitle(comment.postId).toLowerCase()
        
        // Search across all four columns: Email, Name, Body, and Post title
        return email.includes(searchLower) || 
               name.includes(searchLower) || 
               body.includes(searchLower) || 
               postTitle.includes(searchLower)
      })
      
      setFilteredComments(filtered)
    }
    
    performSearch()
  }, [comments, searchTerm, getPostTitle])

  // Function to highlight search terms in text
  const highlightText = (text, searchTerm) => {
    // If no search term, just return the original text
    if (!searchTerm.trim()) return text
    
    // Create regex to match search term (case insensitive)
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    // Map through parts and wrap matching parts in highlight tags
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    )
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredComments,
    highlightText
  }
} 