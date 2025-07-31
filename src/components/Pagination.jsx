import React from 'react'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ← Previous
      </button>
      
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
      
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