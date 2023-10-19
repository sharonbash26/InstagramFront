import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

import { loadComments, addComment, removeComment, getActionAddComment } from '../store/comment.actions'
import { loadUsers } from '../store/user.actions'

export function CommentIndex() {

  const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const comments = useSelector(storeState => storeState.commentModule.comments)

  const [commentToEdit, setCommentToEdit] = useState({ txt: '', aboutUserId: '' })

  const dispatch = useDispatch()

  useEffect(() => {
    loadComments()
    loadUsers()

//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (comment) => {
//       console.log('GOT from socket', comment)
//       dispatch(getActionAddComment(comment))
//     })

//     return () => {
//       socketService.off(SOCKET_EVENT_REVIEW_ADDED)
//     }
//   }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setCommentToEdit({ ...commentToEdit, [name]: value })
  }

  const onAddComment = async ev => {
    ev.preventDefault()
    if (!commentToEdit.txt || !commentToEdit.aboutUserId) return alert('All fields are required')
    try {

      await addComment(commentToEdit)
      showSuccessMsg('Comment added')
      setCommentToEdit({ txt: '', aboutUserId: '' })
    } catch (err) {
      showErrorMsg('Cannot add comment')
    }
  }

  const onRemove = async commentId => {
    try {
      await removeComment(commentId)
      showSuccessMsg('Comment removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(comment) {
    if (!loggedInUser) return false
    return comment.byUser._id === loggedInUser._id || loggedInUser.isAdmin
  }


  return (
    <div className="comment-index">
      <h1>Comments and Gossip</h1>
      {comments && <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment._id}>
            {canRemove(comment) &&
              <button onClick={() => onRemove(comment._id)}>X</button>}
            <p>
              About:
              <Link to={`/user/${comment.aboutUser._id}`}>
                {comment.aboutUser.fullname}
              </Link>
            </p>
            <h3>{comment.txt}</h3>
            <p>
              By:
              <Link to={`/user/${comment.byUser._id}`}>
                {comment.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddComment}>
          <select
            onChange={handleChange}
            value={commentToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={commentToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <hr />
    </div>
  )
}