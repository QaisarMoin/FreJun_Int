import React from 'react'

const EditableCell = ({ 
  comment, 
  field, 
  isEditing, 
  editValue, 
  setEditValue, 
  onEditStart, 
  onEditSave, 
  onEditCancel, 
  onKeyPress, 
  searchTerm, 
  highlightText 
}) => {
  // Check if this specific cell is currently being edited
  const isCurrentlyEditing = isEditing === comment.id
  const isBodyField = field === 'body'

  // If we're editing this cell, show the input/textarea
  if (isCurrentlyEditing) {
    return (
      <div className="edit-container">
        {isBodyField ? (
          // Use textarea for body field since it can be longer
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => onKeyPress(e, comment.id, field)}
            onBlur={() => onEditSave(comment.id)}
            className="edit-textarea"
            rows="3"
            autoFocus
          />
        ) : (
          // Use regular input for name field
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => onKeyPress(e, comment.id, field)}
            onBlur={() => onEditSave(comment.id)}
            className="edit-input"
            autoFocus
          />
        )}
        <div className="edit-hint">Press Enter to save, Esc to cancel</div>
      </div>
    )
  }

  // If not editing, show the clickable text
  return (
    <div 
      className={`editable-${field}`}
      onClick={() => onEditStart(comment)}
    >
      {highlightText(comment[field], searchTerm)}
    </div>
  )
}

export default EditableCell 