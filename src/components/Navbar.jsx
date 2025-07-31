import React from 'react'

const Navbar = ({ searchTerm, setSearchTerm, filteredComments, totalComments }) => {
  // Calculate how many results we found for the search info
  const resultCount = filteredComments.length
  const hasSearchResults = searchTerm && searchTerm.trim().length > 0

  return (
    <nav className="navbar">
      <div className="nav-content">
        {/* App title */}
        <h1 className="nav-title">Comments Dashboard</h1>
        
        {/* Search input section */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search in Name or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          
          {/* Show search results info when user is searching */}
          {/* {hasSearchResults && (
            <div className="search-info">
              Searching in Name and Email • {resultCount} results found
            </div>
          )} */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 