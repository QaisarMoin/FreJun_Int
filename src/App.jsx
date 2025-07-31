import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CommentsTable from './components/CommentsTable'
import Pagination from './components/Pagination'
import { useComments } from './hooks/useComments'
import { useSearch } from './hooks/useSearch.jsx'
import { usePagination } from './hooks/usePagination'

function App() {
  const { comments, loading, getPostTitle } = useComments()
  const { searchTerm, setSearchTerm, filteredComments, highlightText } = useSearch(comments, getPostTitle)
  const { currentPage, setCurrentPage, totalPages, currentComments } = usePagination(filteredComments)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading comments...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredComments={filteredComments}
        totalComments={comments.length}
      />

      <main className="main-content">
        <div className="table-container">
          <div className="table-header">
            <h2>Comments Table</h2>
            <span className="results-count">
              Showing {currentComments.length} of {filteredComments.length} comments
              {searchTerm && ` (filtered from ${comments.length} total)`}
            </span>
          </div>

          <CommentsTable
            currentComments={currentComments}
            searchTerm={searchTerm}
            highlightText={highlightText}
            getPostTitle={getPostTitle}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
    </div>
  )
}

export default App
