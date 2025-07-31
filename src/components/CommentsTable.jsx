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
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {currentComments.map(comment => (
            <tr key={comment.id} className="table-row">
              <td className="email-cell">
                {highlightText(comment.email, searchTerm)}
              </td>
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
                  searchTerm={searchTerm}
                  highlightText={highlightText}
                />
              </td>
              <td className="post-cell">
                {highlightText(getPostTitle(comment.postId), searchTerm)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommentsTable 