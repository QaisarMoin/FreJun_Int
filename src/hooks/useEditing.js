import { useState } from 'react'

export const useEditing = (updateComment) => {
  const [editingName, setEditingName] = useState(null)
  const [editingBody, setEditingBody] = useState(null)
  const [editNameValue, setEditNameValue] = useState('')
  const [editBodyValue, setEditBodyValue] = useState('')

  // Handle name edit start
  const handleNameEditStart = (comment) => {
    setEditingName(comment.id)
    setEditNameValue(comment.name)
  }

  // Handle name edit save
  const handleNameEditSave = (commentId) => {
    updateComment(commentId, { name: editNameValue })
    setEditingName(null)
    setEditNameValue('')
  }

  // Handle name edit cancel
  const handleNameEditCancel = () => {
    setEditingName(null)
    setEditNameValue('')
  }

  // Handle body edit start
  const handleBodyEditStart = (comment) => {
    setEditingBody(comment.id)
    setEditBodyValue(comment.body)
  }

  // Handle body edit save
  const handleBodyEditSave = (commentId) => {
    updateComment(commentId, { body: editBodyValue })
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Handle body edit cancel
  const handleBodyEditCancel = () => {
    setEditingBody(null)
    setEditBodyValue('')
  }

  // Handle key press for save/cancel
  const handleKeyPress = (e, commentId, type) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (type === 'name') {
        handleNameEditSave(commentId)
      } else if (type === 'body') {
        handleBodyEditSave(commentId)
      }
    } else if (e.key === 'Escape') {
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