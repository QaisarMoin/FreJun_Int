import React from 'react'

const CommentsTable = ({ 
  currentComments, 
  searchTerm, 
  highlightText, 
  getPostTitle
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
                {highlightText(comment.name, searchTerm)}
              </td>
              <td className="body-cell">
                {highlightText(comment.body, searchTerm)}
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