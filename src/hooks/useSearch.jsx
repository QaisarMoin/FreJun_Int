import { useState, useEffect } from 'react'

export const useSearch = (comments) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredComments, setFilteredComments] = useState([])

  // Filter comments when search term changes - only look in name and email
  useEffect(() => {
    const doSearch = () => {
      const results = comments.filter(comment => {
        // Show everything if no search term
        if (!searchTerm.trim()) return true
        
        const searchText = searchTerm.toLowerCase()
        const email = comment.email.toLowerCase()
        const name = comment.name.toLowerCase()
        
        // Check if search term is in email or name
        return email.includes(searchText) || 
               name.includes(searchText)
      })
      
      setFilteredComments(results)
    }
    
    doSearch()
  }, [comments, searchTerm]) 

  // Highlight the search term in the text
  const highlightText = (text, searchTerm) => {
  if (!searchTerm.trim()) return text;

  // Make search case-insensitive
  const lowerText = text.toLowerCase();
  const lowerSearch = searchTerm.toLowerCase();

  // Find the index of the search term
  const index = lowerText.indexOf(lowerSearch);
  if (index === -1) return text;

  // Split the text into three parts: before, match, after
  const before = text.slice(0, index);
  const match = text.slice(index, index + searchTerm.length);
  const after = text.slice(index + searchTerm.length);

  return (
    <>
      {before}
      <mark className="search-highlight">{match}</mark>
      {after}
    </>
  );
}

  return {
    searchTerm,
    setSearchTerm,
    filteredComments,
    highlightText
  }
} 