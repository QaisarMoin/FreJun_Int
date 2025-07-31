import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CommentsTable from './components/CommentsTable'
import Pagination from './components/Pagination'
import { useComments } from './hooks/useComments'
import { useSearch } from './hooks/useSearch.jsx'
import { usePagination } from './hooks/usePagination'
import { useEditing } from './hooks/useEditing.jsx'

function App() {
  // Main data management - handles API calls and localStorage
  const { comments, loading, getPostTitle, updateComment } = useComments()
  
  // Search functionality with highlighting
  const { searchTerm, setSearchTerm, filteredComments, highlightText } = useSearch(comments, getPostTitle)
  
  // Pagination logic - handles page navigation
  const { currentPage, setCurrentPage, totalPages, currentComments } = usePagination(filteredComments)
  
  // Inline editing functionality
  const {
    editingName,
    editingBody,
    editNameValue,
    editBodyValue,
    setEditNameValue,
    setEditBodyValue,
    handleNameEditStart,
    handleBodyEditStart,
    handleNameEditSave,
    handleBodyEditSave,
    handleKeyPress
  } = useEditing(updateComment)

  // Show loading spinner while data is being fetched
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
      {/* Top navigation with search */}
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredComments={filteredComments}
        totalComments={comments.length}
      />

      {/* Main content area */}
      <main className="main-content">
        <div className="table-container">
          {/* Table header with results count */}
          <div className="table-header">
            <h2>Comments Table</h2>
            <span className="results-count">
              Showing {currentComments.length} of {filteredComments.length} comments
              {searchTerm && ` (filtered from ${comments.length} total)`}
            </span>
          </div>

          {/* The main comments table */}
          <CommentsTable
            currentComments={currentComments}
            searchTerm={searchTerm}
            highlightText={highlightText}
            getPostTitle={getPostTitle}
            editingName={editingName}
            editingBody={editingBody}
            editNameValue={editNameValue}
            editBodyValue={editBodyValue}
            setEditNameValue={setEditNameValue}
            setEditBodyValue={setEditBodyValue}
            handleNameEditStart={handleNameEditStart}
            handleBodyEditStart={handleBodyEditStart}
            handleNameEditSave={handleNameEditSave}
            handleBodyEditSave={handleBodyEditSave}
            handleKeyPress={handleKeyPress}
          />

          {/* Bottom pagination controls */}
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
