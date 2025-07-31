import React from 'react'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  // Don't show pagination if there's only one page or no pages
  if (totalPages <= 1) return null

  // Helper function to create the page numbers array with ellipsis
  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 7 // Keep it manageable, max 7 page buttons
    
    // If we have fewer pages than max, just show all of them
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include the first page
      pageNumbers.push(1)
      
      // Different logic based on current page position
      if (currentPage <= 4) {
        // We're near the beginning, show first 5 pages + ellipsis + last page
        for (let i = 2; i <= 5; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        // We're near the end, show first page + ellipsis + last 5 pages
        pageNumbers.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        // We're in the middle, show first + ellipsis + current±1 + ellipsis + last
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  const pagesToShow = generatePageNumbers()

  return (
    <div className="pagination">
      {/* Previous page button */}
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ← Previous
      </button>
      
      {/* Page number buttons */}
      <div className="page-numbers">
        {pagesToShow.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="page-ellipsis">...</span>
            ) : (
              <button
                onClick={() => setCurrentPage(page)}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Next page button */}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination 