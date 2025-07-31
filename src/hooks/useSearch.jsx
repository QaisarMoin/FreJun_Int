import { useState, useEffect } from 'react'

export const useSearch = (comments, getPostTitle) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredComments, setFilteredComments] = useState([])

  // Enhanced search functionality for the four mandatory columns
  useEffect(() => {
    const filtered = comments.filter(comment => {
      if (!searchTerm.trim()) return true
      
      const searchLower = searchTerm.toLowerCase()
      const email = comment.email.toLowerCase()
      const name = comment.name.toLowerCase()
      const body = comment.body.toLowerCase()
      const postTitle = getPostTitle(comment.postId).toLowerCase()
      
      // Search across all four mandatory columns: Email, Name, Body, Post
      return email.includes(searchLower) || 
             name.includes(searchLower) || 
             body.includes(searchLower) || 
             postTitle.includes(searchLower)
    })
    
    setFilteredComments(filtered)
  }, [comments, searchTerm, getPostTitle])

  // Highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
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