import React from 'react'
import EditableCell from './EditableCell'

const CommentsTable = ({ 
  currentComments, 
  searchTerm, 
  highlightText, 
  getPostTitle,
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
}) => {
  return (
    <div className="table-wrapper">
      <table className="comments-table">
        {/* Table header with column names */}
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
          </tr>
        </thead>
        
        {/* Table body with comment rows */}
        <tbody>
          {currentComments.map(comment => (
            <tr key={comment.id} className="table-row">
              {/* Email column - read-only with highlighting */}
              <td className="email-cell">
                {highlightText(comment.email, searchTerm)}
              </td>
              
              {/* Name column - editable with highlighting */}
              <td className="name-cell">
                <EditableCell
                  comment={comment}
                  field="name"
                  isEditing={editingName}
                  editValue={editNameValue}
                  setEditValue={setEditNameValue}
                  onEditStart={handleNameEditStart}
                  onEditSave={handleNameEditSave}
                  onKeyPress={handleKeyPress}
                  searchTerm={searchTerm}
                  highlightText={highlightText}
                />
              </td>
              
              {/* Body column - editable without highlighting */}
              <td className="body-cell">
                <EditableCell
                  comment={comment}
                  field="body"
                  isEditing={editingBody}
                  editValue={editBodyValue}
                  setEditValue={setEditBodyValue}
                  onEditStart={handleBodyEditStart}
                  onEditSave={handleBodyEditSave}
                  onKeyPress={handleKeyPress}
                  searchTerm="" // No highlighting for body
                  highlightText={highlightText}
                />
              </td>
              
              {/* Post column - read-only without highlighting */}
              <td className="post-cell">
                {getPostTitle(comment.postId)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommentsTable 