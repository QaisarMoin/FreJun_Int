import React from 'react'

const Navbar = ({ searchTerm, setSearchTerm, filteredComments, totalComments }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1 className="nav-title">Comments Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search in Email, Name, Body, or Post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          {searchTerm && (
            <div className="search-info">
              Searching across all columns • {filteredComments.length} results found
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 