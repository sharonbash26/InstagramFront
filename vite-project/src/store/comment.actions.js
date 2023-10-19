import { commentService } from '../services/comment.service'
import { store } from '../store/store.js'
import { ADD_COMMENT, REMOVE_COMMENT, SET_COMMENTS } from './comment.reducer'
import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'

// Action Creators
export function getActionRemoveReview(commentId) {
  return { type: REMOVE_COMMENT, commentId }
}
export function getActionAddReview(comment) {
  return { type: ADD_COMMENT, comment }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadComments() {
  try {
    const comments = await commentService.query()
    store.dispatch({ type: SET_COMMENTS, comments })

  } catch (err) {
    console.log('ReviewActions: err in loadComments', err)
    throw err
  }
}

export async function addReview(comment) {
  try {
    const addedReview = await commentService.add(comment)
    store.dispatch(getActionAddReview(addedReview))
    const { score } = addedReview.byUser
    store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(commentId) {
  try {
    await commentService.remove(commentId)
    store.dispatch(getActionRemoveReview(commentId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}