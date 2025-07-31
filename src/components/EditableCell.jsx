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
  const isEditingThis = isEditing === comment.id

  if (isEditingThis) {
    return (
      <div className="edit-container">
        {field === 'body' ? (
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