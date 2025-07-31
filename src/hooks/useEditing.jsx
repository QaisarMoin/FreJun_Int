import { useState } from 'react'

export const useEditing = (updateComment) => {
  const [editingName, setEditingName] = useState(null)
  const [editingBody, setEditingBody] = useState(null)
  const [editNameValue, setEditNameValue] = useState('')
  const [editBodyValue, setEditBodyValue] = useState('')

  // Click to edit name
  const handleNameEditStart = (comment) => {
    setEditingName(comment.id)
    setEditNameValue(comment.name)
  }

  // Save the name changes
  const handleNameEditSave = (commentId) => {
    updateComment(commentId, { name: editNameValue })
    setEditingName(null)
    setEditNameValue('')
  }

  // Cancel name editing
  const handleNameEditCancel = () => {
    setEditingName(null)
    setEditNameValue('')
  }

  // Click to edit body text
  const handleBodyEditStart = (comment) => {
    setEditingBody(comment.id)
    setEditBodyValue(comment.body)
  }

  // Save the body changes
  const handleBodyEditSave = (commentId) => {
    updateComment(commentId, { body: editBodyValue })
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Cancel body editing
  const handleBodyEditCancel = () => {
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Handle keyboard shortcuts
  const handleKeyPress = (e, commentId, type) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Enter saves, but Shift+Enter makes new line in textarea
      e.preventDefault()
      if (type === 'name') {
        handleNameEditSave(commentId)
      } else if (type === 'body') {
        handleBodyEditSave(commentId)
      }
    } else if (e.key === 'Escape') {
      // Escape cancels editing
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