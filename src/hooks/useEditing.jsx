import { useState } from 'react'

export const useEditing = (updateComment) => {
  const [editingName, setEditingName] = useState(null)
  const [editingBody, setEditingBody] = useState(null)
  const [editNameValue, setEditNameValue] = useState('')
  const [editBodyValue, setEditBodyValue] = useState('')

  // Start editing the name field
  const handleNameEditStart = (comment) => {
    setEditingName(comment.id)
    setEditNameValue(comment.name)
  }

  // Save changes to the name field
  const handleNameEditSave = (commentId) => {
    updateComment(commentId, { name: editNameValue })
    setEditingName(null)
    setEditNameValue('')
  }

  // Cancel editing the name field
  const handleNameEditCancel = () => {
    setEditingName(null)
    setEditNameValue('')
  }

  // Start editing the body field
  const handleBodyEditStart = (comment) => {
    setEditingBody(comment.id)
    setEditBodyValue(comment.body)
  }

  // Save changes to the body field
  const handleBodyEditSave = (commentId) => {
    updateComment(commentId, { body: editBodyValue })
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Cancel editing the body field
  const handleBodyEditCancel = () => {
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Handle keyboard events for save/cancel
  const handleKeyPress = (e, commentId, type) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Enter key saves the changes (but not Shift+Enter for textarea)
      e.preventDefault()
      if (type === 'name') {
        handleNameEditSave(commentId)
      } else if (type === 'body') {
        handleBodyEditSave(commentId)
      }
    } else if (e.key === 'Escape') {
      // Escape key cancels editing
      if (type === 'name') {
        handleNameEditCancel()
      } else if (type === 'body') {
        handleBodyEditCancel()
      }
    }
  }

  return {
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
  }
} 