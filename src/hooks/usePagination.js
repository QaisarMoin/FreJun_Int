import { useState, useEffect } from 'react'

export const usePagination = (filteredComments, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination values
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentComments = filteredComments.slice(startIndex, endIndex)

  // Reset to first page when the number of filtered comments changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredComments.length])

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentComments,
    startIndex,
    endIndex
  }
} 